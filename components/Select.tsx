import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

interface SelectProps {
  options: string[];
  value: string;
  style?: ViewStyle;
  onChange: (value: string) => void;
}

const Select = ({ options, value, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container]}>
      <Pressable style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text style={styles.selectedText}>{value}</Text>
        <MaterialIcons
          name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="#333"
        />
      </Pressable>

      {/*Options */}
      {isOpen && (
        <View style={styles.dropdown}>
          {options.map((option, index) => (
            <Pressable
              key={index}
              style={[
                styles.dropdownItem,
                hoveredIndex === index && styles.hoveredItem, // Apply hover effect
              ]}
              onPress={() => handleOptionSelect(option)}
              onPressIn={() => setHoveredIndex(index)} // Set hover index
              onPressOut={() => setHoveredIndex(null)} // Reset hover index
            >
              <Text style={styles.dropdownItemText}>{option}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex: 1,
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedText: {
    fontSize: 16,
    color: "#333",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#EDEDED",
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
    backgroundColor: "#EDEDED",
    fontFamily: "Roboto_400Regular",
  },
  hoveredItem: {
    backgroundColor: "rgba(122, 178, 211, 0.7)",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#00000059",
    fontFamily: "Roboto_400Regular",
  },
});

export default Select;
