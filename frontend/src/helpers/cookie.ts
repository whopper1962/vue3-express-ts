import dayjs from "dayjs";

export const Cookies = {
  USER_ID: "userId",
} as const;
type Cookies = (typeof Cookies)[keyof typeof Cookies];

export const useCookieHelper = () => {
  const setCookie = (
    name: Cookies,
    value: any,
    expiresInMillis: number,
  ): void => {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(
      value,
    )}`;

    const expirationDate = dayjs().add(expiresInMillis, "millisecond").toDate();

    cookieString += `; expires=${expirationDate}`;

    document.cookie = cookieString;
  };

  const getCookieValue = (cookieName: Cookies): string | null => {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (const cookie of cookieArray) {
      const [name, value] = cookie.trim().split("=");

      if (name === cookieName) {
        return value;
      }
    }

    return null;
  };

  const removeCookie = (cookieName: Cookies) => {
    document.cookie = `${encodeURIComponent(
      cookieName,
    )}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
  };

  return {
    setCookie,
    getCookieValue,
    removeCookie,
  };
};
