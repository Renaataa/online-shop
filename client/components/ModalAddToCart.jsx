import { View, StyleSheet, Image, Text, Pressable, Modal } from "react-native";

const ModalAddToCart = ({active, product, changeShowModal}) => {

    if (active) {
        return (
            <Modal transparent={true} visible={true}>
                <Pressable
                    style={styles.modalBackground}
                    onPress={() => changeShowModal(false)}
                >
                    <View style={styles.modalWindow}>
                        <Text style={styles.txtHead}>You have added a product to your cart</Text>
                        <View style={styles.productContainer}>
                            <Image
                                style={styles.img}
                                source={{ uri: `http://192.168.8.158:5000/${product.img}` }}
                            />

                            <View style={styles.productInfoContainer}>
                                <Text style={styles.txtProductName}>{product.name}</Text>
                                <Text style={styles.txtProductPrice}>{product.price} zl</Text>
                            </View>
                        </View>
                        
                        <View style={styles.btnModalBox}>
                            <Pressable
                                style={{ ...styles.btnModal, backgroundColor: "#F7E18A" }}
                                onPress={() => changeShowModal(false)}
                            >
                                <Text style={styles.btnTxt}>Keep shopping</Text>
                            </Pressable>
                            <Pressable
                                style={styles.btnModal}
                                onPress={() => changeShowModal(false)}
                            >
                                <Text style={styles.btnTxt}>Go to cart</Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        );
    } else {return ''}
    
}

const styles = StyleSheet.create({
    modalBackground: {
        flexGrow: 1, 
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    modalWindow: {
        width: '90%',
        justifyContent: 'space-between',
        alignSelf: 'center',
        padding: 15,
        aspectRatio: 1,
        backgroundColor: 'white',
        borderRadius: 20
    },
    txtHead: {
        fontSize: 21,
        fontWeight: "bold"
    },
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    productInfoContainer: {
        width: '60%',
        marginTop: 25,
        marginLeft: 15
    },
    img: {
        width: "35%",
        height: 250
    },
    txtProductName: {
        fontSize: 19,
        fontWeight: "bold"
    },
    txtProductPrice: {
        fontSize: 15,
        fontWeight: "600"
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
    btnTxt: {
        fontWeight: "600",
        fontSize: 15,
        textAlign: "center",
        paddingBottom: 4,
    },
})

export default ModalAddToCart;