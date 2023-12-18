import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { useDispatch, useSelector } from 'react-redux';
import { loadBrand } from '../store/slices/brandSlice';
import { loadType } from '../store/slices/typeSlice';
import ListProducts from '../components/ListProducts';

export default function ListProductsScreen({ navigation }) {    

  const dispatch = useDispatch()

  const [selected, setSelected] = useState([]);
  const [brandNames, setBrandNames] = useState([]);
  const [typeNames, setTypeNames] = useState([]);

  useEffect(() => {
    dispatch(loadBrand()) 
    dispatch(loadType()) 
  }, [])

  // ??????????????????????????????????????????????????????????????????
  // useEffect(() => {
  //    setTimeout(() => {
  //     setBrandNames(
  //       listBrands.map((brand) => brand.name)
  //     )
  //     setTypeNames(
  //       listTypes.map((type) => type.name)
  //     )
  //   }, "99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");

  //   console.log(listBrands, listTypes)
  // }, [])

  // ??????????????????????????????????????????????????????????????????
  // useEffect(() => {
  //     setBrandNames(
  //       listBrands.map((brand) => brand.name)
  //     )
  //     setTypeNames(
  //       listTypes.map((type) => type.name)
  //     )
  // }, [listBrands, listTypes])
    
  let listBrands = useSelector((store) => store.brandReducer.brands)
  let listTypes = useSelector((store) => store.typeReducer.types)     
  
  // ????????????????????????????????????????????????????????????????????
  // let intervalId = setInterval(() => {
  //   typeNames.length != 0 && brandNames.length != 0 ? clearInterval(intervalId) : ''
  //   setBrandNames(
  //     listBrands.map((brand) => brand.name)
  //   )
  //   setTypeNames(
  //     listTypes.map((type) => type.name)
  //   )
  //   console.log(typeNames.length, brandNames.length)
    
  //   console.log(typeNames, brandNames)
  // }, 10000);
  
  //console.log(typeNames, brandNames)

  const Test = () => {
    console.log(listBrands, listTypes)

    const a = listBrands.map((brand) => brand.name)
    const b = listTypes.map((type) => type.name)

    console.log(a, b)

    setBrandNames([...a])
    setTypeNames([...b])

    console.log(typeNames, brandNames)

    return <Text></Text>
  }

  return (
    <View>
      {
        listBrands.length != 0 && listTypes.length != 0 && typeNames.length == 0 && brandNames.length == 0 ?
          <Test />
        :
          ''
      }
      <MultipleSelectList 
        setSelected={(brandName) => setSelected(brandName)} 
        data={brandNames} 
        save="brand"
        onSelect={() => alert(selected)} 
        label="Brands"
      />
      <ListProducts navigation={navigation} />
    </View>
  )
}