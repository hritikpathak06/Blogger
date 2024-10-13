"use client";
import { CurrentUserProvider } from "@/context/userContext";
import store from "@/store/store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CurrentUserProvider>{children}</CurrentUserProvider>
    </Provider>
  );
}
