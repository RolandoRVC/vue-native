<template>
  <view class="container">
    <view>
      <status-bar background-color="blue" bar-style="light-content"/>
    </view>
    <scroll-view :style="{width: '100%'}">
      <view v-for="(item, index) in returnListProducts.productos" :key="index" class="tiendas">
        <touchable-opacity class="flex-container" :on-press="()=> changeRoute(item)">
          <text class="espacio">{{item.nombre}}</text>
          <text class="direccion">$ {{item.precio}}</text>
        </touchable-opacity>
      </view>
    </scroll-view>
    <view class="absolute">
      <touchable-opacity class="add-product" :on-press="actionRoute">
        <text class="color-white">Add</text>
      </touchable-opacity>
      <touchable-opacity class="edit-product"
                         :style="{backgroundColor: actionSelected.edit? '#ab794f': '#ff9642'}"
                         :on-press="editSelected">
        <text class="color-white">Edit</text>
      </touchable-opacity>
      <touchable-opacity class="delete-product"
                         :style="{backgroundColor: actionSelected.delete ? '#6b262d' : '#931a25'}"
                         :on-press="openModalDelete">
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

.tiendas{
  padding: 9;
  width: 100%;
  border-bottom-width: 1;
  border-color: rgb(221, 221, 221);
}
.espacio{
  padding-bottom: 5;
}
.direccion{
  font-style: italic;
  color: green;
}
</style>
<script>
import * as env from "./../env.config";
import axios from "axios";
import store from "../store";
import {Alert} from "react-native";
export default {
  props: {
    navigation: { type: Object },
  },
  data: function () {
    return {
      actionSelected:{
        edit: false,
        delete: false
      },
      productos: [],
      tiendaDetalle: undefined,
      itemSelected : []
    };
  },
  computed:{
    returnListProducts (){
      return this.productos = store.state.ProductsList;
    }
  },
  methods: {
    goToHomeScreen() {
      this.navigation.navigate("Home");
    },
    actionRoute(){
      this.navigation.navigate('ActionsProduct');
    },
    editSelected(){
      if(this.actionSelected.delete){
        this.actionSelected.delete = false;
      }
      this.actionSelected.edit = !this.actionSelected.edit;
    },
    openModalDelete(){
      if (this.actionSelected.edit){
        this.actionSelected.edit = false;
      }
      this.actionSelected.delete = !this.actionSelected.delete;
    },
    deleteSelected(){
      store.dispatch("DELETE_PRODUCTS", this.itemSelected.id)
return ;
      axios.delete(`${env.API_CALL}/productos/${this.id}`).then(res=>{
        if(res.status === 200){
          store.dispatch("DELETE_PRODUCTS", this.itemSelected.id)
        }
      })
    },
    changeRoute(item) {
      this.itemSelected = item;
      if  (this.actionSelected.edit){
        this.navigation.navigate('ActionsProduct',{
          datos: item
        });
      }
      else if (this.actionSelected.delete){
        Alert.alert(
            'Heyy!',
            'Are you sure you want to remove it?',
            [
              {text: 'OK', onPress: () =>
                    this.deleteSelected()
              },
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
            ],
            { cancelable: false }
        );
      }
      else{
        return false;
      }
    },
  },
  mounted: function () {
    this.tiendaDetalle = this.navigation.getParam("datos");
    axios
      .get(
          `${env.API_CALL}/tiendas/${this.tiendaDetalle.id}?join=productos`
      )
      .then((res) => {
        store.dispatch("SET_PRODUCTS", res.data);

      });
  },
};
</script>


