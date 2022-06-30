/**
 * Get current origin or static (default)
 */
const getOrigin = (): string => {
  let origin = 'http://localhost:8000/';

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    origin = 'http://booking.keep-calm.ru/server/';
  }

  return origin;
};

export default getOrigin;
