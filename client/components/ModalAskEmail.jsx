import {
	View,
	StyleSheet,
	Text,
	Pressable,
	Modal,
	TextInput,
} from "react-native";
import { useState, useCallback } from "react";

const ModalAskEmail = ({ active, changeShowModal, buy }) => {
	const [email, setEmail] = useState("");
	const [correctEmail, setCorrectEmail] = useState(true);

	const verifyEmailAndBuy = useCallback((email) => {
		const reg =
			/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

		if (reg.test(email) === false) {
			setCorrectEmail(false);
			return;
		} else {
			buy(email);
			changeShowModal(false);
		}
	}, []);

	if (active) {
		return (
			<Modal transparent={true} visible={true}>
				<Pressable
					style={styles.modalBackground}
					onPress={() => changeShowModal(false)}
				>
					<Pressable
						style={styles.modalWindow}
						onPress={(e) => e.stopPropagation()}
					>
						<View>
							<Text style={styles.txtHead}>
								Please give us your email:
							</Text>
							<TextInput
								style={styles.txtInput}
								placeholder="email"
								placeholderTextColor="silver"
								onChangeText={setEmail}
								value={email}
							/>
							{correctEmail ? (
								<Text></Text>
							) : (
								<Text style={styles.txtWarning}>
									Please put correct email address
								</Text>
							)}
						</View>
						<Pressable
							style={styles.btn}
							onPress={() => verifyEmailAndBuy(email)}
						>
							<Text style={styles.txtConfirm}>Confirm order</Text>
						</Pressable>
					</Pressable>
				</Pressable>
			</Modal>
		);
	} else {
		return null;
	}
};

const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "rgba(52, 52, 52, 0.8)",
	},
	modalWindow: {
		width: "90%",
		alignSelf: "center",
		justifyContent: "space-between",
		padding: 15,
		aspectRatio: 1,
		backgroundColor: "white",
		borderRadius: 20,
	},
	txtHead: {
		fontSize: 25,
		fontWeight: "bold",
		paddingBottom: 10,
	},
	txtConfirm: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		paddingBottom: 4,
	},
	txtInput: {
		width: "95%",
		fontSize: 20,
		borderBottomColor: "black",
		borderBottomWidth: 1,
	},
	txtWarning: {
		color: "red",
	},
	btn: {
		width: "95%",
		height: 40,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#F7E18A",
		borderRadius: 20,
	},
});

export default ModalAskEmail;
