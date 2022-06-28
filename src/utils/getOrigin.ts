/**
 * Get current origin or static (default)
 */
const getOrigin = (): string => {
  let origin = 'http://localhost:8000/';

  // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  //   origin = 'https://hseportal.infostrategic.com/';
  // }

  return origin;
};

export default getOrigin;
