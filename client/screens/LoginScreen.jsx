import { Pressable, TextInput, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setError } from "../store/slices/userSlice";
import { registrateUser } from "../store/slices/userSlice";
import { StateCode } from "../enums/EnumState";

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const user = useSelector((store) => store.userReducer);

	useEffect(() => {
		if (user.stateUser.state == StateCode.OK) {
			navigation.navigate("Profile");
		}
	}, [user.stateUser.state]);

	return (
		<View>
			<TextInput
				placeholder="email"
				onChangeText={setEmail}
				value={email}
			/>
			<TextInput
				placeholder="password"
				onChangeText={setPassword}
				value={password}
			/>
			<Pressable
				onPress={() => {
					if (email != "" && password != "") {
						dispatch(
							loginUser({ email: email, password: password })
						);
					} else {
						dispatch(setError());
					}
				}}
			>
				{user.stateUser.state != StateCode.Error ? (
					<Text></Text>
				) : (
					<Text>Email or password is wrong</Text>
				)}
				<Text>Login</Text>
			</Pressable>

			<Pressable
				onPress={() => {
					if (email != "" && password != "") {
						dispatch(
							registrateUser({ email: email, password: password })
						);
					} else {
						dispatch(setError());
					}
				}}
			>
				<Text>Registrate</Text>
			</Pressable>
		</View>
	);
};

export default LoginScreen;
