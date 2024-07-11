import { NextResponse } from 'next/server';
import getHeaders from '../../libs/utils/getHeaders';

const cookieName = process.env.COOKIE_NAME;
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function middleware(request) {
  const { page: { name = '' }, cookies: { [cookieName]: accessToken } } = request;
  const protectedURLs = ['/user/login', '/user/signup'];
  const currentURL = request.nextUrl.clone();
  if (accessToken && protectedURLs.includes(name)) {
    const headers = getHeaders(accessToken);
    try {
      const response = await fetch(`${baseURL}/auth/user/`, { headers });
      if (response.ok) {
        currentURL.pathname = '/dashboard';
        return NextResponse.redirect(currentURL);
      }
    } catch (error) {
      console.log(error);
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}
