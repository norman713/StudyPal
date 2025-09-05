import { Feather, Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { ReactNode, useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";

interface TextInputProps {
  placeholder: string;
  style?: ViewStyle;
  value?: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  isPassword?: boolean;
  isDate?: boolean;
  rightIcon?: ReactNode;
  initialDate?: string;
  bgColor?: string;
}

export default function LoginInput({
  placeholder,
  style,
  value,
  onChangeText,
  editable = true,
  bgColor,
  isPassword = false,
  isDate = false,
  rightIcon,
  initialDate,
}: TextInputProps) {
  const [secure, setSecure] = useState(isPassword);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState<Date>(
    initialDate ? new Date(initialDate) : new Date()
  );

  useEffect(() => {
    if (initialDate) {
      setDate(new Date(initialDate));
    }
  }, [initialDate]);

  const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
      onChangeText?.(selectedDate.toISOString());
    }
  };

  return (
    <View
      style={[
        styles.container,
        style,
        { backgroundColor: bgColor || "#EDEDED" },
      ]}
    >
      <View style={styles.inputRow}>
        <TextInput
          placeholder={placeholder}
          editable={editable && !isDate}
          secureTextEntry={secure}
          value={isDate ? formattedDate : value}
          onChangeText={onChangeText}
          style={styles.input}
          pointerEvents={isDate ? "none" : "auto"}
        />
        {isPassword && (
          <Pressable onPress={() => setSecure(!secure)} style={styles.icon}>
            <Ionicons
              name={secure ? "eye-off" : "eye"}
              size={24}
              color="#1E201E"
            />
          </Pressable>
        )}
        {isDate && (
          <Pressable onPress={() => setShowPicker(true)} style={styles.icon}>
            <Feather name="calendar" size={20} color="#7AB2D3" />
          </Pressable>
        )}
        {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
      </View>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    width: "100%",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
  },
  icon: {
    marginLeft: 10,
  },
});
