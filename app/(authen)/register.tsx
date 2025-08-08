import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import Select from "@/components/Select";
import TextInput from "@/components/TextInput";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
export default function Register() {
  const [selectedGender, setSelectedGender] = useState("Male");
  const [userInfo, setUserInfo] = useState<any>(null);
  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.content}>
        <View style={styles.contentAbove}>
          <Text style={styles.title}>Register</Text>
          <View style={styles.containerSmall}>
            <TextInput placeholder={"Enter your username"} />
            <TextInput placeholder={"Enter your email"} />
            <TextInput
              placeholder="Choose your birthday"
              isDate
              onChangeText={(isoDate) =>
                console.log("Ngày được chọn:", isoDate)
              }
            />
            <Select
              value={selectedGender}
              onChange={(value) => {
                setSelectedGender(value);
              }}
              options={["Male", "Female", "Others"]}
            />
            <TextInput placeholder="Enter your password" isPassword />
            <TextInput placeholder="Retype your password" isPassword />
          </View>
        </View>
        <CustomButton onPress={() => router.push("/(authen)/login")}>
          Register
        </CustomButton>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 5,
    paddingVertical: 20,
    backgroundColor: "white",
    gap: 80,
    width: "100%",
  },
  content: {
    gap: 80,
    paddingHorizontal: 20,
  },
  contentAbove: {
    gap: 40,
  },
  containerSmall: {
    gap: 20,
  },
  title: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 36,
    textAlign: "center",
    color: "#7AB2D3",
  },
});
