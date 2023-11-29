import { atom } from 'recoil';

export const isModalState = atom({
  key: 'isModal',
  default: false,
});

export const isLoadingState = atom({
    key: 'isLoading',
    default: false,
})
