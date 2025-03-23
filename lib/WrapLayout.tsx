"use client";

import type React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "@/components/theme-provider";

function WrapLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>{" "}
    </Provider>
  );
}

export default WrapLayout;
