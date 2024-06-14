import { user } from './user';

export const useActions = (state, dispatch) => {
  return {
    user: user({ state, dispatch })
  }
};
