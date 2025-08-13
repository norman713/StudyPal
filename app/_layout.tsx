import { GlobalLoadingProvider } from "@/context/loadingContext";
import { UserProvider } from "@/context/userContext";
import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <GlobalLoadingProvider>
      <UserProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </UserProvider>
    </GlobalLoadingProvider>
  );
}
