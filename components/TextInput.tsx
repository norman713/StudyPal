import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
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
  onChangeText?: (text: string) => void;
  editable?: boolean;
  isPassword?: boolean;
  isDate?: boolean;
}

export default function LoginInput({
  placeholder,
  style,
  onChangeText,
  editable = true,
  isPassword = false,
  isDate = false,
}: TextInputProps) {
  const [secure, setSecure] = useState(isPassword);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

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
    <View style={[styles.container, style]}>
      <View style={styles.inputRow}>
        <TextInput
          placeholder={placeholder}
          editable={editable && !isDate}
          secureTextEntry={secure}
          value={isDate ? formattedDate : undefined}
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
            <Ionicons name="calendar" size={24} color="#1E201E" />
          </Pressable>
        )}
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
    paddingVertical: 5,
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
