import { store } from '../index';

export const openSnack = (text) => {
  store.dispatch({
    type: 'OPEN_SNACK',
    text
  })
}