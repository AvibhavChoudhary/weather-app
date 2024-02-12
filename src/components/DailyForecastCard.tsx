import React from "react";
import { StyleSheet, Text, View, FlatList, Platform } from "react-native";
import ForecastItem from "./Forecast";

const DailyForecastCard = ({ forecast, isCelsius }) => {
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          padding: 8,
        }}
      >
        <Text style={styles.headingText}>5 Day Forecast</Text>
      </View>
      <FlatList
        data={forecast}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          flexGrow: 1,
        }}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <ForecastItem forecast={item} isCelsius={isCelsius} />
        )}
      />
    </View>
  );
};

export default DailyForecastCard;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgba(55, 55, 55, 0.3)',
    marginHorizontal: 10,
    height: 200,
    flex: 1,
    marginBottom: 20,
    borderRadius: 15,
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
  headingText: { color: "white", fontSize: 14, padding: 4, fontWeight: "600" },
  listContainer: {
    gap: 10,
    paddingHorizontal: 10,
    height: 150,
  },
});
