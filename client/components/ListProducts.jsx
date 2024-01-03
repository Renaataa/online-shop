import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'; 
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../store/slices/productsSlice';
import { loadBrand } from '../store/slices/brandSlice';
import { loadType } from '../store/slices/typeSlice';
import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';
import {StateCode} from 'C:/Users/renat/Desktop/Prog/Lessons/online-shop/client/enums/EnumState.ts';

const ListProducts = (props) => {
    const dispatch = useDispatch()

    const [requestSettings, setRequestSettings] = useState({
        page: 1,
        limit: 4,
        typeId: '',
        brandId: ''
    })

    useEffect(() => {
        dispatch(loadBrand()) 
        dispatch(loadType()) 
    },[])

    useEffect(() => {
        dispatch(loadProducts(requestSettings))
    }, [requestSettings])
    
    let listProducts = useSelector((store) => store.productsReducer.products) 
    let listBrands = useSelector((store) => store.brandReducer.brands)
    let listTypes = useSelector((store) => store.typeReducer.types) 

    //tmp test
    // let listProducts = []
    // listProducts.push(
    //     {
    //         "id": 1,
    //         "name": "Smart Band 7",
    //         "price": 250,
    //         "rating": 0,
    //         "img": "e17a2f3b-207d-4b73-aafd-15f0a186ddf1.jpg",
    //         "createdAt": "2023-12-21T10:07:24.000Z",
    //         "updatedAt": "2023-12-21T10:07:24.000Z",
    //         "typeId": 1,
    //         "brandId": 1
    //     },
    //     {
    //         "id": 2,
    //         "name": "Galaxy 5",
    //         "price": 2500,
    //         "rating": 0,
    //         "img": "8ee09c0e-1e2a-4ef2-a452-7527199b2a5d.jpg",
    //         "createdAt": "2023-12-21T10:08:08.000Z",
    //         "updatedAt": "2023-12-21T10:08:08.000Z",
    //         "typeId": 2,
    //         "brandId": 3
    //     },
    //     {
    //         "id": 3,
    //         "name": "Galaxy S5",
    //         "price": 3000,
    //         "rating": 0,
    //         "img": "952516ce-fed5-4f06-abef-2a6ecbadff31.jpg",
    //         "createdAt": "2023-12-21T10:08:19.000Z",
    //         "updatedAt": "2023-12-21T10:08:19.000Z",
    //         "typeId": 2,
    //         "brandId": 3
    //     },
    //     {
    //         "id": 4,
    //         "name": "Apple A5",
    //         "price": 4000,
    //         "rating": 0,
    //         "img": "3143671b-47b3-4cc2-8973-a890bef1d011.jpg",
    //         "createdAt": "2023-12-21T10:08:58.000Z",
    //         "updatedAt": "2023-12-21T10:08:58.000Z",
    //         "typeId": 2,
    //         "brandId": 2
    //     }
    // )
    

    async function update() {
        console.log('here') // ??????????????????????????????????
        dispatch(loadProducts(requestSettings))
        console.log(store.productsReducer.products.stateProducts)
    }

    return (
        <View style={styles.container}>
            <Filter
                listAllDetails={listBrands}
                filterName={'Brands'}
                filter={(listBrandsId) => {
                    const strBrandsId = listBrandsId.reduce((accumulator, id) => accumulator + `brandId=${id}&`, '&')
                    setRequestSettings({ ...requestSettings, brandId: strBrandsId })
                }}
            />
            <Filter
                listAllDetails={listTypes}
                filterName={'Types'}
                filter={(listTypesId) => {
                    const strTypesId = listTypesId.reduce((accumulator, id) => accumulator + `typeId=${id}&`, '&')
                    setRequestSettings({ ...requestSettings, typeId: strTypesId })
                }}
            />
            <GestureHandlerRootView>
                <Swipeable
                    onSwipeableWillClose={(value) => {
                        switch (value) {
                            case 'left':
                                requestSettings.page > 1 ?
                                    setRequestSettings({ ...requestSettings, page: requestSettings.page - 1 })
                                :
                                    ''
                                break
                            case 'right':
                                listProducts.length < requestSettings.limit ?
                                    ''
                                :
                                    setRequestSettings({ ...requestSettings, page: requestSettings.page + 1 })
                                break
                        }
                    }}
                >
                    {/* {console.log(listProducts)} */}
                    <FlatList 
                        style={styles.listProducts} // name of style 'listProducts' ?????????????
                        refreshControl={
                            <RefreshControl
                                refreshing={useSelector((store) => store.productsReducer.stateProducts.state != StateCode[102])}
                                onRefresh={update}
                            />
                        }
                        data={listProducts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            // console.log('listProducts'+listProducts)
                            return <ProductCard key={item.id} product={item} navigation={props.navigation} />
                        }}
                    />
                    <Text style={styles.pagination}>⸺⸺ {requestSettings.page} ⸺⸺</Text>
                </Swipeable>
            </GestureHandlerRootView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        margin: 20
    },
    pagination: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '500'
    },
    listProducts: {
        borderWidth: 1,
    }
})

export default ListProducts;