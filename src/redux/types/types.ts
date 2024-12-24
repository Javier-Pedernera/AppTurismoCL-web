export enum UserActionTypes {
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    REGISTER_FAILURE = 'REGISTER_FAILURE',
  }
  
  // Definición del tipo de estado del usuario
  export interface UserState {
    userData: UserData | null; 
    loading: boolean; 
    error: string | null; 
  }
  
  // Definición de la estructura de los datos del usuario
  export interface UserData {
    id: string;
    username: string;
    email: string;
  }
  export interface Status {
    id: number;
    name: string;
    description: string;
  }
  export interface Branch {
    branch_id: number;
    name: string;
    address: string;
    description: string;
    status: {
      name: string;
    };
    image_url: string;
  }