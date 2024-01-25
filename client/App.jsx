import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./store";
import { authUser, resetState } from "./store/slices/userSlice";
import { StateCode } from "./enums/EnumState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ListProductsScreen from "./screens/ListProductsScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const retrieveData = async () => {
	try {
		const value = await AsyncStorage.getItem("token");
		if (value !== null) {
			console.log(value);
			return value;
		}
	} catch (error) {
		console.log(error, "do not recieve data from AsyncStorage");
		return null;
	}
};

const ScreensProducts = ({ navigation }) => {
	useEffect(() => {
		if (navigation) {
			navigation.setOptions({
				headerTitle: "Products",
				headerRight: () => (
					<Pressable
						style={styles.shopCart}
						onPress={() => navigation.navigate("Cart")}
					>
						<Feather name="shopping-bag" size={24} color="black" />
					</Pressable>
				),
			});
		}
	}, [navigation]);

	return (
		<Stack.Navigator>
			<Stack.Screen
				name="ListProducts"
				component={ListProductsScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="Product" component={ProductScreen} />
			<Stack.Screen name="Cart" component={CartScreen} />
		</Stack.Navigator>
	);
};

const ScreensProfile = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Profile"
				component={ProfileScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="Login" component={LoginScreen} />
		</Stack.Navigator>
	);
};

const Authorization = (props) => {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.userReducer);
	const [checkAuth, setCheckAuth] = useState(false);

	const authorization = async () => {
		const tokenExist = await retrieveData();
		if (tokenExist) {
			dispatch(authUser(tokenExist));
		} else {
			setCheckAuth(true);
		}
	};

	useEffect(() => {
		authorization();
	}, []);

	useEffect(() => {
		if (
			user.stateUser.state == StateCode.OK ||
			user.stateUser.state == StateCode.Error
		) {
			setCheckAuth(true);
		}
	}, [user]);

	if (checkAuth) {
		return props.children;
	} else {
		return <></>;
	}
};

const TabNavigator = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="ScreensProducts"
				component={ScreensProducts}
				options={{ title: "Products" }}
			/>
			<Tab.Screen
				name="ScreensProfile"
				component={ScreensProfile}
				options={{ title: "Profile" }}
			/>
			<Tab.Screen name="Home" component={HomeScreen} />
		</Tab.Navigator>
	);
};

function App() {
	// Создаем состояние auth - true/false
	// Проверять если ли токен у нас в хранилище - если токена нет - ставим auth false
	// Если токен есть - отправляем запрос на его перевыпуск и сохраняем с хранилище новый токен если пришел и авторизовуешь auth true
	// если пришла ошибка - удаляем токен и ставим аuth - false

	return (
		<Provider store={store}>
			<Authorization>
				<NavigationContainer>
					<TabNavigator />
				</NavigationContainer>
			</Authorization>
		</Provider>
	);
}

const styles = StyleSheet.create({
	shopCart: {
		marginRight: 14,
	},
});

export default App;
