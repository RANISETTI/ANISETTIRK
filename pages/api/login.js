import setCookieHeader from '../../libs/utils/setCookieHeader';
import { loginProxyService } from '../../services/auth/login';

export default async function middleware(request, response) {
  if (request.method === 'POST') {
    const { body: { username, password, captcha } = { username: '', password: '', recaptcha: '' } } = request;
    response.setHeader('Content-Type', 'application/json');
    const { data, errors } = await loginProxyService(username, password, captcha);
    if (errors && Object.keys(errors).length) {
      response.status(400);
      response.setHeader('Set-Cookie', setCookieHeader());
      response.end(JSON.stringify(errors));
    } else {
      response.status(200);
      response.setHeader('Set-Cookie', setCookieHeader(data.key));
      response.end(JSON.stringify(data));
    }
  } else {
    response.statusCode = 405;
    response.end();
  }
}
