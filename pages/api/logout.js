import setCookieHeader from '../../libs/utils/setCookieHeader';
import { logoutProxyService } from '../../services/auth/logout';

export default async function logout(request, response) {
  if (request.method === 'POST') {
    const { body: { accessToken } = { accessToken: '' } } = request;
    await logoutProxyService(accessToken);
    response.setHeader('Content-Type', 'application/json');
    response.status(200);
    response.setHeader('Set-Cookie', setCookieHeader());
    response.end(JSON.stringify({}));
  } else {
    response.statusCode = 405;
    response.end();
  }
}
