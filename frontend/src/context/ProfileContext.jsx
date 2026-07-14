import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ProfileContext = createContext(null);

const defaultProfile = {

  photo: "",

  name: "Karthik Reddy",

  email: "karthikreddychereddy@gmail.com",

  phone: "+91 9876543210",

  monthlyIncome: 50000,

  savingsGoal: 1000000,

  financialHealth: 82,

};

export function ProfileProvider({ children }) {

  const [profile, setProfile] = useState(() => {

    const saved = localStorage.getItem("profile");

    return saved
      ? JSON.parse(saved)
      : defaultProfile;

  });

  useEffect(() => {

    localStorage.setItem(

      "profile",

      JSON.stringify(profile)

    );

  }, [profile]);

  const updateProfile = (data) => {

    setProfile((prev) => ({

      ...prev,

      ...data,

    }));

  };

  const resetProfile = () => {

    setProfile(defaultProfile);

  };

  return (

    <ProfileContext.Provider

      value={{

        profile,

        updateProfile,

        resetProfile,

      }}

    >

      {children}

    </ProfileContext.Provider>

  );

}

export const useProfile = () =>
  useContext(ProfileContext);