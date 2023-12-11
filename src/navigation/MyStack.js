import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home.js";
import Plant from "../screens/Plant.js";

const HomeStack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <HomeStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      >
        <HomeStack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
          }}
        />
        <HomeStack.Screen
          name="Plant"
          component={Plant}
          options={{ title: "plant" }}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
