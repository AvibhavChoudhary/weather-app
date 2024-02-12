import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View,ImageBackground } from "react-native";
import Home from "./screens/Home";
import NetInfo from "@react-native-community/netinfo";
import NoInternetScreen from "./screens/NoInternet";

export default function App() {
  const [isConnected, setIsConnected] = useState(true);
  const onConnected = () => {
    setIsConnected(true);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, [isConnected]);
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ImageBackground
        source={require("./assets/Background.jpeg")}
          style={{
            ...StyleSheet.absoluteFillObject,
            flex: 1,
          }}
        />
      <SafeAreaView style={{ flex: 1 }}>
        {isConnected ? (
          <Home />
        ) : (
          <NoInternetScreen onConnected={onConnected} />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  highlight: { fontWeight: "bold" },
  textContainer: { textAlign: "center", margin: 10 },
});
