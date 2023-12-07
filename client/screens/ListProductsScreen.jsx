import ListProducts from '../components/ListProducts';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductScreen from './ProductScreen';

const Stack = createNativeStackNavigator();

export default function ListProductsScreen({ navigation }) {  
  return (
    <ListProducts navigation={navigation} />
  )
}