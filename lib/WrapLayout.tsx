"use client";

import type React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "@/components/theme-provider";
import { useLayoutEffect } from "react";
import { cookies } from "next/headers";
import axios from "axios";
import { GetCookies } from "./utils";

function WrapLayout({ children }: { children: React.ReactNode }) {
  const fetchInfo = async () => {
    const token = GetCookies("token");
    if (token) {
      try {
        const res = await axios.get("/api/user");
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useLayoutEffect(() => {
    fetchInfo();
  }, []);

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
function fetchInfo() {
  throw new Error("Function not implemented.");
}
