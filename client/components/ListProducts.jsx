import { View, Text, StyleSheet, Dimensions, FlatList, RefreshControl } from 'react-native'; 
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../store/slices/productsSlice';
import ProductCard from '../components/ProductCard';
import {StateCode} from '../enums/EnumState';

const ListProducts = ({ navigation, requestSettings, changePage, setLimit }) => {
    const dispatch = useDispatch()
    const { width, height } = Dimensions.get('window')
    
    useEffect(() => {
        dispatch(loadProducts(requestSettings))
    }, [requestSettings])
    
    // v1
    let countProducts = useSelector((store) => store.productsReducer.countProducts)
    let listProducts = useSelector((store) => store.productsReducer.products)
    // v2 - выдает ошибку внутри предупреждения в браузере и не работает на моб емуляторе
    //let [countProducts, listProducts] = useSelector((store) => [store.productsReducer.countProducts, store.productsReducer.products])
    
    async function update() {
        dispatch(loadProducts(requestSettings))
    }
    
    const getStyles = () => {
        const styles = {
            container: {
                flex: 1,
                justifyContent: 'flex-start',
                margin: 20
            },
            pagination: {
                textAlign: 'center',
                fontSize: 17,
                fontWeight: '500'
            },
            listProducts: {
                flex: 1,
                borderWidth: 1
            }
        }
        
        if (width >= 900) styles.pagination.fontSize = 26
        else if (width >= 700) styles.pagination.fontSize = 22
        else if (width >= 500) styles.pagination.fontSize = 18
        
        return StyleSheet.create(styles)
    }
    const styles = getStyles() 

    console.log(listProducts)

    return (
        <View style={styles.container}>
            <GestureHandlerRootView>
                <Swipeable
                    onSwipeableWillClose={(value) => {
                        switch (value) {
                            case 'left':
                                if (requestSettings.page > 1) 
                                    changePage(requestSettings.page - 1)
                                break
                            case 'right':
                                if (requestSettings.page < countProducts / requestSettings.limit) 
                                    changePage(requestSettings.page + 1)
                                break
                        }
                    }}
                >
                    <FlatList 
                        contentContainerStyle={styles.listProducts} 
                        refreshControl={
                            <RefreshControl
                                refreshing={useSelector((store) => store.productsReducer.stateProducts.state == StateCode.Processing)}
                                onRefresh={update}
                            />
                        }
                        data={listProducts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return <ProductCard key={item.id} product={item} navigation={navigation} setLimit={setLimit} />
                        }}
                    />
                    <Text style={styles.pagination}>⸺⸺ {requestSettings.page} ⸺⸺</Text>
                </Swipeable>
            </GestureHandlerRootView>
        </View>
    );
}

export default ListProducts;