<template>
    <footer>
      <div class="paddingBottom"></div>

      <div class="footer">
        <ul class="footer-nav">
          <li @click="skip_index"><i class="iconfont">&#xe6dc;</i><span>全部</span></li>
          <li @click="skip_personPage"><i class="iconfont">&#xe625;</i><span>我的</span> <p class="footer-number" v-if="number>0">{{number}}</p></li>
        </ul>
      </div>

    </footer>
</template>
<style>
  @import url('../assets/css/footer.css');
</style>
<script>
import store from '@/store/store.js';

export default {
    data(){
        return{
          number:1
        }
    },
    mounted(){
      this.number = store.state.orderNumber;
    },
    components:{
      store
    },
    methods:{
      skip_index(){
        this.$router.push({path:'/'})
      },
      skip_personPage(){
        this.$router.push({path:'personal'})
      },
    }
}
</script>
