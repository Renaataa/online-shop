import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'; 
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../store/slices/productsSlice';
import ProductCard from '../components/ProductCard';

const ListProducts = (props) => {
    const dispatch = useDispatch()
    
    const [isLoading, setIsLoading] = useState(true)
    const [requestSettings, setrequestSettings] = useState({
        page: 1,
        limit: 4
    })

    useEffect(() => {
        dispatch(loadProducts(requestSettings)) 
    }, [requestSettings])
    
    let listProducts = useSelector((store) => store.productsReducer.products) 
        
    async function update() {
        console.log("here") // ??????????????????????????
        setIsLoading(true)
        listProducts = await useSelector((store) => store.productsReducer.products)
        setIsLoading(false)
    }

    return (
        <View style={styles.container}>
            <GestureHandlerRootView>
                <Swipeable
                    onSwipeableWillClose={(value) => {
                        switch (value) {
                            case 'left':
                                requestSettings.page > 1 ?
                                    setrequestSettings({ ...requestSettings, page: requestSettings.page - 1 })
                                :
                                    ''
                                break
                            case 'right':
                                listProducts.length < requestSettings.limit ?
                                    ''
                                :
                                    setrequestSettings({ ...requestSettings, page: requestSettings.page + 1 })
                                break
                        }
                    }}
                >
                    <FlatList 
                        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={update}/>}
                        data={listProducts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <ProductCard key={item.id} product={item} navigation={props.navigation} />}
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