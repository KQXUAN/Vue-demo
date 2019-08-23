<template>
    <div class="container">
        <search :backIcon="backIcon" v-on:searchAll="search" ></search>
        <div class="city-box">
            <div class="hotel-list">
                <div class="hotel-i" v-for="(h,index) in allHotel"
                    :key="index" @click="$router.push({name:'hotel',params:{id:'ht'+h.hotelid}})">
                    <div class="hotel-image">
                        <img :src=h.img[0] alt="">
                    </div>
                    <div class="hotel-n-p">
                        <p class="hotel-a-name">{{h.hotelname}}</p>
                        <p class="hotel-a-price">￥{{h.minprice}}起</p>
                    </div>
                    <div class="rater-star">
                        <rater v-model=h.score :font-size="20" active-color="#63a1e4"></rater>
                        <span>{{h.score}}</span>
                    </div>
                </div>
                
            </div> 
        </div>
    </div>
</template>
<style>
    @import url('../assets/css/allHotel.css');
</style>

<script>
import {  Rater } from 'vux'
import axios from 'axios'

import search from '@/components/search'
export default {
    data(){
        return{
            searchItem:'',
            backIcon:true,
            allHotel:[],
            backUpArr:[]
        }
    },
    mounted(){
        this.getList()
    },
    components:{
        Rater,
        search,
    },
    methods:{
        getList(){
            axios.get('../../static/json/hotel.list.json').then((res)=>{
                this.allHotel = res.data.data.list;
                this.backUpArr = res.data.data.list;
            })
        },
        search(item){
             var arr = [];
            if(item != ''){
                this.allHotel.forEach((i)=>{
                    if(i.city == item || i.hotelname.indexOf(item) >=0 ){
                        arr.push(i)
                    }
                })
                console.log(arr)
                this.allHotel = arr;
            }else{
                 this.allHotel = this.backUpArr ;
            }
           
        }
        
    }
}
</script>

