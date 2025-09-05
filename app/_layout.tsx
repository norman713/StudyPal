// RootLayout.tsx
import { AuthProvider } from "@/context/auth";
import { NavigationProvider } from "@/context/navigationContext";
import { TeamProvider } from "@/context/teamContext";
import { UserProvider } from "@/context/userContext";
import { Stack } from "expo-router";
import { MD3LightTheme, Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <AuthProvider>
        <UserProvider>
          <NavigationProvider>
            <TeamProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              />
            </TeamProvider>
          </NavigationProvider>
        </UserProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
