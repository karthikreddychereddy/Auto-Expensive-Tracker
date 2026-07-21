import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
    FaCamera,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMoneyBillWave,
    FaPiggyBank,
    FaTimes,
    FaSave,
} from "react-icons/fa";


import { useProfile } from "../../context/ProfileContext";
import { useModal } from "../../context/ModalContext";



const resizeImage = (file) => {

    return new Promise((resolve)=>{


        const reader = new FileReader();


        reader.onload = (e)=>{


            const img = new Image();


            img.onload = ()=>{


                const canvas =
                    document.createElement("canvas");


                const size = 300;


                let width = img.width;
                let height = img.height;



                if(width > height){

                    height =
                        height * size / width;

                    width = size;

                }
                else{

                    width =
                        width * size / height;

                    height = size;

                }



                canvas.width = width;

                canvas.height = height;



                const ctx =
                    canvas.getContext("2d");



                ctx.drawImage(
                    img,
                    0,
                    0,
                    width,
                    height
                );



                resolve(

                    canvas.toDataURL(
                        "image/jpeg",
                        0.7
                    )

                );

            };


            img.src = e.target.result;

        };


        reader.readAsDataURL(file);


    });

};





export default function EditProfileModal(){


    const {
        profile,
        updateProfile
    }
    = useProfile();



    const {
        activeModal,
        closeModal
    }
    = useModal();




    const [form,setForm] =
        useState(profile);




    useEffect(()=>{

        setForm(profile);

    },[profile]);





    if(activeModal !== "profile")
        return null;





    const handleChange=(e)=>{


        const {
            name,
            value
        }
        = e.target;



        setForm(prev=>({

            ...prev,

            [name]:value

        }));

    };






    const handleImage = async(e)=>{


        const file =
            e.target.files[0];


        if(!file)
            return;



        const image =
            await resizeImage(file);



        setForm(prev=>({

            ...prev,

            photo:image

        }));

    };







    const handleSubmit = async(e)=>{


        e.preventDefault();


        try{


            await updateProfile(form);


            closeModal();


        }
        catch(error){


            console.log(error);


        }


    };






    return (


        <AnimatePresence>


            <motion.div

                initial={{
                    opacity:0
                }}

                animate={{
                    opacity:1
                }}

                exit={{
                    opacity:0
                }}

                className="
                    fixed
                    inset-0
                    z-50
                    flex
                    items-center
                    justify-center
                    bg-black/40
                "

            >



                <motion.div


                    initial={{
                        scale:.9,
                        y:30
                    }}

                    animate={{
                        scale:1,
                        y:0
                    }}

                    exit={{
                        scale:.9,
                        y:30
                    }}


                    className="
                        bg-white
                        rounded-3xl
                        w-[750px]
                        shadow-xl
                        overflow-hidden
                    "

                >



                    <div

                        className="
                            bg-gradient-to-r
                            from-[#0B6B57]
                            to-[#12A67D]
                            px-6
                            py-4
                            flex
                            justify-between
                            items-center
                        "

                    >


                        <div>

                            <h2 className="
                                text-xl
                                font-bold
                                text-white
                            ">

                                Edit Profile

                            </h2>


                            <p className="
                                text-white/80
                                text-sm
                            ">

                                Update your details

                            </p>


                        </div>



                        <button

                            onClick={closeModal}

                            className="
                                w-9
                                h-9
                                rounded-full
                                bg-white/20
                                text-white
                            "

                        >

                            <FaTimes/>

                        </button>


                    </div>







                    <form

                        onSubmit={handleSubmit}

                        className="
                            p-6
                        "

                    >




                        <div className="
                            flex
                            gap-8
                            items-start
                        ">



                            <div className="
                                flex
                                flex-col
                                items-center
                                w-40
                            ">


                                <div className="
                                    relative
                                ">


                                    <img


                                        src={

                                            form.photo ||

                                            `https://ui-avatars.com/api/?name=${form.firstName}`

                                        }


                                        className="
                                            w-24
                                            h-24
                                            rounded-full
                                            object-cover
                                            border-4
                                        "

                                    />



                                    <label

                                        className="
                                            absolute
                                            bottom-0
                                            right-0
                                            w-8
                                            h-8
                                            bg-[#0B6B57]
                                            text-white
                                            rounded-full
                                            flex
                                            items-center
                                            justify-center
                                            cursor-pointer
                                        "

                                    >


                                        <FaCamera size={14}/>



                                        <input

                                            hidden

                                            type="file"

                                            accept="image/*"

                                            onChange={handleImage}

                                        />


                                    </label>


                                </div>



                                <h3 className="
                                    mt-3
                                    font-bold
                                ">

                                    {form.firstName}

                                </h3>


                            </div>







                            <div className="
                                flex-1
                                grid
                                grid-cols-2
                                gap-4
                            ">


                                <Input

                                    icon={<FaUser/>}

                                    label="First Name"

                                    name="firstName"

                                    value={form.firstName || ""}

                                    onChange={handleChange}

                                />



                                <Input

                                    icon={<FaUser/>}

                                    label="Last Name"

                                    name="lastName"

                                    value={form.lastName || ""}

                                    onChange={handleChange}

                                />



                                <Input

                                    icon={<FaEnvelope/>}

                                    label="Email"

                                    value={form.email || ""}

                                    disabled

                                />



                                <Input

                                    icon={<FaPhone/>}

                                    label="Phone"

                                    name="phone"

                                    value={form.phone || ""}

                                    onChange={handleChange}

                                />



                            </div>


                        </div>






                        <div className="
                            flex
                            justify-end
                            gap-4
                            mt-6
                        ">


                            <button

                                type="button"

                                onClick={closeModal}

                                className="
                                    px-5
                                    py-2
                                    border
                                    rounded-xl
                                "

                            >

                                Cancel

                            </button>




                            <button

                                type="submit"

                                className="
                                    px-6
                                    py-2
                                    rounded-xl
                                    bg-[#0B6B57]
                                    text-white
                                    flex
                                    items-center
                                    gap-2
                                "

                            >

                                <FaSave/>

                                Save

                            </button>


                        </div>



                    </form>


                </motion.div>


            </motion.div>


        </AnimatePresence>


    );

}






function Input({

    icon,
    label,
    ...props

}){


    return (

        <div>


            <label className="
                text-xs
                font-semibold
            ">

                {label}

            </label>



            <div className="
                flex
                items-center
                gap-2
                border
                rounded-xl
                px-3
                py-2
                bg-gray-50
            ">


                <span className="
                    text-[#0B6B57]
                ">

                    {icon}

                </span>



                <input

                    {...props}

                    className="
                        w-full
                        outline-none
                        bg-transparent
                        text-sm
                    "

                />


            </div>


        </div>

    );

}