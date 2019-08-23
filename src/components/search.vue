<template>
    <div class="searchBox">
        <div @click="jump">
            <x-icon v-if="backIcon" type="ios-arrow-back" size="30" @click="$router.go(-1)"></x-icon>
            <x-input class="search" :show-clear="false"
             placeholder='请尝试"广州"' v-model="searchItem" 
              @on-change="showAll" :disabled="!backIcon"></x-input>
            <div class="searchBtn"><i class="iconfont" @click.stop="search">&#xe6dc;</i></div>
        </div>
    </div>
</template>
<style>
    @import url('../assets/css/index.css');
</style>
<script>
import {  XInput } from 'vux'
export default {
    props:["backIcon"],
    data(){
        return {
            searchItem:'',
        }
    },
    components: {
        XInput,
    },
    methods:{
        search(){
            this.$emit("searchAll",this.searchItem)
        },
        showAll(val){
            if(val == ''){
                this.$emit("searchAll",val)
            }
            
        },
        jump(){
            this.$emit("jumpTo")
        }
    }
}
</script>

