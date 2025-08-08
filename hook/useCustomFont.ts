import { PlusJakartaSans_400Regular, PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans';
import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export default function useCustomFonts() {
  const [fontsLoaded, error] = useFonts({
    Poppins_700Bold,
    Poppins_500Medium,
    Roboto_400Regular,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_400Regular,
    Poppins_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
    if (error) {
      console.error('Error loading fonts:', error);
    }
  }, [fontsLoaded, error]);

  return { fontsLoaded, error };
}