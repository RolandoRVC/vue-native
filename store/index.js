import Vue from "vue-native-core";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
   actions:{
      SET_STORES: (context, data) => {
          context.commit("SET_STORE_LIST", data);
      },
      ADD_STORE:(context, data)=>{
          context.commit("ADD_STORE_LIST", data);
      },
       EDIT_STORE:(context, data)=>{
          for (const store in context.state.StoreList) {
               if (data.id === parseInt(context.state.StoreList[store].id)) {
                   context.commit("EDIT_STORE_LIST", {id: store, name: data.name, direction: data.direction})
                   return;
               }
           }
       },
       DELETE_STORE:(context, storeId)=>{
           for (const store in context.state.StoreList) {
               if (storeId === parseInt(context.state.StoreList[store].id)) {
                   context.commit("DELETE_STORE_LIST", storeId)
                   return ;
               }
           }
       },
       //Products
       SET_PRODUCTS: (context, data) => {
           context.commit("SET_PRODUCT_LIST", data);
       },
       ADD_PRODUCTS:(context, data)=>{
          context.commit("ADD_PRODUCT_LIST", data);
       },
       EDIT_PRODUCTS:(context, data)=>{
           for (const product in context.state.ProductsList.productos) {
               if (data.id === parseInt(context.state.ProductsList.productos[product].id)) {
                   context.commit("EDIT_PRODUCT_LIST", {id: product, name: data.name, price: data.price})
                   return;
               }
           }
       },
       DELETE_PRODUCTS:(context, productId)=>{
           for (const product in context.state.ProductsList.productos) {
               if (productId === parseInt(context.state.ProductsList.productos[product].id)) {
                   context.commit("DELETE_PRODUCT_LIST", productId)
                   return ;
               }
           }
       }
   },
   mutations:{
       SET_STORE_LIST : (state, post) =>{
           state.StoreList = post;
       },
       ADD_STORE_LIST : (state, store)=>{
           state.StoreList.push(store);
       },
       EDIT_STORE_LIST : (state, store)=>{
           state.StoreList[store.id].nombre = store.name;
           state.StoreList[store.id].direccion = store.direction;
       },
       DELETE_STORE_LIST : (state, storeId)=>{
           state.StoreList = state.StoreList.filter(
               store => store.id !== storeId
           );
       },
       //Products
       SET_PRODUCT_LIST : (state, post) =>{
           state.ProductsList = post;
       },
       ADD_PRODUCT_LIST : (state, product)=>{
           state.ProductsList.productos.push(product);
       },
       EDIT_PRODUCT_LIST : (state, product)=>{
           state.ProductsList.productos[product.id].nombre = product.name;
           state.ProductsList.productos[product.id].precio = product.price;
       },
       DELETE_PRODUCT_LIST : (state, productId)=>{
           state.ProductsList.productos = state.ProductsList.productos.filter(
               product => product.id !== productId
           );
       }
   },
   state:{
       StoreList : [],
       ProductsList : []
   },

});
export default store;