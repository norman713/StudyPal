import userApi from "@/api/userApi";
import CustomButton from "@/components/CustomButton";
import Select from "@/components/Select";
import LoginInput from "@/components/TextInput";
import { User, useUser } from "@/context/userContext";
import useCustomFonts from "@/hook/useCustomFont";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const fontsLoaded = useCustomFonts();
  const { user, setUser } = useUser();
  const [userData, setUserData] = useState<User | null>(null);
  const [newUserData, setNewUserData] = useState<User | null>(null);

  const genderOptions = ["Male", "Female", "Other"];
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userApi.getUserInfo();

        const userInfo: User = {
          name: response.name,
          dateOfBirth: response.dateOfBirth,
          gender: response.gender,
          avatarUrl: response.avatarUrl,
        };

        setUserData(userInfo);
        setNewUserData(userInfo);
        setUser(userInfo);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (field: keyof User, value: string) => {
    setNewUserData((prev) =>
      prev ? { ...prev, [field]: value } : ({ [field]: value } as User)
    );
  };

  const handleSave = async () => {
    if (!newUserData) return;
    try {
      // Call the API with all updated fields
      const response = await userApi.updateUserInfo(
        userData?.id || "",
        newUserData
      );
      Alert.alert("Success", "User info updated successfully.");
      setUserData((prev) => ({ ...prev, ...newUserData }));
    } catch (error) {
      console.error("Error updating user data:", error);
      Alert.alert("Error", "Failed to update user info.");
    }
  };

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={["#7AB2D3", "#B9E5E8"]} style={styles.gradient}>
          <View style={styles.header}>
            <TouchableOpacity>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri:
                  user?.avatarUrl ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJhvWpQrh3nIxmjLBQSyH5uu7OKpprR2b4-g&s",
              }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraIcon}>
              <Feather name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.scrollContent}>
          <View style={styles.form}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputRow}>
                <LoginInput
                  bgColor="#FFFFFF"
                  placeholder="Username"
                  value={newUserData?.name}
                  onChangeText={(text) => handleInputChange("name", text)}
                  rightIcon={
                    <Feather name="edit-2" size={20} color="#7AB2D3" />
                  }
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Date of birth</Text>
              <View style={styles.inputRow}>
                <LoginInput
                  placeholder="Date of Birth"
                  isDate
                  bgColor="#FFFFFF"
                  initialDate={newUserData?.dateOfBirth}
                  onChangeText={(text) =>
                    handleInputChange("dateOfBirth", text)
                  }
                />
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.inputRow}>
                <Select
                  options={genderOptions}
                  value={newUserData?.gender || ""}
                  onChange={(val) => handleInputChange("gender", val)}
                />
              </View>

              <Pressable>
                <Text style={styles.resetText}>Reset password</Text>
              </Pressable>
            </View>
          </View>

          <View>
            <CustomButton onPress={handleSave}>Save</CustomButton>
            {/* Save button */}
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  gradient: {
    height: 180,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: "white",
  },

  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    backgroundColor: "#7AB2D3",
    padding: 6,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "white",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    flexGrow: 1,
    justifyContent: "space-between",
  },
  form: {
    marginTop: 33,
    gap: 20,
  },
  inputWrapper: {
    width: "100%",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#E0E0E0",
    elevation: 5,
    zIndex: 999,
  },
  resetText: {
    color: "#7AB2D3",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
  },
});
