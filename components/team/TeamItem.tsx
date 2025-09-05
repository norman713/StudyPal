import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Tooltip } from "react-native-paper";

interface TeamItemProps {
  title: string;
  imageSource: string;
  isAdmin?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
}

export default function TeamItem({
  title,
  imageSource,
  isAdmin = false,
  style,
  onPress,
}: TeamItemProps) {
  const adminIcon = require("@/assets/icon/Main_Component.png");

  return (
    <View style={[styles.wrapper, style]}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          {/* Left: Avatar + Title */}
          <View style={styles.leftSection}>
            <Image source={{ uri: imageSource }} style={styles.avatar} />
            <Text style={styles.title}>{title}</Text>
          </View>

          {/* Right: Admin icon with Tooltip */}
          {isAdmin && (
            <Tooltip title={"You're admin"}>
              <TouchableOpacity style={styles.adminWrapper} activeOpacity={0.8}>
                <Image
                  source={adminIcon}
                  style={styles.adminIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </Tooltip>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    zIndex: 1,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
    color: "#222",
  },
  adminWrapper: {
    padding: 4,
  },
  adminIcon: {
    width: 24,
    height: 24,
  },
});
