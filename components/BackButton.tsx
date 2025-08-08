import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function BackButton() {
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <Feather name="arrow-left-circle" size={35} color="#7AB2D3"></Feather>
    </TouchableOpacity>
  );
}
