const initialState = {
  menu: [],
  loading: true,
  items: [],
  total: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "MENU_LOADED":
      return {
        ...state,
        menu: action.payload,
        loading: false,
      };
    case "MENU_REQUESTED":
      return {
        ...state,
        menu: state.menu,
        loading: true,
      };

    case "ITEM_ADD_TO_CART":
      const id = action.payload;
      const item = state.menu.find((item) => item.id === id);
      const newItem = {
        title: item.title,
        url: item.url,
        price: item.price,
        id: item.id,
      };
      let sum = state.total;
      return {
        ...state,
        items: [...state.items, newItem],
        total: (sum += newItem.price),
      };
    case "ITEM_DELETE_FROM_CART":
      const idx = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === idx);
      let sumx = state.total;
      return {
        ...state,
        items: [
          ...state.items.slice(0, itemIndex),
          ...state.items.slice(itemIndex + 1),
        ],
        total: (sumx -= state.items[itemIndex].price),
      };

    default:
      return state;
  }
};

export default reducer;
