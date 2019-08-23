<template>
    <div class="container">
        <search :backIcon="backIcon" v-on:jumpTo="jump"></search>
        <div class="mainer">
            <!-- 分类 -->
            <div class="categoryBox">
                <h2>探索爱旅</h2>
                <div>
                    <router-link class="cate-type cateRoom" href="javascript:;" to="/allHotel">
                        <img src="http://himg1.qunarzz.com/imgs/201612/06/JhS1_tb0bzCrTgc1J120.jpg" alt="">
                        <p class="cate-name">酒店</p>
                    </router-link>
                    <router-link class="cate-type cateSc" href="javascript:;" to="/allScene">
                        <img src="https://imgs.qunarzz.com/p/tts1/1708/19/fd1b8ca2fff54d02.jpg_r_390x260x90_4da8e873.jpg" alt="">
                        <p class="cate-name">景点</p>
                    </router-link>
                </div>
                
            </div>
            <!-- 酒店 -->
            <div class="hotelBox">
                <div class="boxTitle">
                    <h2>酒店</h2>
                    <router-link class="more" href="javascript:;" to="/allHotel">查看更多></router-link>
                </div>
                <div class="hotel-scroll">
                    <div class="hotelBox" >
                        <div class="hotel" v-for="(h,index) in hotelArr"
                         :key="index" @click="$router.push({name:'hotel',params:{id:'ht'+h.hotelid}})">
                            <div class="hotel-pic">
                                <img :src=h.img[0] alt="">
                            </div>
                            <div class="hotel-name-price">
                                <p class="hotel-name">{{h.hotelname}}</p>
                                <p class="hotel-price">￥{{h.minprice}}起</p>
                            </div>
                            <div class="rater-star">
                                <rater v-model=h.score :font-size="15" active-color="#04BE02"></rater>
                                <span>{{h.score}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 景点 -->
            <div class="sceneBox">
               <div class="boxTitle">
                   <h2>景点</h2>
                   <router-link class="more" href="javascript:;" to="/allScene">查看更多></router-link>
                </div> 
                <div class="scene-scroll">
                    <div class="scene" v-for="(s,index) in sceneArr" 
                    :key="index" @click="$router.push({name:'scene',params:{id:'sc'+s.scenic_id}})">
                        <div class="scene-pic">
                            <img :src=s.img[0] alt="">
                        </div>
                        <div class="scene-name-price">
                            <p class="scene-name">{{s.name}}</p>
                            <p class="scene-price">￥{{s.price}}起</p>
                        </div>
                        <div class="rater-star">
                        <rater v-model=s.score :font-size="15" active-color="#04BE02"></rater>
                            <span>{{s.score}}</span>
                        </div>
                    
                    </div>
                </div>                   
            </div>
            <!-- 热门搜索 -->
            <div class="HotPlaceBox">
               <div class="boxTitle">
                   <h2>热门搜索</h2>
                   <span class="more">查看更多></span>
                </div>  
                <div class="hot-scroll">
                    <div class="hotPlace" v-for="(hot,index) in hotArr" 
                    :key="index" @click="$router.push({name:(index>=2?'scene':'hotel'),params:{id:(index<2?'ht'+hot.hotelid : 'sc'+hot.scenic_id)}})">
                        <div class="hotel-pic">
                            <img :src=hot.img[0] alt="">
                        </div>
                        <div class="hotPlace-name-price">
                            <p class="hotPlace-name">{{hot.hotelname || hot.name}}</p>
                            <p class="hotPlace-price">￥{{hot.minprice || hot.price}}</p>
                        </div>
                        <div class="rater-star">
                            <rater v-model=hot.score :font-size="15" active-color="#04BE02" disabled></rater>
                            <span>{{hot.score}}</span>
                        </div>
                    </div>
                </div>                  
            </div>
        </div>
        <viewFooter></viewFooter>
    </div>
</template>
<style>
    @import url('../assets/css/index.css');
</style>

<script>
import { Group, XInput, Cell, Rater } from 'vux'
import axios from 'axios'

import search from '@/components/search'
import viewFooter from '@/components/footer'
export default {
    data(){
        return{
            backIcon:false,
            sceneArr: [],
            hotelArr: [],
            hotArr: [],
            star:4
        }
    },
    mounted(){
        this.getData();
    },
    components: {
        Group,XInput, Cell, Rater,
        viewFooter,
        search
    },
    methods:{
        getData(){
            axios.get('../../static/json/hotel.list.json').then((res)=>{
                let length = res.data.data.list.length;
                let arr = [];
                for(let i=0; i<2; i++){
                    arr.push(res.data.data.list[i])
                }
                this.hotelArr = arr;
            })
            axios.get('../../static/json/scenics.json').then((res)=>{
                let length = res.data.data.length;
                let arr = [];
                for(let i=0; i<2; i++){
                    arr.push(res.data.data[i])
                }
                this.sceneArr = arr;
                this.hotArr = [...this.hotelArr,...this.sceneArr]
            })
        },
        jump(){
            this.$router.push({path:'/searchPage'})
        }
    }
}
</script>
