import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type SearchBarProps<T> = {
  data: T[];
  searchKey: keyof T;
  onFiltered: (result: T[]) => void;
  placeholder?: string;
};

function SearchBar<T extends Record<string, any>>({
  data,
  searchKey,
  onFiltered,
  placeholder = "Search",
}: SearchBarProps<T>) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const result = data.filter((item) =>
      String(item[searchKey]).toLowerCase().includes(query.toLowerCase())
    );
    onFiltered(result);
  }, [query, data]);

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#888" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});

export default SearchBar;
