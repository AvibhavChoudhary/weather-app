import { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { Cordinates, ForecastType, WeatherType } from "../utils/types";
import { getCurrentWeather, getDailyForecast } from "../api/helpers";
import SearchBar from "../components/Searchbar";
import DailyForecastCard from "../components/DailyForecastCard";
import Weather from "../components/Weather";
import SunriseSunsetWidget from "../components/Suntime";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { BlurView } from "expo-blur";
import { showAlert } from "../utils/helpers";

const Home = () => {
  const [location, setLocation] = useState<Cordinates>({
    latitude: 28.4950469,
    longitude: 77.0865145 ,
  });
  const [weather, setWeather] = useState<WeatherType>();
  const [forecast, setForecast] = useState<ForecastType[]>();
  const [isCelsius, setIsCelsius] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (location) {
      fetchWeather();
      fetchForecast();
    }
  }, [location.latitude, location.longitude, isCelsius]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        showAlert({
          title: "Attention!",
          message:
            "Please grant permission to access location for better experience",
          onConfirm: () => {},
          confirmButtonText: "Ok",
        });
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const fetchWeather = async () => {
    if (!location) {
      return;
    }
    const results = await getCurrentWeather({
      lat: location.latitude,
      long: location.longitude,
      metric: isCelsius ? "metric" : "imperial",
    });
    setWeather(results);
  };

  const fetchForecast = async () => {
    const resData = await getDailyForecast({
      lat: location.latitude,
      long: location.longitude,
      metric: isCelsius ? "metric" : "imperial",
    });
    setForecast(resData);
  };

  const toggleTempDeg = () => {
    setIsCelsius((prev) => !prev);
  };

  if (!weather) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchBar
            setLocation={setLocation}
            setIsSearching={setIsSearching}
            isSearching={isSearching}
          />
        </View>
        
        {isSearching && (
          <BlurView
            intensity={30}
            style={styles.blurContainer}
            onTouchEnd={() => {
              setIsSearching(false);
            }}
          />
        )}
        {!isSearching && (
          <TouchableOpacity
            onPress={toggleTempDeg}
            style={styles.tempDegButton}
          >
            <MaterialCommunityIcons
              name={
                !isCelsius ? "temperature-celsius" : "temperature-fahrenheit"
              }
              size={20}
              color="white"
            />
          </TouchableOpacity>
        )}
        <Weather weather={weather} isCelsius={isCelsius} />
        <DailyForecastCard forecast={forecast} isCelsius={isCelsius} />
        <SunriseSunsetWidget weather={weather} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    paddingBottom: 40,
  },
  tempDegButton: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    right: 8,
    top: 70,
    zIndex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    flex: 1,
    zIndex: 9,
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    zIndex: 1,
  },
});

export default Home;
