import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useEffect } from 'react';
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

const ScreensProducts = ({ navigation }) => {

  useEffect(() => {
    if (navigation) {
      navigation.setOptions({
        headerTitle: 'Products',
        title: 'Products',
        headerRight: () => (
          <Pressable
            style={styles.shopCart}
            onPress={() => navigation.navigate('Cart')}
          >
            <Feather name="shopping-bag" size={24} color="black" />
          </Pressable>
        )  
      })  
    }      
  }, [navigation])
    
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListProducts"
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

  // Создаем состояние auth - true/false
  // Проверять если ли токен у нас в хранилище - если токена нет - ставим auth false
  // Если токен есть - отправляем запрос на его перевыпуск и сохраняем с хранилище новый токен если пришел и авторизовуешь auth true
  // если пришла ошибка - удаляем токен и ставим аuth - false

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

