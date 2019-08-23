<template>
    <div class="container">
        <div class="scene-detail">
            <span @click="$router.go(-1)"><i class="iconfont">&#xe60a;</i></span>
            <img :src=src alt="">
        </div>
        <div class="scene-info">
            <div class="scene-name"><p>{{detail.name}}</p></div>
            <div class="little-desc"><p>{{detail.introduction}}</p></div>
            <div class="scene-address"><p>{{detail.address}}</p><i class="iconfont" @click="goMap(detail.address,detail.name)" style="color:#3c9bc2">&#xe741;</i></div>
        </div>
        <div class="scene-desc">
            <p class="desc-title">景点介绍</p>
            <p class="desc-text">{{intro}}</p>
            <span class="see-more" @click="seeMoreIntro">{{see}}</span>
        </div>
        <div class="scene-open">
            <p class="open-title">开放时间</p>
            <p class="open-time" v-for="(t,index) in detail.open_time" :key="index">{{t}}</p>
        </div>
         <!-- 景点特惠政策 -->
        <div class="policy" v-if="detail.preferential_policies">

            <div class="scenic-policy" >
                <p class="policy-title">特惠政策</p>
                <p class="policy-content">{{detail.preferential_policies}}</p>
            </div>
        </div>
        <div class="scene-tips">
            <p class="tips-title">小贴士</p>
            <ul>
                <li class="tips" v-for="(t,index) in detail.tips" :key="index"><i class="iconfont tips-icon" >&#xe602;</i>{{t}}</li>
            </ul>
        </div>
        <div class="ticketBox">
            <p class="ticket-title">门票类型</p>
            <div class="ticketAll">
                <div class="ticket" v-for="(t, index) in detail.ticket" :key="index">
                    <p class="set-name">{{t.type}}</p>
                    <ul>
                        <li v-for="(k,i) in t.kind" :key="i">
                            <p class="ticket-name">{{k.name}}</p>
                            <div class="booking">
                                <p class="ticket-price">￥{{k.price}}</p>
                                <p class="bookBtn" @click="toOrder(index+'&'+i)">预订</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    @import url('../assets/css/scene.css');
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
            axios.get('../../static/json/scenics.json').then((res)=>{
                let data = res.data.data;
                console.log(data)
                for(let i=0; i<data.length; i++){
                    if(data[i].scenic_id == this.id){
                        this.detail = data[i];
                        this.src = data[i].img[0];
                        this.intro = data[i].content.length>60?data[i].content.substring(0,60):data[i].content;
                    }
                }
            })
        },
        seeMoreIntro(){
            if(this.see == '查看更多'){
                this.intro = this.detail.content;
                this.see = '收起'
            }else{
                this.intro = this.detail.content.length>60?this.detail.content.substring(0,60):this.detail.content;
                this.see = '查看更多'
            }
        },
        toOrder(i){
            var path = this.$route.params.id;
            this.$router.push({name:'order',params:{type:'scene',id:path,room:i}})
        },
        goMap(addr,name){
            this.$router.push({name:'map',query:{addr:addr,name:name}})
        }
    }
}
</script>

