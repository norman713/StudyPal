import useCustomFonts from "@/hook/useCustomFont"; // Import your hook
import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Button, ButtonProps } from "react-native-paper";

type CustomButtonProps = ButtonProps & {
  children: React.ReactNode;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
  bgColor?: string;
  fontFamily?: string;
  fontSize?: number;
  lineHeight?: number;
  borderWidth?: number;
  borderColor?: string;
};

export default function CustomButton({
  children,
  icon,
  style,
  borderWidth = 1,
  borderColor = "rgba(0,0,0,0.15)",
  textColor = "white",
  bgColor = "#7AB2D3",
  fontFamily = "Poppins_700Bold",
  fontSize = 20,
  lineHeight = 26,
  ...props
}: CustomButtonProps) {
  const { fontsLoaded, error } = useCustomFonts();

  if (error) {
    return (
      <Button
        mode="elevated"
        textColor={textColor}
        buttonColor={bgColor}
        style={[styles.buttonBase, { borderWidth, borderColor }, style]}
        labelStyle={[styles.labelBase, { fontSize, fontFamily, lineHeight }]}
        contentStyle={styles.contentBase}
        icon={() => icon || null}
        {...props}
      >
        {children}
      </Button>
    );
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Button
      mode="elevated"
      textColor={textColor}
      buttonColor={bgColor}
      style={[styles.buttonBase, { borderWidth, borderColor }, style]}
      labelStyle={[styles.labelBase, { fontSize, fontFamily, lineHeight }]}
      contentStyle={styles.contentBase}
      icon={() => icon || null}
      {...props}
    >
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    borderRadius: 10,
    borderWidth: 2, // Đặt giá trị mặc định là 1
    width: "100%",
  },
  labelBase: {
    // fontSize, fontFamily, lineHeight nhận từ props
  },
  contentBase: {
    flexDirection: "row",
    alignItems: "center",
  },
});
