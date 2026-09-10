import { HttpHandler } from 'msw';
import { catalogHandlers } from './catalog';
import { cartHandlers } from './cart';
import { authHandlers } from './auth';
import { favoritesHandlers } from './favorites';

export const handlers: HttpHandler[] = [
  ...catalogHandlers,
  ...cartHandlers,
  ...authHandlers,
  ...favoritesHandlers,
];
