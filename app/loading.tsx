// loading.tsx
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Platform, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

export default function Loading() {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    rotate.setValue(0); // đảm bảo reset từ 0
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== "web", // web -> false
      }),
      { resetBeforeIteration: true }
    ).start();
  }, [rotate]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg height={200} width={200} viewBox="0 0 200 200">
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#7AB2D3" stopOpacity="1" />
              <Stop offset="100%" stopColor="#D9D9D9" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Circle
            cx="100"
            cy="100"
            r="80"
            stroke="url(#grad)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="502"
            strokeDashoffset="125"
          />
        </Svg>
      </Animated.View>
    </View>
  );
}
