import { Pressable, TextInput, View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	loginUser,
	registrateUser,
	setError,
	resetState,
} from "../store/slices/userSlice";
import { StateCode } from "../enums/EnumState";

const LoginScreen = ({ navigation, route }) => {
	const { action } = route.params;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const user = useSelector((store) => store.userReducer);

	useEffect(() => {
		dispatch(resetState());
		navigation.setOptions({
			title:
				action.charAt(0).toUpperCase() + action.substr(1).toLowerCase(),
		});
	}, []);

	useEffect(() => {
		if (user.stateUser.state == StateCode.OK) {
			dispatch(resetState());
			navigation.navigate("Profile");
		}
	}, [user.stateUser.state]);

	const verifyEmailAndEnter = (email) => {
		const reg =
			/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if (reg.test(email) === false) {
			dispatch(setError("Email format is incorrect"));
			return;
		} else {
			if (action == "login") {
				dispatch(
					loginUser({
						email: email,
						password: password,
					})
				);
			} else if (action == "registrate") {
				dispatch(
					registrateUser({
						email: email,
						password: password,
					})
				);
			}
		}
	};

	const getStyles = (action) => {
		const styles = {
			mainConteiner: {
				height: "100%",
				width: "100%",
				justifyContent: "center",
				backgroundColor: "white",
			},
			innerConteiner: {
				height: "22.9%",
			},
			txtInput: {
				width: "60%",
				alignSelf: "center",
				fontSize: 16,
				borderBottomColor: "black",
				borderBottomWidth: 1,
			},
			btn: {
				height: 40,
				width: "60%",
				justifyContent: "center",
				alignItems: "center",
				alignSelf: "center",
				marginTop: 18,
				paddingVertical: 4,
				backgroundColor: action == "login" ? "#F7E18A" : "#F99A6B",
				borderRadius: 20,
			},
			btnTxt: {
				fontWeight: "bold",
				textAlign: "center",
			},
			txtWarning: {
				alignSelf: "center",
				color: "red",
			},
		};
		return StyleSheet.create(styles);
	};
	const styles = getStyles(action);

	return (
		<View style={styles.mainConteiner}>
			<View style={styles.innerConteiner}>
				<TextInput
					style={styles.txtInput}
					placeholder="email"
					placeholderTextColor="#909090"
					onChangeText={setEmail}
					value={email}
				/>
				<TextInput
					style={styles.txtInput}
					placeholder="password"
					placeholderTextColor="#909090"
					onChangeText={setPassword}
					value={password}
				/>

				{user.stateUser.state == StateCode.Error ? (
					<Text style={styles.txtWarning}>
						{user.stateUser.description}
					</Text>
				) : (
					<Text></Text>
				)}

				<Pressable
					style={styles.btn}
					onPress={() => {
						if (email != "" && password != "") {
							verifyEmailAndEnter(email);
						} else {
							dispatch(setError("Please fill in both fields"));
						}
					}}
				>
					<Text style={styles.btnTxt}>
						{action.charAt(0).toUpperCase() +
							action.substr(1).toLowerCase()}
					</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default LoginScreen;
