import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { WeatherType } from "../utils/types";

const Weather = ({
  weather,
  isCelsius,
}: {
  weather: WeatherType;
  isCelsius: boolean;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.digitContainer}>
        <Text style={styles.location}>{weather.name}</Text>
        <View style={{flexDirection:"row", alignItems:"flex-start",}}>
          <Text style={styles.temp}>{Math.round(weather.main.temp)}</Text>
          <Text style={styles.degText}>{isCelsius ? "°C" : "°F"}</Text>
        </View>
        <Text style={styles.location}>{weather.weather[0].main}</Text>
        <View style={styles.tempContainer}>
          <View style={{ flexDirection: "row", }}>
            <AntDesign name="arrowup" size={18} color="white" />
            <Text style={styles.minMaxTemp}>{weather.main.temp_max}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <AntDesign name="arrowdown" size={18} color="white" />
            <Text style={styles.minMaxTemp}>{weather.main.temp_min}</Text>
          </View>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Feather name="wind" size={18} color="white" />
          <Text style={styles.infoText}>
            {(weather.wind.speed * (3600 / 1000)).toFixed(3)}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialCommunityIcons
            name="human-handsdown"
            size={18}
            color="white"
          />
          <Text style={styles.infoText}>
            {weather.main.feels_like}
            {isCelsius ? "°C" : "°F"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  location: {
    fontSize: 30,
    color: "white",
    fontWeight: "500",
  },
  temp: {
    fontSize: 85,
    color: "#FEFEFE",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginLeft: 20,
    height: 400,
  },
  digitContainer: { flex: 1, position: "relative", paddingLeft: 10 },
  degText: {
    fontSize: 40,
    color: "white",
    marginTop:10,
    marginLeft:10
  },
  tempContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    paddingTop: 4,
  },
  minMaxTemp: { fontSize: 18, color: "white", marginLeft: 6 },
  infoContainer: {
    flex: 1,
    height: 70,
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 30,
  },
  infoRow: {
    flexDirection: "row",
    paddingHorizontal: 6,
    backgroundColor: 'rgba(55, 55, 55, 0.4)',
    width: 90,
    height: 30,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 100,
  },
  infoText: { color: "white", fontSize: 14, fontWeight: "600" },
});
