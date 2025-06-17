import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userInfo: [],
  products: [],
  checkedBrands: [],
  checkedCategorys: [],
};

export const Handles = createSlice({
  name: "Handles",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      // Dispatch a success toast with custom color
      toast.success("Successfully added to reservation list", {
        style: {
          backgroundColor: "#46A29F",  // Success toast background color
          color: "white",  // White text color
          fontFamily: " 'Roboto Condensed' ",  // Font style
          fontSize: "16px",  // Font size for the toast text
          fontWeight: "500",  // Font weight for a balanced look
        // Padding for better spacing
          borderRadius: "8px",  // Smooth rounded corners
        },
      });
      
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
        // Optional: Dispatch a success toast for quantity increase
        toast.success("Product quantity increased", {
          style: {
            backgroundColor: "#46A29F",  // Success toast background color
            color: "white",  // White text color
          },
        });
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
        // Optional: Dispatch a success toast for quantity decrease
        toast.success("Product quantity decreased", {
          style: {
            backgroundColor: "#46A29F",  // Success toast background color
            color: "white",  // White text color
          },
        });
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
      // Dispatch a error toast for item removal
      toast.error("Product removed from cart", {
        style: {
          backgroundColor: "#e74c3c",  // Red background for error
          color: "white",  // White text color
        },
      });
    },
    resetCart: (state) => {
      state.products = [];
      // Optional: Dispatch a success toast when cart is reset
      toast.success("Cart has been cleared", {
        style: {
          backgroundColor: "#46A29F",  // Success toast background color
          color: "white",  // White text color
        },
      });
    },

    toggleBrand: (state, action) => {
      const brand = action.payload;
      const isBrandChecked = state.checkedBrands.some(
        (b) => b._id === brand._id
      );

      if (isBrandChecked) {
        state.checkedBrands = state.checkedBrands.filter(
          (b) => b._id !== brand._id
        );
      } else {
        state.checkedBrands.push(brand);
      }
    },

    toggleCategory: (state, action) => {
      const category = action.payload;
      const isCategoryChecked = state.checkedCategorys.some(
        (b) => b._id === category._id
      );

      if (isCategoryChecked) {
        state.checkedCategorys = state.checkedCategorys.filter(
          (b) => b._id !== category._id
        );
      } else {
        state.checkedCategorys.push(category);
      }
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  toggleBrand,
  toggleCategory,
} = Handles.actions;
export default Handles.reducer;
