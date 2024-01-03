import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './store';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import ListProductsScreen from './screens/ListProductsScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const ScreensProducts = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: 'Products',
        title: 'Products',
        headerRight: ({ navigation }) => (
          <Pressable
            style={styles.shopCart}
            onPress={() => navigation.navigate('Cart')} // !!!!!!!!!!!!!!!!!!!!!!!!!!
          >
            <Feather name="shopping-bag" size={24} color="black" />
          </Pressable>
        )  
      }}
    >
      <Stack.Screen
        name="ListProductsScreen"
        component={ListProductsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Product" component={ProductScreen}/>
      <Stack.Screen name='Cart' component={CartScreen}/>
    </Stack.Navigator>
  )
}

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ScreensProducts" component={ScreensProducts} /> 
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
    shopCart: {
        marginRight: 14
    }
})

export default App

