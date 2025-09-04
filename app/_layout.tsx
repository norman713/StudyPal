import { AuthProvider } from "@/context/auth";
import { GlobalLoadingProvider } from "@/context/loadingContext";
import { NavigationProvider } from "@/context/navigationContext";
import { TeamProvider } from "@/context/teamContext";
import { UserProvider } from "@/context/userContext";
import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <AuthProvider>
      <GlobalLoadingProvider>
        <UserProvider>
          <NavigationProvider>
            <TeamProvider>
              <Stack
                screenOptions={{
                  contentStyle: {
                    paddingVertical: 16,
                  },
                  headerShown: false,
                }}
              />
            </TeamProvider>
          </NavigationProvider>
        </UserProvider>
      </GlobalLoadingProvider>
    </AuthProvider>
  );
}
