<template>
  <view class="container">
      <status-bar background-color="blue" bar-style="light-content"/>
    <view class="form">
      <view class="item-input">
        <text class="text-style">Product Name:</text>
        <text-input class="input-style" v-model="name"/>
      </view>

      <view class="item-input">
        <text class="text-style">Product Price:</text>
        <text-input keyboardType="numeric" class="input-style" v-model="price"/>
      </view>
    </view>
    <view class="center">
      <touchable-opacity class="add-store" :on-press="saveStore">
        <text class="color-white">Save</text>
      </touchable-opacity>
    </view>
  </view>
</template>


<style>
.form{
  margin-top: 15;
}
.item-input{
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 20;
  padding-right: 20;
}
.text-style{
  font-size: 16;
}
.input-style{
  height: 40;
  font-size: 20;
  width: 100%;
  margin-top: 5;
  padding: 5;
  border-color: #F5F6F7;
  border-width: 1;
  border-radius: 5;
  background-color: #F5F6F7;
}
.center{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.add-store {
  margin-top: 15;
  width: 100;
  height: 40;
  border-radius: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #065c6f;
  margin-right: 10;
}

.color-white {
  font-size: 17;
  color: #ffffff;
}

</style>


<script>
import * as env from "./../../env.config";
import axios from "axios";
import store from "../../store";

export default {
  props: {
    navigation: {type: Object},
  },
  data: function () {
    return {
      mode:'add', //add or edit
      name:'',
      price: '',
      id: '',
    };
  },
  methods: {
    saveStore() {
      const body = {
        nombre : this.name,
        precio : this.price
      }
      if(this.mode !== "edit"){
        axios.post(`${env.API_CALL}/productos`, {...body, tienda : store.state.ProductsList.id}).then((res)=>{
          if(res.status === 201){
            store.dispatch("ADD_PRODUCTS", {...body, id: res.data.id})
            this.navigation.navigate("Details");
          }
        })
      }
      else{
        axios.patch(`${env.API_CALL}/productos/${this.id}`, {...body, tienda: store.state.ProductsList.id}).then(res => {
          if(res.status === 200){
            store.dispatch("EDIT_PRODUCTS", {name: this.name, price : this.price, id : this.id} )
            this.navigation.navigate("Details")
          }
         })
      }
    },
  },
  mounted : function(){
    const details = this.navigation.getParam("datos");
    if (details){
      this.name = details.nombre;
      this.price = details.precio.toString();
      this.mode = "edit";
      this.id = details.id;
    }
  }
};
</script>
