const INIT_STATE = {
  carts: [],
};

export const cartreducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":
      const ItemIndex = state.carts.findIndex(
        (i) => i.item.id === action.payload.item.id
      );

      if (ItemIndex >= 0) {
        state.carts[ItemIndex].qnty += 1;
        return {
          ...state,
          carts: [...state.carts],
        };
      } else {
        const temp = { ...action.payload, qnty: 1 };
        return {
          ...state,
          carts: [...state.carts, temp],
        };
      }

    case "RMV_CART":
      const data = state.carts.filter((el) => el.item.id !== action.payload);
      return {
        ...state,
        carts: data,
      };

    case "RMV_ONE":
      const ItemIndex_dec = state.carts.findIndex(
        (i) => i.item.id === action.payload.id
      );


      if (state.carts[ItemIndex_dec].qnty >= 1) {
        state.carts[ItemIndex_dec].qnty -= 1
        return {
          ...state,
          carts: [...state.carts],
        };
      } else if (state.carts[ItemIndex_dec].qnty === 1) {
        const data = state.carts.filter((el) => el.item.id !== action.payload);

        return {
          ...state,
          carts: data,
        };
      }
      break;
    default:
      return state;
  }
};
