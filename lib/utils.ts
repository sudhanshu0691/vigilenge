import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

interface SetCookiesParameter {
  name: string;
  value: string | number;
  exdays: number;
}

export const SetCookies = ({ name, value, exdays }: SetCookiesParameter) => {
  if (name && value) {
    const date = new Date();
    date.setTime(date.getTime() + (exdays ?? 30) * 24 * 60 * 60 * 1000);
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
};

export const GetCookies = (name: string) => {
  if (name) {
    const decodeCookies = decodeURIComponent(document.cookie).split(" ");
    const filterCookies = decodeCookies.filter((cdata) =>
      cdata.split("=").includes(name)
    );
    return !!filterCookies.length
      ? filterCookies[0].split("=")[1]?.split(";")[0]
      : null;
  }
  return undefined;
};

export const RemoveCookies = (name: string) => {
  if (name) {
    document.cookie = name + "= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  } else {
    return name;
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



