import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'; 
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../store/slices/productsSlice';
import ProductCard from '../components/ProductCard';
import {StateCode} from 'C:/Users/renat/Desktop/Prog/Lessons/online-shop/client/enums/EnumState.ts';

const ListProducts = ({navigation, requestSettings, changePage}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadProducts(requestSettings))
    }, [requestSettings])
    
    let listProducts = useSelector((store) => store.productsReducer.products)   

    async function update() {
        dispatch(loadProducts(requestSettings))
    }

    return (
        <View style={styles.container}>
            <GestureHandlerRootView>
                <Swipeable
                    onSwipeableWillClose={(value) => {
                        switch (value) {
                            case 'left':
                                requestSettings.page > 1 ?
                                    changePage(requestSettings.page - 1)
                                :
                                    ''
                                break
                            case 'right':
                                listProducts.length < requestSettings.limit ?
                                    ''
                                :
                                    changePage(requestSettings.page + 1)
                                break
                        }
                    }}
                >
                    <FlatList 
                        style={styles.listProducts} // name of style 'listProducts' ?????????????
                        refreshControl={
                            <RefreshControl
                                refreshing={useSelector((store) => store.productsReducer.stateProducts.state == StateCode.Processing)}
                                onRefresh={update}
                            />
                        }
                        data={listProducts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            // console.log('listProducts'+listProducts)
                            return <ProductCard key={item.id} product={item} navigation={navigation} />
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