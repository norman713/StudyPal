import Loading from "@/app/loading";
import { createContext, useContext, useState } from "react";
import { View } from "react-native";

const Ctx = createContext<{
  isLoading: boolean;
  setLoading: (v: boolean) => void;
}>({
  isLoading: false,
  setLoading: () => {},
});

export function GlobalLoadingProvider({ children }: any) {
  const [isLoading, setLoading] = useState(false);
  return (
    <Ctx.Provider value={{ isLoading, setLoading }}>
      {children}
      {isLoading && (
        <View style={{ position: "absolute", inset: 0 }}>
          <Loading />
        </View>
      )}
    </Ctx.Provider>
  );
}
export const useGlobalLoading = () => useContext(Ctx);
