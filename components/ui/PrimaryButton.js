import { View, Text, Pressable, StyleSheet } from "react-native";
import Color from "../../constants/Color";

function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonOutContainar}>
      <Pressable
        style={(pressed) =>
          pressed
            ? [styles.buttonInnerContainar, styles.pressed]
            : styles.buttonInnerContainar
        }
        onPress={onPress}
        android_ripple={{ color: Color.primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOutContainar: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainar: {
    backgroundColor: Color.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
