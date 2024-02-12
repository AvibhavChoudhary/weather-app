import { Alert } from "react-native";

export const showAlert = ({ title, message, onConfirm, confirmButtonText }) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: confirmButtonText,
        onPress: onConfirm,
      },
    ],
    { cancelable: false },
  );
};
