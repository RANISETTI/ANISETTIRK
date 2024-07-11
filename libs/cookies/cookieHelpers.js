import Cookie from 'js-cookie';

const isProd = process.env.NODE_ENV === 'production';
const cookieName = process.env.COOKIE_NAME;

export const setCookie = (value, keepLoggedIn) => {
  if (keepLoggedIn) {
    Cookie.set(cookieName, value, { expires: 30, secure: isProd });
  } else {
    Cookie.set(cookieName, value, { expires: 1, secure: isProd });
  }
};

export const getCookieValue = (name) => (
  Cookie.get(name)
);

export const setCookieParams = (name, value) => {
  Cookie.set(name, value, { expires: 1, secure: isProd });
};

export const setSessionParams = (name, value) => {
  const inSixtyMinutes = new Date(new Date().getTime() + 60 * 60 * 1000);
  Cookie.set(name, value, { expires: inSixtyMinutes, secure: isProd });
};

export const setFarExpireCookieParams = (name, value) => (
  Cookie.set(name, value, { expires: 365, secure: isProd })
);

export const deleteCookie = () => { Cookie.remove(cookieName); };
