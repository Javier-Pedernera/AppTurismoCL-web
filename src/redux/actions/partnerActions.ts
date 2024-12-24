import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { setPartnerData} from "../reducers/partnerReducer";
import { Branch } from "../../models/BranchModels";

import { PartnerCreate } from "../../models/PartnerModels";

const URL = import.meta.env.VITE_API_URL;

// Crear un nuevo partner
const createPartner = (partnerData:PartnerCreate) => {
  return async () => {
    try {
      const response = await axios.post(`${URL}/partners`, partnerData);
      // dispatch(setPartnerData(response.data));
      return response.data;
    } catch (error) {
      console.error("Error al crear un nuevo partner:", error);
      throw error;
    }
  };
};

// Obtener datos de un Partner por ID
const fetchPartnerById = (partnerId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${URL}/partners/${partnerId}`);
      console.log("respuesta en acition", response);
      
      dispatch(setPartnerData(response.data));
      return response
    } catch (error) {
      console.error(`Error al obtener los datos del partner ${partnerId}:`, error);
    }
  };
};

// actualizar datos de un Partner por ID
const updatePartner = (partnerId: number, data: any) => {
  return async (dispatch: Dispatch) => {
    try {
      // Incluye `data` en la solicitud `PUT`
      const response = await axios.put(`${URL}/partners/${partnerId}`, data);
      // console.log("respuesta partner",response);
      
      dispatch(setPartnerData(response.data));
      return response
    } catch (error) {
      console.error(`Error al actualizar los datos del partner ${partnerId}:`, error);
      throw error; // Re-lanzar el error para manejarlo en el componente si es necesario
    }
  };
};
// // Crear una nueva sucursal para un Partner
// const createBranch = (partnerId: number, branchData: Branch) => {
//   return async (dispatch: Dispatch) => {
//     try {
//       const response = await axios.post(`${URL}/partners/${partnerId}/branches`, branchData);
//       dispatch(addBranch(response.data));
//     } catch (error) {
//       console.error("Error al crear una nueva sucursal:", error);
//     }
//   };
// };

// // Actualizar una sucursal existente
// const updateBranchById = (branchId: number, branchData: Branch) => {
//   return async (dispatch: Dispatch) => {
//     try {
//       const response = await axios.put(`${URL}/branches/${branchId}`, branchData);
//       dispatch(updateBranch(response.data));
//     } catch (error) {
//       console.error(`Error al actualizar la sucursal ${branchId}:`, error);
//     }
//   };
// };

// // Eliminar una sucursal
// const deleteBranchById = (branchId: number) => {
//   return async (dispatch: Dispatch) => {
//     try {
//       await axios.delete(`${URL}/branches/${branchId}`);
//       dispatch(deleteBranch(branchId));
//     } catch (error) {
//       console.error(`Error al eliminar la sucursal ${branchId}:`, error);
//     }
//   };
// };


// // Seleccionar una sucursal
// const selectBranch = (branch: Branch | null) => {
//   return async (dispatch: Dispatch) => {
//     try {
//       dispatch(setSelectedBranch(branch));
//     } catch (error) {
//       console.error("Error al seleccionar la sucursal:", error);
//     }
//   };
// };

export { fetchPartnerById, createPartner, updatePartner };

