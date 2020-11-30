<template>
  <view class="container">
    <status-bar
        background-color="blue"
        bar-style="light-content"
    />
    
    <scroll-view :style="{width: '100%'}">
        <view v-for="(item, index) in returnListStores" :key="index" class="tiendas">
            <touchable-opacity class="flex-container" :on-press="()=> changeRoute(item)">
							<text class="espacio">{{item.nombre}}</text>
							<text class="direccion">{{item.direccion}}</text>
						</touchable-opacity>
            <!-- <button title="Go to the Details screen" @press="changeRoute"></button> -->
        </view>
    </scroll-view>
    <view class="absolute">
      <touchable-opacity class="refresh-product" :on-press="refreshStoreList">
        <text class="color-white">R</text>
      </touchable-opacity>
      <touchable-opacity class="add-product" :on-press="actionRoute">
        <text class="color-white">Add</text>
      </touchable-opacity>
      <touchable-opacity class="edit-product" :style="{backgroundColor: actionSelected.edit? '#ab794f': '#ff9642'}"
          :on-press="editSelected"
      >
        <text class="color-white">Edit</text>
      </touchable-opacity>
      <touchable-opacity  class="delete-product" :style="{backgroundColor: actionSelected.delete ? '#6b262d' : '#931a25'}"
          :on-press="openModalDelete"
      >
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
.refresh-product{
  width: 40;
  height: 40;
  border-radius: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4db566;
  margin-right: 10;
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
  margin-right: 10;
}
.delete-product{
  width: 80;
  height: 40;
  border-radius: 5;
  display: flex;
  justify-content: center;
  align-items: center;
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
import store from "../store";
import { Alert } from 'react-native';

export default {
	data: function(){
		return{
			listaTiendas : store.state.StoreList,
      itemSelected : [],
      actionSelected:{
			  edit: false,
        delete: false
      }
		}
	}, 
  props: {
    navigation: { type: Object }
  },
  computed:{
	  returnListStores (){
	    return this.listaTiendas = store.state.StoreList;
    }
  },
  methods: {
	  refreshStoreList(){
      axios.get( `${env.API_CALL}/tiendas`).then(res=>{
        store.dispatch("SET_STORES", res.data);
      })
    },
    changeRoute(item) {
      this.itemSelected = item;
      if  (this.actionSelected.edit){
        this.navigation.navigate('ActionsStore',{
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
        this.navigation.navigate('Details',{
          datos: item
        });
      }
    },
    actionRoute(){
      this.navigation.navigate('ActionsStore');
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
	    axios.delete(`${env.API_CALL}/tiendas/${this.itemSelected.id}`).then(res=>{
	      if(res.status === 200){
          store.dispatch("DELETE_STORE", this.itemSelected.id)
        }
      })
    }
  },
  mounted: function(){
		axios.get( `${env.API_CALL}/tiendas`).then(res=>{
			store.dispatch('SET_STORES', res.data);
		})
  }
}
</script>
