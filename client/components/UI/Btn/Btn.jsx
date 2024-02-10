import { useEffect, useMemo } from "react";
import { Pressable, text } from "react-native";

const Btn = ({ text, onClick, stylesUpdate }) => {
	//{height:20, background:blue}

	const styles = useMemo(() => {
		let styles = {
			background: "red",
			padding: 10,
			width: 400,
		};

		styles = { ...styles, ...stylesUpdate };
		return StyleSheet.create(styles);
	}, []);

	return (
		<Pressable onPress={onClick} style={styles}>
			<Text>{text}</Text>
		</Pressable>
	);
};

export default Btn;
