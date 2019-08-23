<template>
    <div class="container">
        <div class="head">
            <span @click="$router.go(-1)"><i class="iconfont">&#xe60a;</i></span>
            <p class="title">{{title}}</p>
        </div>
        <div class="order-type">
            <cell :title="(typeText)" :value="(type)"></cell>
        </div>
        <div class="price">
            <cell :title="(priceText)" :value="('￥'+price+unit)"></cell>
        </div>
        <div class="number">
            <x-number :title="(numberText)" v-model="number" button-style="round" style="color:'red'" :min="0"  @on-change="change"></x-number>
        </div>
        <div class="start-time">
            <calendar
             v-model="start"
             @on-change="changeStartTime" 
             :title="(startName)" 
             show-popup-header :popup-header-title="('请选择'+startName)" 
             @on-confirm="onConfirm"
             disable-past>
            </calendar>
        </div>
        <div class="end-time" v-if="isHotel">
            <calendar
             v-model="end"
             @on-change="changeEndTime" 
             :title="('离店时间')" 
             show-popup-header :popup-header-title="('请选择离店时间')" 
             @on-confirm="onConfirm"
             disable-past>
            </calendar>
        </div>
        <div class="totalBox">
            <div class="total"><p>总计：￥{{total}}</p></div>
            <div class="submit-btn" @click="submitOrder"><p>提交订单</p></div>
        </div>
        <confirm
            v-model="show"
            :close-on-confirm="false"
            :title="('温馨提示')"
            @on-confirm="onConfirm">
            <p style="text-align:center;">是否确定提交订单?</p>
        </confirm>
        <loading :show="showLoading" :text="('提交中...')"></loading>
        <alert v-model="showAlter" :title="(alert.title)" :content="(alert.content)" @on-hide="onHide"></alert>
    </div>
</template>
<style>
    @import url('../assets/css/orderHotel.css');
</style>

<script>
import { XNumber, Cell, Calendar, Confirm, Alert, Loading} from 'vux'
import axios from 'axios';
import { setTimeout } from 'timers';
import store from '@/store/store.js';
export default {
    data(){
        return{
            typeText:'',priceText:'',
            unit:'',
            numberText:'房间数量',startName:'入住时间',
            title:'',name:'',
            type:'',number:1,price:0,
            start:'',end:'',
            days:1,
            show:false,
            showLoading:false,
            showAlter:false,
            isHotel:true,
            changeFlag:false,
            alert:{
                title:'',
                content:'',
            }
        }
    },
    components:{
        XNumber,Cell,Calendar,Confirm,
        Loading,Alert,Loading,
        store
    },
    methods:{
        getTimeString(date){
            let year = date.getFullYear();
            let month = date.getMonth()+1 >=10? date.getMonth()+1 : '0'+(date.getMonth()+1);
            let day = date.getDate() >=10? date.getDate() : '0'+date.getDate();
            return year +'-'+ month +'-'+ day;
        },
        init(){
            this.isHotel = this.$route.params.type == 'hotel'?true:false;
            let id = this.$route.params.id.substring(2);
            let room = this.$route.params.room;
            
            if(this.isHotel){
                this.title = '酒店预订';this.typeText = '房间类型';
                this.priceText = '房间单价';this.unit = '/晚';
                this.numberText = '房间数量';this.startName = '入住时间';
                axios.get('../../../static/json/hotel.detail.json').then((res)=>{
                    let data = res.data.data;
                    data.forEach((item)=>{
                        if(item.hotelid == id){
                            this.name = item.hotelname;
                            this.type = item.roomType[room].type;
                            this.price = item.roomType[room].price;
                        }
                    })
                })
            }else{
                this.title = '门票预订';this.typeText = '门票类型';
                this.priceText = '门票单价';this.unit = '/张';
                this.numberText = '门票数量';this.startName = '游玩时间';
                var ticket = room.split('&')
                axios.get('../../../static/json/scenics.json').then((res)=>{
                    let data = res.data.data;
                    data.forEach((item)=>{
                        if(item.scenic_id == id){
                            this.name = item.name;
                            this.type = item.ticket[ticket[0]].kind[ticket[1]].name;
                            this.price = item.ticket[ticket[0]].kind[ticket[1]].price;
                        }
                    })
                })  
            }
        },
        //修改数量
        change(val){
            this.number = val;
        },
        //修改开始时间
        changeStartTime(val){
            this.start = val;
            let date = new Date(val).getTime();
            if(!this.changeFlag){
                this.end = this.getTimeString(new Date(date+(24*60*60*1000)));
            }else{
                let endTime = new Date(this.end).getTime();
                let days = Math.floor((endTime-date)/(24*60*60*1000));
                if(days >0){
                    this.days = days
                }else{
                    this.end = this.getTimeString(new Date(date+(24*60*60*1000)));
                }
            }
            
        },
        //修改结束时间
        changeEndTime(val){
            let startTime = new Date(this.start).getTime();
            let endTime = new Date(this.end).getTime();
            let days = Math.floor((endTime-startTime)/(24*60*60*1000));
            this.days = days >0? days:0;
            this.changeFlag = true;
            
        },
        //提交订单
        submitOrder (){
            if(this.days == 0){
                this.showAlter = true;
                this.alert = {
                    title:'订单错误',
                    content:'您选择的日期有误，请重新选择~'
                }
            }else{
                this.show = true;
            }
           
        },
        //确认订单
        onConfirm () {
            this.show = false;
            this.submitting();
            
        },
        submitting(){
            let obj = {};
            if(this.isHotel){
                obj ={
                    'cate':'hotel',
                    'name':this.name,   //商家名字
                    'total':this.total, //总价
                    'date':this.start +'至'+ this.end, //开始结束时间
                    'days':this.days,     //天数
                    'number':this.number, //房/张数
                    'type':this.type      //类型
                }
            }else{
                obj ={
                    'cate':'scene',
                    'name':this.name,   //商家名字
                    'total':this.total, //总价
                    'date':this.start,  //开始结束时间
                    'number':this.number, //房/张数
                    'type':this.type      //类型
                }
            }
            store.commit("orderCount");
            store.commit("orderDetail",obj);
            this.showLoading = true;
            setTimeout(() => {
                this.showLoading = false;
                this.showAlter = true;
                this.alert = {
                    title:'预订成功',
                    content:'你的订单页已成功提交，谢谢~'
                }
            }, 1000)
        },
        onHide () {
           setTimeout(()=>{
                this.$router.go(-1)
            },2000)
        },
    },
    computed:{
        total(){
            if(this.isHotel){
                return (this.number*this.days)*this.price
            }else{
                return this.number*this.price
            }
            
        }
    },
    mounted(){
        this.start = this.getTimeString(new Date());
        this.end = this.getTimeString( new Date(new Date().getTime()+24*60*60*1000));
        this.init()
    },
}
</script>
