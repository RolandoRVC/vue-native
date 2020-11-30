<template>
  <view class="container">
      <status-bar background-color="blue" bar-style="ligth-content"/>
    <view class="form">
      <view class="item-input">
        <text class="text-style">Store Name:</text>
        <text-input class="input-style" v-model="name"/>
      </view>

      <view class="item-input">
        <text class="text-style">Store Direction:</text>
        <text-input class="input-style" v-model="direction"/>
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

export default {
  props: {
    navigation: {type: Object},
  },
  data: function () {
    return {
      name:'',
      direction: ''
    };
  },
  methods: {
    saveStore() {
      const body = {
        nombre : this.name,
        direccion : this.direction
      }
      axios.post(`${env.API_CALL}/tiendas`,body).then((res)=>{
        if(res.status === 201){
          console.log(res.data)
          this.navigation.navigate("Home");
        }
      })
    },
  },
};
</script>
