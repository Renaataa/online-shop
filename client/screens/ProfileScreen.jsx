import { View, Text, Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetState } from "../store/slices/userSlice";
import { useEffect, useCallback } from "react";
import { Fontisto } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.userReducer);

	useEffect(() => {
		dispatch(resetState());
	}, []);

	const getStyles = useCallback(() => {
		const styles = {
			conteiner: {
				height: "100%",
				width: "100%",
				justifyContent: "center",
				backgroundColor: "white",
			},
			emailLogoutContainer: {
				flexDirection: "row",
				height: "90%",
				justifyContent: "space-around",
			},
			emailContainer: {
				flexDirection: "row",
				height: "7%",
				justifyContent: "space-between",
				alignItems: "center",
			},
			btn: {
				width: "60%",
				height: 40,
				justifyContent: "center",
				alignItems: "center",
				alignSelf: "center",
				margin: 10,
				paddingVertical: 4,
				backgroundColor: "#F99A6B",
				borderRadius: 20,
			},
			btnTxt: {
				fontWeight: "bold",
				textAlign: "center",
				fontSize: 14,
			},
			fontisto: {
				alignSelf: "center",
				marginBottom: 2,
			},
		};

		return StyleSheet.create(styles);
	}, []);

	const styles = getStyles();

	return (
		<View style={styles.conteiner}>
			{user.auth ? (
				<View style={styles.emailLogoutContainer}>
					<View style={styles.emailContainer}>
						<Fontisto
							style={styles.fontisto}
							name="email"
							size={24}
							color="black"
						/>
						<Text
							style={{
								...styles.btnTxt,
								marginLeft: 10,
							}}
						>
							{user.email}
						</Text>
					</View>
					<Pressable
						style={{
							...styles.btn,
							alignSelf: "",
							height: "4%",
							width: "30%",
						}}
						onPress={() => dispatch(logout())}
					>
						<Text style={styles.btnTxt}>Exit</Text>
					</Pressable>
				</View>
			) : (
				<View>
					<Pressable
						style={{ ...styles.btn, backgroundColor: "#F7E18A" }}
						onPress={() =>
							navigation.navigate("Login", {
								action: "login",
								check: true,
							})
						}
					>
						<Text style={styles.btnTxt}>Login</Text>
					</Pressable>
					<Pressable
						style={styles.btn}
						onPress={() =>
							navigation.navigate("Login", {
								action: "registrate",
								check: true,
							})
						}
					>
						<Text style={styles.btnTxt}>Registrate</Text>
					</Pressable>
				</View>
			)}
		</View>
	);
}
