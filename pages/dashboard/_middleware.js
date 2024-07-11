import { NextResponse } from 'next/server';
import getHeaders from '../../libs/utils/getHeaders';

const cookieName = process.env.COOKIE_NAME;
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function middleware(request) {
  const { cookies: { [cookieName]: accessToken } } = request;
  const currentURL = request.nextUrl.pathname;
  const unauthorizedURL = request.nextUrl.clone();
  unauthorizedURL.pathname = '/unauthorized';

  const changePasswordURL = request.nextUrl.clone();
  changePasswordURL.pathname = '/dashboard/change-password';

  if (accessToken) {
    const headers = getHeaders(accessToken);
    try {
      const response = await fetch(`${baseURL}/auth/user/`, { headers });
      if (response.ok) {
        const {
          type, roles, required_to_password_change: forcePasswordChange,
        } = await response.json();

        if (forcePasswordChange && currentURL !== '/dashboard/change-password') {
          return NextResponse.redirect(changePasswordURL);
        }

        let feature = 'home';
        if (currentURL.startsWith('/dashboard/tenders')) {
          feature = 'tenders';
        } else if (currentURL.startsWith('/dashboard/careers')) {
          feature = 'careers';
        } else if (currentURL.startsWith('/dashboard/assets')) {
          feature = 'assets';
        } else if (currentURL.startsWith('/dashboard/procurement')) {
          feature = 'procurement';
        } else if (currentURL.startsWith('/dashboard/conference')) {
          feature = 'conference';
        } else if (currentURL.startsWith('/dashboard/cms')) {
          feature = 'cms';
        } else if (currentURL.startsWith('/dashboard/masters')) {
          feature = 'masters';
        } else if (currentURL.startsWith('/dashboard/user-management')) {
          feature = 'user-management';
        } else if (currentURL.startsWith('/dashboard/digital-certificate')) {
          feature = 'dsc';
        } else if (currentURL.startsWith('/dashboard/vendor-empanelment')) {
          feature = 'vendor';
        }


        if (type === 'APTS') {
          if (roles.includes('Admin')) {
            if (['home', 'tenders', 'careers', 'procurement', 'assets', 'conference', 'cms', 'masters', 'user-management', 'dsc', 'vendor'].includes(feature) && (!currentURL.includes('/dashboard/procurement/products'))) {
              return NextResponse.next();
            }
          } else if (!roles.includes('Finance')) {
            if (roles.includes('Procurement')) {
              if (feature === 'masters' && !currentURL.includes('users')) {
                return NextResponse.next();
              } if (feature === 'home' || feature === 'procurement' || feature === 'vendor') {
                return NextResponse.next();
              } if (currentURL.includes('/dashboard/tenders/list')) {
                return NextResponse.next();
              }
              return NextResponse.redirect(unauthorizedURL);
            } if (roles.includes('Product Manager')) {
              if (feature === 'masters' && !(currentURL.includes('department') || currentURL.includes('users'))) {
                return NextResponse.next();
              } if (feature === 'home' || feature === 'vendor') {
                return NextResponse.next();
              }
              return NextResponse.redirect(unauthorizedURL);
            } if (roles.includes('DSC Admin')) {
              console.log('log');
              if (feature === 'home' || feature === 'tenders' || feature === 'dsc') {
                return NextResponse.next();
              }
              return NextResponse.redirect(unauthorizedURL);
            }
            switch (feature) {
              case 'home':
                return NextResponse.next();
              case 'tenders':
                if (roles.includes('Tenders')) {
                  return NextResponse.next();
                }
                break;
              case 'careers':
                if (roles.includes('Careers')) {
                  return NextResponse.next();
                }
                break;
              case 'procurement':
                if (roles.includes('Procurement')) {
                  return NextResponse.next();
                }
                break;
              case 'assets':
                if (roles.includes('Assets')) {
                  return NextResponse.next();
                }
                break;
              case 'masters':
                if (roles.includes('Procurement')) {
                  return NextResponse.next();
                }
                break;
              case 'conference':
                if (roles.includes('Conferences')) {
                  return NextResponse.next();
                }
                break;
              case 'dsc':
                if (roles.includes('DSC User') || roles.includes('DSC Admin')) {
                  return NextResponse.next();
                }
                break;
              case 'vendor':
                if (roles.includes('Vendor')) {
                  return NextResponse.next();
                }
                break;
              default:
                return NextResponse.redirect(unauthorizedURL);
            }
          } else if (roles.includes('Finance')) {
            if (currentURL.includes('orders') || feature === 'home') {
              return NextResponse.next();
            }
          }
        } else if (type === 'DEPARTMENT') {
          // if (feature === 'procurement' || feature === 'assets' || feature === 'home') {
          if (feature === 'procurement' || feature === 'home' || feature === 'assets') {
            return NextResponse.next();
          }
        } else if (type === 'VENDOR') {
          if (((feature === 'procurement' || feature === 'vendor') && (currentURL.includes('orders') || currentURL.includes('vendor-empanelment')  || currentURL.includes('products'))) || feature === 'home') {
            return NextResponse.next();
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return NextResponse.redirect(unauthorizedURL);
}
