import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { addBranch, deleteBranch, setAllBranches, setBranch, updateBranch } from "../reducers/branchReducer";
import { Branch } from "../types/types";

const URL = import.meta.env.VITE_API_URL;

// Obtener todas las sucursales
const fetchAllBranches = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${URL}/branches`);
      dispatch(setAllBranches(response.data));
    } catch (error) {
      console.error("Error al obtener las sucursales:", error);
    }
  };
};

// Obtener una sucursal por ID
const fetchBranchById = (branchId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${URL}/branches/${branchId}`);
      console.log("data de la respuesta en sucursal",response.data);
      
      dispatch(setBranch(response.data));
    } catch (error) {
      console.error(`Error al obtener la sucursal ${branchId}:`, error);
    }
  };
};

// Crear una nueva sucursal
const createBranch = (branchData: Branch) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${URL}/branches`, branchData);
      dispatch(addBranch(response.data));
      return response;
    } catch (error) {
      console.error("Error al crear una nueva sucursal:", error);
    }
  };
};

// Actualizar una sucursal existente
const updateBranchById = (branchId: number, branchData: Branch) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.put(`${URL}/branches/${branchId}`, branchData);
      console.log(response);
      
      dispatch(updateBranch(response.data));
      return response;
    } catch (error) {
      console.error(`Error al actualizar la sucursal ${branchId}:`, error);
    }
  };
};

// Eliminar una sucursal
const deleteBranchById = (branchId: number, branchData: Branch) => {
  return async (dispatch: Dispatch) => {
    try {
        const response = await axios.put(`${URL}/branches/${branchId}`, branchData);
        dispatch(deleteBranch(branchId));
        return response;
    } catch (error) {
      console.error(`Error al eliminar la sucursal ${branchId}:`, error);
    }
  };
};

export {
  fetchAllBranches,
  fetchBranchById,
  createBranch,
  updateBranchById,
  deleteBranchById,
};
