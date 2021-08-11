export const initialState = {
  username: "",
  user: '',
  image:''
};

export const actionType = {
    SET_USER: "SET_USER",
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
      case actionType.SET_USER:
        return {
          ...state,
          user: action.user,
          username: action.username,
          image:action.image
        };
      
      default:
        return state;
    }
};
  
export default reducer;