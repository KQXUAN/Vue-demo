<template>
    <div class="log">
        <div class="log-head">
            <p>登录</p>
        </div>
        <div class="box">
            <div class="username">
                <p>手机号码</p>
                <x-input mask="999 9999 9999" v-model="phone" :max="13" is-type="china-mobile"></x-input>
            </div>
            <div class="password">
                <p>密码</p>
                <input :type="isShow?'text':'password'" class="pwd" v-model="pwd" maxlength="6">
            </div>
            <p class="show-pwd" @click="isShow = !isShow">{{isShow?'隐藏':'显示'}}</p>
        </div>
        <footer>
            <div class="in">
               <p class="login-btn" @click="login">登录</p>
            </div>
        </footer>
        <alert v-model="show" :title="('提示')" >请输入正确的手机号码与密码，谢谢~</alert>
    </div>
    
</template>
<style>
    @import url('../assets/css/login.css');
</style>
<script>
import { XInput, Alert } from 'vux';
import store from '@/store/store.js'
export default {
    data(){
        return{
            phone:'',
            pwd:'',
            isShow:false,
            show:false
        }
    },
    mounted(){
        document.getElementsByClassName('log')[0].style.height = window.screen.height +'px';
    },
    components:{
        XInput,Alert,
        store
    },
    methods:{
        login(){
            var nameArr = [
                'Shawn','Charlie',
                'Tylor','Troye',
                'Selena','Justin',
                'Billie','Sheeran',
                'Zedd','Alan'
            ];
            let random = Math.floor(Math.random()*10);
            if(this.phone != '' && this.pwd != ''){
                store.commit('login',nameArr[random]);
                this.$router.push({path:'/'})
            }else{
                this.show = true;
            }
            
        }
    }
}
</script>