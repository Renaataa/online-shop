import { View, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetState } from "../store/slices/userSlice";
import { useEffect } from "react";

export default function ProfileScreen({ navigation }) {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.userReducer);

	useEffect(() => {
		dispatch(resetState());
	}, []);

	return (
		<View>
			{user.auth ? (
				<View>
					<Text>{user.email}</Text>
					<Pressable onPress={() => dispatch(logout())}>
						<Text>Exit</Text>
					</Pressable>
				</View>
			) : (
				<Pressable onPress={() => navigation.navigate("Login")}>
					<Text>Login</Text>
				</Pressable>
			)}
		</View>
	);
}
