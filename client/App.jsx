import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';
import HomeScreen from './screens/HomeScreen';
import ListProductsScreen from './screens/ListProductsScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator()

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="ListProducts" component={ListProductsScreen} options={{ headerTitle: 'Products' }}/>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App

