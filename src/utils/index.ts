import { authValidations } from 'enums/authorization';
import { UrlBreadcrumd } from 'models/types';

export const getUrlAdress = (addres: string): UrlBreadcrumd[] => {
  const url = addres.split('/').filter((item) => item.length);
  const urlString: UrlBreadcrumd[] = [];
  url.forEach((item, index) =>
    urlString.push({
      link: index > 0 ? `${urlString[index - 1].link}/${item}` : `/${item}`,
      name: item,
    })
  );
  return urlString;
};

export const getParameterFromUrl = (param: string): string | null => {
  const url_string = window.location.href;
  const url = new URL(url_string);
  const vars = url.searchParams.get(param);
  return vars;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const scrollTopPage = () => window.scrollTo(0, 0);

export const generatePassword = (
  length = Math.floor(Math.random() * (8 - 6 + 1)) + 6,
  wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
) => {
  const password = Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => wishlist[x % wishlist.length])
    .join('');

  if (!authValidations.password.pattern.regex.test(password)) {
    generatePassword();
  }
  
  return password;
};
