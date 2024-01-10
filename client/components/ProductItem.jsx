import { View, Image, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { loadProduct } from '../store/slices/productSlice';

import ModalAddToCart from "./ModalAddToCart";
import ListProductInfo from "./ListProductInfo";

function ProductItem (props) {
    const dispatch = useDispatch()    
    const {width, height} = Dimensions.get('window')
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        dispatch(loadProduct(props.productId)) 
    }, [])
    
    const product = useSelector((store) => store.productReducer.product) 

    const emailUser = 'test@gmail.com'  

    //const isAuth = false // Окошко для запрашивания почты и отправка указанной почты
    //const isAuth = true   // Отправляется запрос с почтой - emailUser

    const buy = () => {
        const randomOrderNum = Math.floor(Math.random() * 1000) + 1000;

        const address = 'https://api.telegram.org';
        const tokenBot = '6933693870:AAH0wYqM7MqTvjFjhUTnuyREliflYtYCAbY';
        const method = 'sendMessage';
        const client = 695269926;
        // я не могу использовать `` ????????????????????
        const text = '*Новый заказ:*_'+randomOrderNum+'_\n*Email:* `email@gmail\\.com`\n*Товар:* '+product.name; 
        const encodedText = encodeURIComponent(text);

        fetch(`${address}/bot${tokenBot}/${method}?chat_id=${client}&parse_mode=MarkdownV2&text=${encodedText}`)
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(error => console.error('Ошибка:', error));
    }

    const getStyles = () => {
        const styles = {
            productInfo: {
                justifyContent: 'space-between',
                paddingHorizontal: 10
            },
            img: {
                width: 150,
                height: 250
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
            },
            productNameTxt: {
                width: '90%',
                fontSize: 27,
                fontWeight: 'bold'
            }
        }

        return StyleSheet.create(styles)
    }
    const styles = getStyles()

    if (Object.keys(product).length != 0) {
        return (
            <Pressable onPress={() => setShowModal(false) }>
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <Image source={{uri: `http://192.168.8.158:5000/${product.img}`}} style={styles.img} />  
                        </View>
                        <View style={styles.productInfo}>
                            <Text style={styles.productNameTxt}>{product.name}</Text>
                            {
                                product.info ?
                                    <ListProductInfo info={product.info} />
                                :
                                    <Text> </Text>
                            }
                            <Text style={{ fontSize: 20, fontWeight: 600 }}>{product.price} zl</Text>
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
            </Pressable>
        );
    } else {return ''}
}

export default ProductItem;





