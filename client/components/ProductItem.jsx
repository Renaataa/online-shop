import { View, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loadProduct } from '../store/slices/productSlice';

const ProductItem = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadProduct(props.productId)) 
    }, [])
    
    const product = useSelector((store)=>store.productReducer.product)
    //console.log(product)
    
    const imgPath = 'http://127.0.0.1:5000/' + product.img

    return (
        <View style={styles.productBox}>
            <View>
                <Image style={styles.imgBox} source={imgPath} />
            </View>
            <View>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    productBox: {
        flexDirection: 'row',
    },
    infoBox: {
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    imgBox: {
        width: '30%',
        height: '100px'
    }
})

export default ProductItem;





