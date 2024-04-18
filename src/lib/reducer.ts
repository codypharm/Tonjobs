export const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn") as string) || false,
  user: JSON.parse(localStorage.getItem("user") as string) || null,
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_REDIRECT_URI,
  client_secret: import.meta.env.VITE_CLIENT_SECRET,
  proxy_url: import.meta.env.VITE_PROXY_URL,
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem(
        "isLoggedIn",
        JSON.stringify(action.payload.isLoggedIn)
      );
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
      };
    }
    case "LOGOUT": {
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    default:
      return state;
  }
};
