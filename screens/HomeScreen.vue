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
							<text class="direccion">{{item.direccion}}</text>
						</touchable-opacity>
            <!-- <button title="Go to the Details screen" @press="changeRoute"></button> -->
        </view>
    </scroll-view>
    <view class="absolute">
      <touchable-opacity class="add-product" :on-press="actionRoute">
        <text class="color-white">Add</text>
      </touchable-opacity>
      <touchable-opacity class="edit-product">
        <text class="color-white">Edit</text>
      </touchable-opacity>
      <touchable-opacity class="delete-product">
        <text class="color-white">Delete</text>
      </touchable-opacity>
    </view>
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

.absolute{
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 40;
}
.add-product{
  width: 80;
  height: 40;
  border-radius: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #065c6f;
  margin-right: 10;
}
.edit-product{
  width: 80;
  height: 40;
  border-radius: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff9642;
  margin-right: 10;
}
.delete-product{
  width: 80;
  height: 40;
  border-radius: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #931a25;
}
.color-white{
  color: white;
}
.direccion{
  font-style: italic;
}
</style>
<script>
import * as env from './../env.config';
import axios from "axios";
export default {
	data: function(){
		return{
			listaTiendas : [],
      itemSelected : []
		}
	}, 
  props: {
    navigation: { type: Object }
  },
  methods: {
    changeRoute(item) {
      this.itemSelected = item;
      this.navigation.navigate('Details',{
				datos: item
			});
    },
    actionRoute(){
      this.navigation.navigate('ActionsStore',{
        datos:this.itemSelected
      });
    }
  },
  mounted: function(){
		axios.get( `${env.API_CALL}/tiendas`).then(res=>{
			this.listaTiendas = res.data;
		})
  }
}
</script>
