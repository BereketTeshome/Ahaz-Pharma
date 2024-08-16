import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import {
  fetchLabReagents,
  fetchMedicalSupplies,
  fetchMedicines,
} from "../thunks/productThunk";
import { Status } from "@/models/status.enum";

// Define a type for the slice state
interface ProductType {
  medicines: any[];
  medicalSupplies: any[];
  labReagents: any[];
  filter: string;
  status: Status;
  error: null | string | any;
}
// Define the initial state using that type
const initialState: ProductType = {
  medicines: [],
  medicalSupplies: [],
  labReagents: [],
  filter: "medicines",
  status: Status.IDLE,
  error: null,
};

export const productSlice = createSlice({
  name: "products",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicines.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchMedicines.fulfilled, (state, action) => {
        state.status = Status.SUCCEEDED;
        state.medicines = action.payload; // Update with the fetched data
      })
      .addCase(fetchMedicines.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      })
      .addCase(fetchMedicalSupplies.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchMedicalSupplies.fulfilled, (state, action) => {
        state.status = Status.SUCCEEDED;
        state.medicalSupplies = action.payload; // Update with the fetched data
      })
      .addCase(fetchMedicalSupplies.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      })
      .addCase(fetchLabReagents.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchLabReagents.fulfilled, (state, action) => {
        state.status = Status.SUCCEEDED;
        state.labReagents = action.payload; // Update with the fetched data
      })
      .addCase(fetchLabReagents.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      });
  },
});
export const { changeFilter } = productSlice.actions;
// Other code such as selectors can use the imported `RootState` type
// export const selectUser = (state: RootState) => state.products;
export default productSlice.reducer;
