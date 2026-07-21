import React from "react";
import {
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

export default function LogoutConfirmModal({
  onClose,
  onConfirm,
}) {


  return (

    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/40
      backdrop-blur-sm
      "
    >


      <div
        className="
        w-[400px]
        bg-white
        dark:bg-slate-800
        rounded-2xl
        shadow-xl
        p-6
        "
      >



        <div
          className="
          flex
          justify-between
          items-center
          mb-5
          "
        >

          <div
            className="
            flex
            items-center
            gap-3
            "
          >

            <div
              className="
              w-12
              h-12
              rounded-full
              bg-red-100
              flex
              items-center
              justify-center
              "
            >

              <FaSignOutAlt
                className="
                text-red-500
                text-xl
                "
              />

            </div>


            <h2
              className="
              text-lg
              font-semibold
              text-slate-800
              dark:text-white
              "
            >

              Logout

            </h2>

          </div>



          <button
            onClick={onClose}
          >

            <FaTimes />

          </button>


        </div>





        <p
          className="
          text-gray-600
          dark:text-gray-300
          "
        >

          Are you sure you want to logout?

        </p>



        <p
          className="
          text-sm
          text-gray-400
          mt-2
          "
        >

          Your data will remain safe.
          No information will be deleted.

        </p>






        <div
          className="
          flex
          justify-end
          gap-3
          mt-6
          "
        >


          <button

            onClick={onClose}

            className="
            px-5
            py-2
            rounded-lg
            bg-gray-200
            dark:bg-slate-700
            "

          >

            Cancel

          </button>




          <button

            onClick={onConfirm}

            className="
            px-5
            py-2
            rounded-lg
            bg-red-500
            text-white
            "

          >

            Logout

          </button>



        </div>



      </div>


    </div>

  );

}