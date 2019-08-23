<template>
    <div>
        <p @click="add">+</p>
        <h3>{{num}}</h3>
        <p @click="reduce">-</p>
    </div>
</template>
<script>
export default {
    props:['num'],
    data(){
        return {
            // num:0
        }
    },
    methods:{
        add(){
            this.$emit("addnum") 
        },
        reduce(){
            this.$emit("reducenum");
        }
    }
}
</script>

