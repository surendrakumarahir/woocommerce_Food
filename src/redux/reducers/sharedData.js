/* eslint-disable no-undef */

/* eslint-disable array-callback-return */
/* eslint-disable default-case */
/* eslint-disable no-param-reassign */
const initialState = {
  banners: [],
  tab1: [],
  tab2: [],
  tab3: [],
  vendorData: null,
  products: [],
  deepTemp: false
};

const sharedData = (state = initialState, action) => {
  switch (action.type) {

    case 'ADD_BANNERS':
        state.banners = action.payload;
        return {
          ...state,
        }
    case 'ADD_NEWEST':
        state.tab1 = action.payload1;
        return {
          ...state,
        }
      case 'ADD_Products':
        state.products = action.payload6;
        return {
          ...state,
        }
    case 'ADD_ONSALE':
      state.tab2 = action.payload2;
      return {
        ...state,
      }
    case 'ADD_FEATURED':
      state.tab3 = action.payload3;
      return {
        ...state,
      }
      case 'ADD_VENDORS':
          state.vendorData = action.payload4;
          return {
            ...state,
          }
  }
  return state;
};

export default sharedData;
