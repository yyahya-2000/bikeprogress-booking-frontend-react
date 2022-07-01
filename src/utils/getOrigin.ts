/**
 * Get current origin or static (default)
 */
const getOrigin = (): string => {
  let origin = 'http://localhost:8000/';

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    origin = 'http://5.101.51.143:7777/api.booking.keep-calm.ru/';
  }

  return origin;
};

export default getOrigin;
