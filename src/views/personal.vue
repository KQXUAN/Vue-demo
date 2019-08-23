<template>
    <div class="personal">
        <div class="userInfo">
            <div class="userName"><p><span>亲爱的，</span>{{username}}</p></div>
        </div>
        <div class="userElse">
            <div class="history-order">
                <p @click="checkOrder">历史订单</p>
                <span class="his-number" v-if="number>0">{{number}}</span>
            </div>
            <div class="logout" @click="logout">
                <p>{{text}}</p>
            </div>
        </div>
        <viewFooter></viewFooter>
    </div>
</template>
<style>
    @import url('../assets/css/personal.css');
</style>
<script>
import viewFooter from '@/components/footer'
import store from '@/store/store.js';

export default {
    data(){
        return{
            username:'',
            text:'退出',
            number:1,
        }
    },
    mounted(){
        this.init();
    },
    components:{
        store,
        viewFooter,
    },
    methods:{
        init(){
            if(store.state.userName != ''){
                this.username = store.state.userName;
            }else{
                this.username = '请先登录';
                this.text = '登录'
            }
            this.number = store.state.orderNumber;
        },
        checkOrder(){
            this.$router.push('/orderPage');
            store.state.orderNumber = 0;
        },
        logout(){
            if(store.state.userName != ''){
                store.commit('logout');
                this.init();
            }else{
                this.$router.push({path:'/login'})
            }
        }
    }
}
</script>