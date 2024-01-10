import { View, Dimensions } from 'react-native';
import { useState } from 'react';
import ListProducts from '../components/ListProducts';
import FilteredProducts from '../components/FilteredProducts';

export default function ListProductsScreen({ navigation }) {   

  const {width, height} = Dimensions.get('window')

  const [requestSettings, setRequestSettings] = useState({
    page: 1,
    limit: Math.floor(height/147-1.6),
    typeId: '',
    brandId: ''
  })
  
  return (
    <View>
      <FilteredProducts
        filterFunc={(listId, property) => {
          const strId = listId.reduce((accumulator, id) => accumulator + `${property}=${id}&`, '&')
          setRequestSettings({ ...requestSettings, page: 1, [property]: strId })
        }}
      /> 
      <ListProducts
        navigation={navigation}
        requestSettings={requestSettings}
        changePage={newPage => setRequestSettings({ ...requestSettings, page: newPage })}
      />
    </View>
  )
}