<template>
  <app-navigator></app-navigator>
</template>

<script>
import { createAppContainer, createStackNavigator } from "vue-native-router";
import HomeScreen from "./screens/HomeScreen.vue";
import DetailsScreen from "./screens/DetailsScreen.vue";
import ActionsStoreScreen from "./screens/store-screens/ActionsStoreScreen.vue";

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Stores",
        headerStyle: {
          backgroundColor: "#1f4068",
          height: 45,
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 15,
        },
      },
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions: {
        title: "Store Detail",
        headerStyle: {
          backgroundColor: "#1f4068",
          height: 45,
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 15,
        },
      },
    },
    ActionsStore: {
      screen: ActionsStoreScreen,
      navigationOptions: {
        title: "Detail",
        headerStyle: {
          backgroundColor: "#03506f",
          height: 45,
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 15,
        },
      },
    },
  },
  {
    initialRouteName: "Home",
  }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
  components: { AppNavigator },
};
</script>
