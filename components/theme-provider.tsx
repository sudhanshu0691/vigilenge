"use client";
import { setUserInfo } from "@/store/reducer/userInfo";
import axios from "axios";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const dipatch = useDispatch();

  const fetchInfo = async () => {
    try {
      const {
        data: { user },
      } = await axios.get("/api/user");
      dipatch(
        setUserInfo({
          name: user.name,
          email: user.email,
          phonenumber: user.phonenumber,
          usertype: user.usertype,
        })
      );
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useLayoutEffect(() => {
    fetchInfo();
  }, []);
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
