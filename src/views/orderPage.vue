<template>
    <div class="container">
        <div class="order-head">
            <span @click="$router.go(-1)"><i class="iconfont">&#xe60a;</i></span>
            <p class="head-name">全部订单</p>
        </div>
        <div class="order">
            <div class="select-head">
                <p class="hotel-head" :class="isActive?'select-active':''" @click="changeItem">酒店<i></i></p>
                <p class="scene-head" :class="!isActive?'select-active':''" @click="changeItem">景点<i></i></p>
            </div>
            <div class="orderList">
                <ul>
                    <li v-for="(item,index) in order" :key="index">
                        <div class="order-detail">
                            <div class="name-price">
                                <p class="order-name">{{item.name}}</p>
                                <div class="order-price">￥{{item.total}}</div>
                            </div>
                            <div class="order-date">
                                <p>{{item.date}}</p>
                            </div>
                            <div class="else">
                                <p class="order-days">{{item.cate == 'hotel'?item.days+'晚':item.number+'张'}}</p>
                                <p class="order-rooms" v-if="item.cate == 'hotel'">{{item.number}}间</p>
                                <p class="order-room-type">{{item.type}}</p>
                            </div>
                            <div class="order-state"><p>预订成功</p></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
</template>
<style>
    @import url('../assets/css/orderPage.css');
</style>
<script>
import store from '@/store/store.js'
export default {
    data(){
        return{
            isActive:true,
            order:[],
        }
    },
    mounted(){
        this.getList()
    },
    components:{
        store
    },
    methods:{
        getList(){
            if(this.isActive){
                this.order = store.state.hotel;
            }else{
                this.order = store.state.scene;
            }
            
            console.log(this.order)
        },
        changeItem(){
            this.isActive = !this.isActive;
            this.getList();
        }
    }
}
</script>