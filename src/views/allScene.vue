<template>
    <div class="container">
        <search :backIcon="backIcon" v-on:searchAll="search" ></search>
        <div class="city-box">
            <div class="scene-scroll">
                <div class="scene-i" v-for="(s,index) in sceneArr" 
                :key="index" @click="$router.push({name:'scene',params:{id:'sc'+s.scenic_id}})">
                    <div class="scene-image">
                        <img :src=s.img[0] alt="">
                    </div>
                    <div class="scene-n-p">
                        <p class="scene-a-name">{{s.name}}</p>
                        <p class="scene-a-price">￥{{s.price}}起</p>
                    </div>
                    <div class="rater-star">
                    <rater v-model=s.score :font-size="20" active-color="#04BE02"></rater>
                        <span>{{s.score}}</span>
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
            sceneArr:[],
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
            axios.get('../../static/json/scenics.json').then((res)=>{
                this.sceneArr = res.data.data;
                this.backUpArr = res.data.data;
            })
        },
        search(item){
             var arr = [];
            if(item != ''){
                this.sceneArr.forEach((i)=>{
                    if(i.city == item || i.name.indexOf(item) >=0 ){
                        arr.push(i)
                    }
                })
                console.log(arr)
                this.sceneArr = arr;
            }else{
                 this.sceneArr = this.backUpArr ;
            }
           
        }
        
    }
}
</script>

