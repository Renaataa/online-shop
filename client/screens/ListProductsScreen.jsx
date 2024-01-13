import { View,Text, Dimensions } from 'react-native';
import { useState } from 'react';
import ListProducts from '../components/ListProducts';
import FilteredProducts from '../components/FilteredProducts';

export default function ListProductsScreen({ navigation }) {   

  const {width, height} = Dimensions.get('window')

  const [requestSettings, setRequestSettings] = useState({
    page: 1,
    limit: 1,
    typeId: '',
    brandId: ''
  })
  
  return (
    <View>
      {/* <Text>123</Text> */}
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
        // ?????????????????????????
        setLimit={newLimit => setRequestSettings({...requestSettings, limit: newLimit})}
      />
    </View>
  )
}