import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        orderNumber:0,
        userName:'',
        hotel:[],
        scene:[],
    },
    mutations:{
        orderCount(state){
            state.orderNumber++;
            
        },
        clearCount(state){
            state.orderNumber = 0
        },
        orderDetail(state,obj){
           let type = obj.cate;
            if(type == 'hotel'){
                state.hotel.push(obj);
            }else{
                state.scene.push(obj);
            }
        },
        login(state,name){
            state.userName = name;
        },
        logout(state){
            state.userName = '';
        }
    }
    
})