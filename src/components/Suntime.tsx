import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { WeatherType } from "../utils/types";
import dayjs from "dayjs";

const Suntime = ({ weather }: { weather: WeatherType }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../assets/Sunny.png")}
            style={styles.imageStyle}
          />
          <Text style={styles.textStyle}>Sunrise</Text>
        </View>
        <Text style={styles.textStyle}>
          {dayjs(weather.sys.sunrise * 1000).format("h:mm A")}
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../assets/Moon.png")}
            style={styles.imageStyle}
          />
          <Text style={styles.textStyle}>Sunset</Text>
        </View>
        <Text style={styles.textStyle}>
          {dayjs(weather.sys.sunset * 1000).format("h:mm A")}
        </Text>
      </View>
    </View>
  );
};

export default Suntime;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(55, 55, 55, 0.4)',
    width: "95%",
    padding: 20,
    marginHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: 120,
    flex: 1,
    marginBottom: 20,
    borderRadius: 10,
    margin: 10,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    width: 250,
  },
  imageStyle: { height: 25, width: 25 },
  textStyle: { color: "white", fontSize: 16, marginLeft:4 },
});
