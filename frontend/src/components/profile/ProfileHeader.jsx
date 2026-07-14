import { FaCamera } from "react-icons/fa";
import { useProfile } from "../../context/ProfileContext";
import { useModal } from "../../context/ModalContext";

export default function ProfileHeader() {

  const { profile } = useProfile();
  const { openModal } = useModal();

  return (

    <div className="bg-gradient-to-r from-[#0B6B57] to-[#12A67D] rounded-3xl shadow-lg p-8 text-white">

      <div className="flex items-center gap-6">

        <div className="relative">

          <img
            src={
              profile.photo ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                profile.name
              )}&background=0B6B57&color=fff&size=200`
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />

          <button
            onClick={() => openModal("profile")}
            className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-white text-[#0B6B57] flex items-center justify-center shadow hover:scale-110 transition"
          >
            <FaCamera />
          </button>

        </div>

        <div>

          <h1 className="text-4xl font-bold">

            {profile.name}

          </h1>

          <p className="mt-2 text-lg opacity-90">

            {profile.email}

          </p>

          <p className="opacity-75 mt-1">

            Smart Personal Finance Dashboard

          </p>

        </div>

      </div>

    </div>

  );

}