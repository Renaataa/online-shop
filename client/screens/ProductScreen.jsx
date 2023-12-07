import { View } from 'react-native';
import ProductItem from '../components/ProductItem';

export default function ProductScreen({ route }) {
  const { productId } = route.params

  return (
    <View>
      <ProductItem productId={productId} />
    </View>
  )
}