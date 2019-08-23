<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <child :num="num" v-on:addnum="add" v-on:reducenum="reduce"></child>
    <p>parent:{{num}}</p>
  </div>
</template>

<script>
import child from './transform'
export default {
  name: 'HelloWorld',
  data () {
    return {
      num:20,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    child
  },
  methods:{
    add(){
      this.num ++;
    },
    reduce(){
      this.num --;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
