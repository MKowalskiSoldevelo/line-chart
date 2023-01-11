import { createSlice } from "@reduxjs/toolkit";

export const companiesSlice = createSlice({
  name: 'companies',
  initialState: {
    selectedCompany: {
      label: '', value: ''
  }
  },
  reducers: {
    setSelectedCompnay: (state, action) => {
      state.selectedCompany = action.payload
    }
  }
});

export const { setSelectedCompnay } = companiesSlice.actions;

export default companiesSlice.reducer