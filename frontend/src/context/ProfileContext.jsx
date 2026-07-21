import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { useAuth } from "./AuthContext";
import userService from "../services/userService";


const ProfileContext = createContext(null);


const defaultProfile = {

    photo:"",
    firstName:"",
    lastName:"",
    name:"",
    email:"",
    phone:"",
    currency:"INR",
    language:"English",
    monthlyIncome:0,
    savingsGoal:0,
    financialHealth:82,

};


export function ProfileProvider({children}) {


    const {user} = useAuth();


    const [profile,setProfile] =
        useState(defaultProfile);


    const [loading,setLoading] =
        useState(false);



    useEffect(()=>{

        if(user){
            fetchProfile();
        }
        else{
            setProfile(defaultProfile);
        }

    },[user]);




    const fetchProfile = async()=>{

        try{

            setLoading(true);

            const data =
                await userService.getProfile();


            setProfile({

                photo:data.profileImage || "",

                firstName:data.firstName || "",

                lastName:data.lastName || "",

                name:
                `${data.firstName || ""} ${data.lastName || ""}`.trim(),

                email:data.email || "",

                phone:data.phoneNumber || "",

                currency:data.currency || "INR",

                language:data.language || "English",

                monthlyIncome:0,

                savingsGoal:0,

                financialHealth:82,

            });


        }
        catch(error){

            console.log(
                "Profile fetch error",
                error
            );

        }
        finally{

            setLoading(false);

        }

    };





    const updateProfile = async (data) => {

        const payload = {

            firstName: data.firstName || "",

            lastName: data.lastName || "",

            phoneNumber: data.phone || "",

            profileImage: data.photo || "",

            currency: data.currency || "INR",

            language: "English"

        };


        try {

            const updated =
                await userService.updateProfile(payload);


            setProfile({

                photo: updated.profileImage || "",

                firstName: updated.firstName || "",

                lastName: updated.lastName || "",

                name:
                    `${updated.firstName} ${updated.lastName}`.trim(),

                email: updated.email || "",

                phone: updated.phoneNumber || "",

                currency: updated.currency || "INR",

                language: updated.language || "English",

                monthlyIncome: profile.monthlyIncome,

                savingsGoal: profile.savingsGoal,

                financialHealth: profile.financialHealth

            });



            // IMPORTANT PART
            const oldUser =
                JSON.parse(
                    localStorage.getItem("pt_user")
                );


            const updatedUser = {

                ...oldUser,

                firstName: updated.firstName,

                lastName: updated.lastName,

                email: updated.email,

                phoneNumber: updated.phoneNumber,

                profileImage: updated.profileImage

            };


            localStorage.setItem(
                "pt_user",
                JSON.stringify(updatedUser)
            );


            return updated;


        }
        catch(error){

            console.error(
                "Profile update failed",
                error.response?.data || error
            );

            throw error;

        }

    };



    return (

        <ProfileContext.Provider

        value={{

            profile,

            updateProfile,

            loading,

            fetchProfile

        }}

        >

            {children}

        </ProfileContext.Provider>

    );

}



export const useProfile = () =>
useContext(ProfileContext);