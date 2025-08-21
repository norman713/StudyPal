import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  GestureResponderEvent,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomButton from "../CustomButton";

type ModalType = "error" | "success" | "question";

interface MessageProps {
  visible: boolean;
  type: ModalType;
  title: string;
  description: string;
  onClose: () => void;
  onOkPress: (event: GestureResponderEvent) => void;
  onCancelPress?: (event: GestureResponderEvent) => void; // chỉ dùng cho question
}

export default function Message({
  visible,
  type,
  title,
  description,
  onClose,
  onOkPress,
  onCancelPress,
}: MessageProps) {
  // Config cho từng loại
  const config = {
    error: {
      icon: "close-thick",
      color: "#FF5B5E",
      okText: "OK",
      showCancel: false,
    },
    success: {
      icon: "check-bold",
      color: "#4CAF50",
      okText: "OK",
      showCancel: false,
    },
    question: {
      icon: "help",
      color: "#2196F3",
      okText: "OK",
      showCancel: true,
    },
  }[type];

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <Pressable onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="black" />
          </Pressable>

          {/* Content Section */}
          <View style={styles.content}>
            <View style={styles.header}>
              <View
                style={[styles.iconWrapper, { backgroundColor: config.color }]}
              >
                <MaterialCommunityIcons
                  name={config.icon as any}
                  size={18}
                  color="#FFFFFF"
                />
              </View>
              <Text style={styles.title}>{title}</Text>
            </View>

            {/* Description */}
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{description}</Text>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <CustomButton
              onPress={onOkPress}
              style={[styles.okButton, { backgroundColor: config.color }]}
            >
              {config.okText}
            </CustomButton>

            {config.showCancel && onCancelPress && (
              <CustomButton
                onPress={onCancelPress}
                style={[styles.cancelButton]}
              >
                Cancel
              </CustomButton>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  content: {
    width: "100%",
    alignItems: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconWrapper: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  descriptionContainer: {
    width: "100%",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#000",
    textAlign: "left",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    width: "100%",
  },
  okButton: {
    flex: 1,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#BDBDBD",
  },
});
