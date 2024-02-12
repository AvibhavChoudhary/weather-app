import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const NoInternetScreen = ({ onConnected }) => {
  const handleRetry = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        onConnected();
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/NoInternet.png")}
        style={styles.image}
      />
      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={styles.subtitle}>
        Please check your internet connection and try again.
      </Text>
      <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default NoInternetScreen;
