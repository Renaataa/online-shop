import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './store';
import HomeScreen from './screens/HomeScreen';
import ListProductsScreen from './screens/ListProductsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductScreen from './screens/ProductScreen';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()


const ScreensProducts = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ScreenA" component={ListProductsScreen} options={{headerShown:false}}/>
      <Stack.Screen name="ScreenB" component={ProductScreen}/>
    </Stack.Navigator>
  )
}

const TabNavigator = () => {
  return (
     <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="ListProducts" component={ScreensProducts} options={{ headerTitle: 'Products' }}/>
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


export default App

