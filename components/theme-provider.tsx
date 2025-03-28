"use client";
import Cookies from "js-cookie";
import { setUserInfo } from "@/store/reducer/userInfo";
import axios from "axios";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const dispatch = useDispatch();

  const fetchInfo = async () => {
    try {
      const {
        data: { user },
      } = await axios.get("/api/user");
      dispatch(
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
    const isToken = Cookies.get("token");
    if(isToken){
      fetchInfo();
    }
  }, []);
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
