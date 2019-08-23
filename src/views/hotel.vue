<template>
    <div class="container">
        <div class="hotel-detail">
            <span @click="$router.go(-1)"><i class="iconfont">&#xe60a;</i></span>
            <img :src=src alt="">
        </div>
        <div class="hotel-info">
            <div class="hotel-name"><p>{{detail.hotelname}}</p></div>
            <div class="hotel-address"><p>{{detail.location}}</p><i class="iconfont" @click="goMap(detail.location,detail.hotelname)" style="color:#3c9bc2">&#xe741;</i></div>
            <div class="hotel-contect"><p>联系方式：<a v-bind:href="'tel://'+detail.hotelPhone"></a>{{detail.hotelPhone}}</p></div>
        </div>
        <div class="hotel-desc">
            <p class="desc-title">酒店介绍</p>
            <p class="desc-text">{{intro}}</p>
            <span class="see-more" @click="seeMoreIntro">{{see}}</span>
        </div>
        <div class="hotel-convenience">
            <p class="conv-title">酒店设施</p>
            <ul>
                <li v-for="(i,index) in detail.equip" :key="index">
                    <i :class="'iconfont '+icon[i]" style="font-size:2rem"></i>
                    </li>
            </ul>
        </div>
        <div class="orderBox">
            <p class="room-title">房间类型</p>
            <div class="roomAll">
                <div class="room">
                    <ul>
                        <li v-for="(r,index) in detail.roomType" :key="index">
                            <p class="room-name">{{r.type}}</p>
                            <div class="booking">
                                <p class="room-price">￥{{r.price}}</p>
                                <p class="bookBtn" @click="toOrder(index)">预订</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    @import url('../assets/css/hotel.css');
    @import url('../assets/font/iconfont.css');
</style>

<script>
import {Rater} from 'vux';
import axios from 'axios';
export default {
    data(){
        return{
            id:'',
            detail:{},
            src:'',
            icon:{
                '宽带上网':"icon-wifi",'空调':"icon-kongdiao",
                '吹风机':"icon-chuifengji",'24小时热水':"icon-reshui",
                '暖气':"icon-nuanqi",'行李寄存':"icon-xinglijicun",
                '接站服务':"icon-jiezhanfuwu",'接机服务':"icon-jiejifuwu",
                '接待外宾':"icon-jiedaiwaibin",'西式餐厅':"icon-canting",
                '中式餐厅':"icon-zhongcanting",'残疾人设施':"icon-canjiren",
                '室外游泳池':"icon-shiwaiyouyongchi",'室内游泳池':"icon-shineiyouyongchi",
                '会议室':"icon-huiyishi",'健身房':"icon-jianshenfang-",
                'SPA':"icon-spa",'无烟房':"icon-mayishangchengdaizhifudengicon12",
                '商务中心':"icon-shangwuzhongxin",'酒吧':"icon-jiuba",
                '温泉':"icon-wenquan",'棋牌室':"icon-qipaishi"
            },
            intro:'',
            see:'查看更多',
        }
    },
    mounted(){
        this.getData();
        this.id = this.$route.params.id.substring(2);
    },
    components:{
        Rater,
    },
    methods:{
        getData(){
            axios.get('../../static/json/hotel.detail.json').then((res)=>{
                let data = res.data.data;
               
                for(let i=0; i<data.length; i++){
                    if(data[i].hotelid == this.id){
                        //  console.log(data[i])
                        this.detail = data[i];
                        this.src = data[i].img[0];
                        this.intro = data[i].intro.length>60?data[i].intro.substring(0,60):data[i].intro;
                    }
                }
            })
        },
        seeMoreIntro(){
            if(this.see == '查看更多'){
                this.intro = this.detail.intro;
                this.see = '收起'
            }else{
                this.intro = this.detail.intro.length>60?this.detail.intro.substring(0,60):this.detail.intro;
                this.see = '查看更多'
            }
        },
        toOrder(i){
            var path = this.$route.params.id;
            this.$router.push({name:'order',params:{type:'hotel',id:path,room:i}})
        },
        goMap(addr,name){
            this.$router.push({name:'map',query:{addr:addr,name:name}})
        }
    }
}
</script>

