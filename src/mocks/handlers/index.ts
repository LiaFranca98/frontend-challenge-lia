
import { catalogHandlers } from './catalog';
import { cartHandlers } from './cart';
import { authHandlers } from './auth';
import { favoritesHandlers } from './favorites';
import { checkoutHandlers } from './checkout';
import { socketHandlers } from './socket';

export const handlers: Array<any> = [
  ...catalogHandlers,
  ...cartHandlers,
  ...authHandlers,
  ...favoritesHandlers,
  ...checkoutHandlers,
  ...socketHandlers,
];
