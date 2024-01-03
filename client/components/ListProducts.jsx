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

const ListProducts = (props) => {
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true)
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

    async function update() {
        //console.log("here") // ??????????????????????????
        //setIsLoading(true)
        dispatch(loadProducts(requestSettings))
        //setIsLoading(false)
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
                        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={update} />}
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
    }
})

export default ListProducts;