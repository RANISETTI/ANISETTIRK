/* eslint-disable react/jsx-props-no-spreading */
import { Provider } from 'react-redux';
import SSRProvider from 'react-bootstrap/SSRProvider';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { loginFailed, updateUser } from '../components/auth/slices/LoginSlice';
import parseCookies from '../libs/cookies/parseCookie';
import getHeaders from '../libs/utils/getHeaders';
import store from '../libs/redux/store';
import '../styles/globals.scss';

export default function APTSApp(initialProps) {
  const { Component, pageProps, isServer } = initialProps;

  if (isServer) {
    const { isLoggedIn, accessToken, userDetails } = initialProps;
    if (isLoggedIn) {
      store.dispatch(updateUser({ isLoggedIn, accessToken, userDetails }));
    } else {
      store.dispatch(loginFailed());
    }
  }

  return (
    <Provider store={store}>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </Provider>
  );
}

APTSApp.getInitialProps = async ({ ctx: { req } }) => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    const cookieName = process.env.COOKIE_NAME;
    const cookies = parseCookies(req);
    const accessToken = cookies[cookieName] || '';
    const headers = getHeaders(accessToken);
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}auth/user/`, { headers });
      return {
        isServer, isLoggedIn: true, accessToken, userDetails: data,
      };
    } catch (error) {
      return { isServer, isLoggedIn: false };
    }
  }
  return { isServer };
};
