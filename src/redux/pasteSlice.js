import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";


const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      // add a check -> if paste already exists or of same title
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("Paste created Succesfully");
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item.id === paste.id);

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast("Paste updated Succesfully");
      } else {
        toast.error("Paste not found");
      }
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item.id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast("Paste removed Succesfully");
      } else {
        toast.error("Paste not found");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast("All pastes removed");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, removeFromPastes, resetAllPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
