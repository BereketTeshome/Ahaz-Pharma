import { Timestamp } from "firebase/firestore";

export interface MedicineModel {
  expiredDate: Timestamp;
  id: string;
  image: string;
  name: string;
  quantity: number;
  status: boolean;
  unit: string;
}
