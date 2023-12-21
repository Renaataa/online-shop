import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { loadProduct } from '../store/slices/productSlice';

import ModalAddToCart from "./ModalAddToCart";
import ListProductInfo from "./ListProductInfo";

function ProductItem (props) {
    const dispatch = useDispatch()    
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        dispatch(loadProduct(props.productId)) 
    }, [])
    
    const product = useSelector((store) => store.productReducer.product) 

    const buy = () => console.log(`You ordered ${product.name} for ${product.price} zl`)

    if (Object.keys(product).length != 0) {
        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Image source={{uri: `http://127.0.0.1:5000/${product.img}`}} style={styles.img} />  
                    </View>
                    <View style={styles.productInfo}>
                        <Text style={{ fontSize: 27, fontWeight: 'bold' }}>{product.name}</Text>
                        {
                            product.info ?
                                <ListProductInfo info={product.info} />
                            :
                                <Text> </Text>
                        }
                        <Text style={{ fontSize: 20, fontWeight: 650 }}>{product.price} zl</Text>
                    </View>
                </View>

                <Pressable
                    style={{ ...styles.btn, backgroundColor: "#F7E18A" }}
                    onPress={() => setShowModal(true)}
                >
                    <Text style={styles.btnTxt}>Add to cart</Text>
                </Pressable>
                <Pressable
                    style={styles.btn}
                    onPress={buy}
                >
                    <Text style={styles.btnTxt}>Buy</Text>
                </Pressable>

                <ModalAddToCart
                    product={product}
                    changeShowModal={(value) => setShowModal(value)}
                    active={showModal}
                />
            </View>
        );
    } else {return ''}
}

const styles = StyleSheet.create({
    productInfo: {
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    img: {
        width: 250,
        height: 350
    },
    btn: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        width: '95%',
        height: 40,
        backgroundColor: '#F99A6B',
        borderRadius: 20
    },
    btnTxt: {
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

export default ProductItem;





