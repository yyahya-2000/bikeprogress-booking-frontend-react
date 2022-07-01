/**
 * Get current origin or static (default)
 */
const getOrigin = (): string => {
  let origin = 'http://api.booking.keep-calm.ru/';

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    origin = 'http://localhost:8000/';
  }

  return origin;
};

export default getOrigin;
