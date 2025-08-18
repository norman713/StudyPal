import { AuthProvider } from "@/context/auth";
import { GlobalLoadingProvider } from "@/context/loadingContext";
import { UserProvider } from "@/context/userContext";
import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <AuthProvider>
      <GlobalLoadingProvider>
        <UserProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </UserProvider>
      </GlobalLoadingProvider>
    </AuthProvider>
  );
}
