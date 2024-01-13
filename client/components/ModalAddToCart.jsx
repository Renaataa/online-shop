import { View, StyleSheet, Image, Text, Pressable, Modal } from "react-native";

const ModalAddToCart = ({active, product, changeShowModal}) => {

    if (active) {
        return (
            <Modal
                transparent={true}
                visible={true}
            >
                <View style={styles.modalBackground}>
                    <Pressable onPress={(e)=>e.stopPropagation()}>
                        <View style={styles.modalWindow}>
                            <Text style={{ fontSize: 30, fontWeight: "bold" }}>You have added a product to your cart</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <Image style={styles.img} source={{ uri: `http://192.168.8.158:5000/${product.img}` }} />
                                <View style={{ marginTop: 25 }}>
                                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{product.name}</Text>
                                    <Text style={{ fontSize: 15, fontWeight: "600" }}>{product.price} zl</Text>
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
                </View>
            </Modal>
        );
    } else {return ''}
    
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
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    modalWindow: {
        width: '95%',
        height: '400',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    btnTxt: {
        fontWeight: "600",
        textAlign: 'center',
    }
})

export default ModalAddToCart;