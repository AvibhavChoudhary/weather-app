import { View, Text, StyleSheet, Image } from "react-native";
import dayjs from "dayjs";
import { BlurView } from "expo-blur";
import { ForecastType } from "../utils/types";

type ForecastProps = {
  forecast: ForecastType;
  isCelsius: boolean;
};

const ForecastItem = ({ forecast, isCelsius }: ForecastProps) => {
  return (
    <BlurView intensity={30} style={styles.container}>
      <Text style={{ color: "white" }}>
        {dayjs(forecast.dt * 1000).format("ddd ha")}
      </Text>
      <Text style={{ color: "white", padding: 4 }}>
        {dayjs(forecast.dt * 1000).format("MMM D")}
      </Text>
      <Image
        style={styles.imageStyle}
        source={
          forecast.sys.pod === "n"
            ? require("../assets/Moon.png")
            : require("../assets/Sunny.png")
        }
      />
      <Text style={styles.temp}>
        {Math.round(forecast.main.temp)} {isCelsius ? "°C" : "°F"}
      </Text>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    aspectRatio: 3 / 4,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderColor: "gainsboro",
    borderWidth: StyleSheet.hairlineWidth,
    height: 150,
  },
  temp: {
    fontSize: 20,
    color: "white",
  },
  date: {
    color: "ghostwhite",
    fontSize: 16,
  },
  imageStyle: {
    height: 40,
    width: 40,
    marginVertical: 4,
  },
});

export default ForecastItem;
