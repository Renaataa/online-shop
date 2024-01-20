import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

export default function HomeScreen() {

  const user = useSelector((store) => store.userReducer)

  console.log(user)

  // 1 Запуск без токена
  // 2 Запуск с неправильным токеном
  // 3 Запуск с правильным токеном 

  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  )
}