import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";


const UserContext = createContext(null);



export function UserProvider({ children }) {


  const [profile, setProfile] =
    useState(null);


  const [loading, setLoading] =
    useState(true);



  const loadProfile = async () => {


    try {


      const response =
        await api.get("/user/profile");


      setProfile(response.data);


    }
    catch(error){


      console.error(
        "Failed to load profile",
        error
      );


    }
    finally{


      setLoading(false);


    }


  };





  const updateProfile = async (payload) => {


    try {


      const response =
        await api.put(
          "/user/profile",
          payload
        );


      setProfile(response.data);


      return response.data;


    }
    catch(error){


      console.error(
        "Profile update failed",
        error
      );


      throw error;


    }


  };





  const clearProfile = () => {


    setProfile(null);


  };





  useEffect(()=>{


    loadProfile();


  },[]);





  return (

    <UserContext.Provider

      value={{

        profile,

        loading,

        setProfile,

        loadProfile,

        updateProfile,

        clearProfile,

      }}

    >

      {children}


    </UserContext.Provider>

  );


}



export const useUser = () =>
  useContext(UserContext);