const initialState = {
  menu: [],
  loading: true,
  error: false,
  items: [],
  total: 0,
  searchValue: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "MENU_LOADED":
      const value = state.searchValue;
      const menuList = action.payload;
      if (value.length === 0) {
        return {
          ...state,
          menu: action.payload,
          loading: false,
          error: false,
        };
      }
      return {
        ...state,
        menu: menuList.filter(
          (item) => item.title.toLowerCase().indexOf(value) > -1
        ),
        loading: false,
        error: false,
      };
    case "MENU_REQUESTED":
      return {
        ...state,
        menu: state.menu,
        loading: true,
        error: false,
      };
    case "MENU_ERROR":
      return {
        ...state,
        menu: state.menu,
        error: true,
      };
    case "ITEM_ADD_TO_CART":
      const id = action.payload;
      const itemInd = state.items.findIndex((item) => item.id === id);
      if (itemInd >= 0) {
        const itemInState = state.items.find((item) => item.id === id);
        const newItem = {
          ...itemInState,
          quantity: ++itemInState.quantity,
        };
        return {
          ...state,
          items: [
            ...state.items.slice(0, itemInd),
            newItem,
            ...state.items.slice(itemInd + 1),
          ],
          total: state.total + newItem.price,
        };
      }
      const item = state.menu.find((item) => item.id === id);
      const newItem = {
        title: item.title,
        url: item.url,
        price: item.price,
        id: item.id,
        quantity: 1,
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
      const itemRemoved = state.items[itemIndex];
      return {
        ...state,
        items: [
          ...state.items.slice(0, itemIndex),
          ...state.items.slice(itemIndex + 1),
        ],
        total: (sumx -= itemRemoved.price * itemRemoved.quantity),
      };
    case "VALUE_CHANGED":
      return {
        ...state,
        searchValue: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
