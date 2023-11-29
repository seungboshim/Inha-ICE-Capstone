import { atom } from 'recoil';

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
});

export const isAdminState = atom({
  key: 'isAdminState',
  default: false,
})