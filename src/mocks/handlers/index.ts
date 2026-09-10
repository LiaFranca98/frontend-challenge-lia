import { HttpHandler } from 'msw';
import { catalogHandlers } from './catalog';
import { cartHandlers } from './cart';

export const handlers: HttpHandler[] = [
  ...catalogHandlers,
  ...cartHandlers,
];
