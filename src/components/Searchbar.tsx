import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Cordinates,  SuggestionType } from "../utils/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getPlaces } from "../api/helpers";
import useDebounce from "../hooks/useDebounce";

type SearchBarProps = {
  setLocation: React.Dispatch<React.SetStateAction<Cordinates>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  isSearching: boolean;
};

const SearchBar = ({
  setLocation,
  setIsSearching,
  isSearching,
}: SearchBarProps) => {
  const [searchString, setSearchString] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);
  const debouncedText = useDebounce(searchString, 500);

  const handleTextChange = (inputText) => {
    setSearchString(inputText);
    if (inputText === "") {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (!isSearching) {
      setSearchString("");
      setSuggestions([]);
    }
    if (debouncedText && isSearching) {
      fetchPlaceCordinates();
    }
  }, [debouncedText, isSearching]);

  const fetchPlaceCordinates = async () => {
    const places = await getPlaces({
      searchString: debouncedText,
      limit: 10,
    });
    setSuggestions(places);
  };

  const toggleInput = () => {
    setShowInput((prev) => !prev);
  };
  const handleSelectPlace = (city: SuggestionType) => {
    setLocation({
      latitude: city.lat,
      longitude: city.lon,
    });
    setSuggestions([]);
    setSearchString("");
    setIsSearching(false);
  };

  return (
    <View style={styles.inputContainer(showInput)}>
      {showInput && (
        <TextInput
          style={styles.inputText}
          placeholder="Search City"
          value={searchString}
          onChangeText={(text) => {
            handleTextChange(text);
            setIsSearching(text !== "");
          }}
          placeholderTextColor="white"
        />
      )}
      <TouchableOpacity onPress={toggleInput} style={styles.toggleButton}>
        <AntDesign name="search1" size={20} color="white" />
      </TouchableOpacity>
      {suggestions.length ? (
        <View
          style={styles.suggestionContainer(showInput)}
        >
          {suggestions.map((suggestion, index) => {
            return (
              <TouchableOpacity
                key={index.toString()}
                style={styles.suggestionRow}
                onPress={() => handleSelectPlace(suggestion)}
              >
                <Text style={[ styles.suggestionText, {marginLeft: 4} ]}>
                  {suggestion.name},{" "}
                </Text>
                <Text style={styles.suggestionText}>{suggestion.state}, </Text>
                <Text style={styles.suggestionText}>{suggestion.country}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
  inputContainer: (showInput) => ({
    flex: 1,
    height: 50,
    marginTop: 8,
    marginHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "100%",
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    borderWidth: 1,
    borderColor: showInput ? "gray" : "transparent",
    zIndex: 99,
  }),
  inputText: {
    paddingLeft: 10,
    height: "70%",
    color: "white",
    fontSize: 16,
    flex: 1,
  },
  toggleButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    height: "100%",
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    padding: 8,
  },
  suggestionContainer:(showInput)=>(
    {
      display: showInput ? "flex" : "none",
      position: "absolute",
      width: "100%",
      top: 50,
      opacity: 1,
    }
  ),
  suggestionText: { color: "white", fontSize: 14, fontWeight: "600" },
  suggestionRow:{
    borderRadius: 99,
    margin: 4,
    padding: 8,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    flexDirection: "row",
    alignItems: "center",
  },
});
