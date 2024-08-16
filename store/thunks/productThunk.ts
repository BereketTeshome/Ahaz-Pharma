import { db } from "@/firebaseConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

export const fetchMedicines = createAsyncThunk(
  "data/fetchMedicines",
  async () => {
    const querySnapshot = await getDocs(collection(db, "medicines"));

    const data: any[] = [];

    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  }
);
export const fetchMedicalSupplies = createAsyncThunk(
  "data/fetchMedicalSupplies",
  async () => {
    const querySnapshot = await getDocs(collection(db, "medical_supplies"));

    const data: any[] = [];

    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  }
);
export const fetchLabReagents = createAsyncThunk(
  "data/fetchLabReagents",
  async () => {
    const querySnapshot = await getDocs(collection(db, "laboratory_reagents"));

    const data: any[] = [];

    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  }
);
