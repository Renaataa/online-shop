import { View } from 'react-native';
import ListProducts from '../components/ListProducts';

export default function ListProductsScreen({ navigation }) {    
  return (
    <View>     
      <ListProducts navigation={navigation} />
    </View>
  )
}