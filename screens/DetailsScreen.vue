<template>
  <view class="container">
      <status-bar
            background-color="blue"
            bar-style="ligth-content"
        />
    <text v-if="tiendaDetalle">{{tiendaDetalle.nombre}}</text>
  </view>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    navigation: { type: Object }
  },
  data:function(){
      return{
          productos:[],
          tiendaDetalle: undefined
      }
  },
  methods: {
    goToHomeScreen() {
      this.navigation.navigate("Home");
    }
  },
  mounted: function(){
      this.tiendaDetalle = this.navigation.getParam('datos')
      console.log(this.tiendaDetalle.id)
      axios.get("http://7b8f7db0901f.ngrok.io/tiendas/"+this.tiendaDetalle.id+"?join=productos").then(res=>{
        console.log(res.data);
      });
  }
}
</script>

<style>
.container {
  align-items: center;
  justify-content: center;
  flex: 1;
}
</style>
