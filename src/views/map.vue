<template>
    
    <div class="container">
        <div class="head">
            <span @click="$router.go(-1)"><i class="iconfont">&#xe60a;</i></span>
            <span class="name">{{$route.query.name}}</span>
        </div>
        <div id="allMap"></div>
    </div>
</template>
<style>
    .head{
        display:flex;
        width: 100%;
        height: 8vh;
        background-color: #ffffff;
        align-items: center;
    }
    .head i{
        font-size: 30px;
        margin-right: 3vw;
    }
    .name{
        font-size: 20px;
        
    }
    #allMap{
        width: 100%;
        height: 100vh;
    }
</style>
<script>
export default {
    mounted(){
        this.getMap();
    },

    methods:{
        getMap(){
            // 百度地图API功能
            var map = new BMap.Map('allMap');
            var point = new BMap.Point(116.404, 45.915);
            var addr = this.$route.query.addr;
            map.centerAndZoom(point, 30);
            map.enableScrollWheelZoom(true);
            var myGeo = new BMap.Geocoder();
            var local = new BMap.LocalSearch(map, {   
                    
                    renderOptions:{map: map}      
            });     
            local.search(addr);
                }
            }
}
</script>