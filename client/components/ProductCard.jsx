import { View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';

const ProductCard = (props) => {

    const {width, height} = Dimensions.get('window')
    const imgPath = 'http://192.168.8.158:5000/' + props.product.img
    
    // огромный кусок стилей посреди кода. кажется это не слишком читаемо ?????????
    const getStyles = () => {
        const styles = {
            productBox: {
                flexDirection: 'row',
                borderColor: 'black',
                borderWidth: 1,
                margin: 5,
                padding: 5
            },
            infoBox: {
                justifyContent: 'space-between',
                paddingHorizontal: 10
            },
            img: {
                width: '33%',
                height: '125px'
            },
            textTitle: {
                fontSize: 22,
                fontWeight: 'bold'
            },
            textPrice: {
                fontSize: 20,
                fontWeight: 500
            }
        }

        if (width >= 1000) {
            styles.textTitle = {
                ...styles.textTitle,
                fontSize: 37
            },
            styles.textPrice = {
                fontSize: 30,
                fontWeight: 600
            }
        }
        else if (width >= 700) {
            styles.textTitle = {
                ...styles.textTitle,
                fontSize: 27
            },
            styles.textPrice = {
                fontSize: 22,
                fontWeight: 600
            }
        }
        else if (width >= 500) {
            styles.textTitle = {
                ...styles.textTitle,
                fontSize: 23
            },
            styles.textPrice = {
                fontSize: 22,
                fontWeight: 600
            }
        }
        else styles.textTitle.width = '90%'

        return StyleSheet.create(styles)
    }
    const styles = getStyles()

    return (
        <Pressable
            style={styles.productBox}
            onPress={() => props.navigation.navigate('Product', {
                productId: props.product.id,
                title: props.product.name
            })}
        >
            <Image style={styles.img} source={{ uri: imgPath }} />
            <View style={styles.infoBox}>
                <Text style={styles.textTitle}>{props.product.name}</Text>
                <Text style={styles.textPrice}>{props.product.price} zl</Text>
            </View>
        </Pressable>
    );
}

export default ProductCard;