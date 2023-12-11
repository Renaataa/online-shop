import { View, StyleSheet, Image, Text, Pressable, Modal } from "react-native";

const ModalAddToCart = (props) => {
    const imgPath = 'http://127.0.0.1:5000/' + props.product.img //????????????
    
    return (
        <Modal
            transparent={true}
            visible={true}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalWindow}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>You have added a product to your cart</Text>

                    <View style={{flexDirection: 'row'}}>
                        <Image style={styles.img} source={{uri: imgPath}} />
                        <View style={{marginTop: 25}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{props.product.name}</Text>
                            <Text style={{fontSize: 15, fontWeight: 649}}>{props.product.price} zl</Text>
                        </View>
                    </View>
                    
                    <View style={styles.btnModalBox}>
                        <Pressable
                            style={{ ...styles.btnModal, backgroundColor: "#F7E18A" }}//???????????
                            onPress={() => props.changeShowModal(false)}
                        >
                            <Text style={styles.btnTxt}>Keep shopping</Text>
                        </Pressable>
                        <Pressable
                            style={styles.btnModal}
                            onPress={() => props.changeShowModal(false)}
                        >
                            <Text style={styles.btnTxt}>Go to cart</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    img: {
        width: 250,
        height: 350
    },
    btnModalBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnModal: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '49%',
        height: 40,
        backgroundColor: '#F99A6B',
        borderRadius: 20
    },
    modalBackground: {
        flex: 1, 
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    modalWindow: {
        width: '95%',
        marginTop: '80%',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    btnTxt: {
        fontWeight: 600,
        textAlign: 'center',
    }
})

export default ModalAddToCart;