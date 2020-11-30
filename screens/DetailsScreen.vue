<template>
  <view class="container">
    <view>
      <status-bar background-color="blue" bar-style="ligth-content" />
      <text v-if="tiendaDetalle">{{ tiendaDetalle.nombre }}</text>
    </view>
    <view class="absolute">
      <touchable-opacity class="add-product">
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

<script>
import * as env from "./../env.config";
import axios from "axios";
export default {
  props: {
    navigation: { type: Object },
  },
  data: function () {
    return {
      productos: [],
      tiendaDetalle: undefined,
    };
  },
  methods: {
    goToHomeScreen() {
      this.navigation.navigate("Home");
    },
  },
  mounted: function () {
    this.tiendaDetalle = this.navigation.getParam("datos");
    console.log(this.tiendaDetalle.id);
    axios
      .get(
          `${env.API_CALL}/tiendas/${this.tiendaDetalle.id}?join=productos`
      )
      .then((res) => {
        console.log(res.data);
      });
  },
};
</script>

<style>
.container {
  align-items: center;
  justify-content: center;
  flex: 1;
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
  color: #ffffff;
}

</style>
