import {
  createContext,
  useContext,
  useState,
} from "react";

import toast from "react-hot-toast";
import api from "../services/api";


const AuthContext = createContext(null);


export function AuthProvider({ children }) {


  const [user, setUser] = useState(() => {

    const stored =
      localStorage.getItem("pt_user");

    return stored
      ? JSON.parse(stored)
      : null;

  });


  const [loading] = useState(false);



  const saveUser = (userData) => {

    localStorage.setItem(
      "pt_user",
      JSON.stringify(userData)
    );

    setUser(userData);

  };




  const login = async (email, password) => {


    const response =
      await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );


    const {
      token,
      user
    } = response.data;



    localStorage.setItem(
      "pt_token",
      token
    );



    saveUser(user);



    return response.data;

  };







  const register = async (payload) => {


    const response =
      await api.post(
        "/auth/register",
        payload
      );


    const {
      token,
      user
    } = response.data;

    localStorage.setItem(
      "pt_token",
      token
    );

    saveUser(user);

    return response.data;

  };

  const logout = () => {

    localStorage.removeItem(
      "pt_token"
    );

    setUser(null);

  };

  return (

    <AuthContext.Provider

      value={{
        user,
        loading,
        login,
        register,
        logout
      }}

    >

      {children}

    </AuthContext.Provider>

  );

}



export const useAuth = () =>
  useContext(AuthContext);