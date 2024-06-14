const initialState = {
  loggedIn: false,
  loading: false,
  s_toggle:false
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem('token', action.data.token);
      return { ...state, ...{ loggedIn: true }, ...action.data };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};
