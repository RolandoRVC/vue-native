<template>
  <view class="container">
    <status-bar
        background-color="blue"
        bar-style="light-content"
    />
    
    <scroll-view :style="{width: '100%'}">
        <view v-for="(item, index) in listaTiendas" :key="index" class="tiendas">
            <touchable-opacity class="flex-container" :on-press="()=> changeRoute(item)">
							<text class="espacio">{{item.nombre}}</text>
							<text>{{item.direccion}}</text>
						</touchable-opacity>
            <!-- <button title="Go to the Details screen" @press="changeRoute"></button> -->
        </view>
    </scroll-view>
    
  </view>
</template>
<style>
.container {
  align-items: center;
  justify-content: center;
  flex: 1;
}
.tiendas{
	padding: 9;
	width: 100%;
	border-bottom-width: 1;
	border-color: rgb(221, 221, 221);
}
.espacio{
	padding-bottom: 5;
}

</style>
<script>
import axios from "axios";
export default {
	data: function(){
		return{
			listaTiendas : []
		}
	}, 
  props: {
    navigation: { type: Object }
  },
  methods: {
    changeRoute(item) {
			console.log(item)
      this.navigation.navigate('Details',{
				datos: item
			});
    }
  },
  mounted: function(){
		axios.get("http://7b8f7db0901f.ngrok.io/tiendas").then(res=>{
			this.listaTiendas = res.data;
			console.log(listaTiendas)
		})
  }
}
</script>
