import { View } from 'react-native';
import { useState } from 'react';
import ListProducts from '../components/ListProducts';

export default function ListProductsScreen({ navigation }) {    

  const [requestSettings, setRequestSettings] = useState({
      page: 1,
      limit: 4,
      typeId: '',
      brandId: ''
  })
  
  return (
    <View>
      {/* <FilteredProducts/>  */}
      <ListProducts navigation={navigation} />
    </View>
  )
}