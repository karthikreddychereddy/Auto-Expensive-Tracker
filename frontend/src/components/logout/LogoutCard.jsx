import { FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LogoutCard() {

    const navigate = useNavigate();

    const { logout } = useAuth();

    return (

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 max-w-xl w-full">

            <div className="flex flex-col items-center">

                <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">

                    <FaSignOutAlt className="text-5xl text-red-600"/>

                </div>

                <h1 className="text-3xl font-bold mt-6">

                    Logout

                </h1>

                <p className="text-gray-500 text-center mt-4">

                    You're about to sign out from your account.

                </p>

                <div className="bg-slate-50 rounded-2xl p-5 mt-8 w-full">

                    <ul className="space-y-3 text-gray-600">

                        <li>• Your financial data remains safe.</li>

                        <li>• You can login again anytime.</li>

                        <li>• Any unsaved changes will be lost.</li>

                    </ul>

                </div>

                <div className="flex gap-5 mt-10">

                    <button

                        onClick={() => navigate(-1)}

                        className="px-6 py-3 rounded-xl border flex items-center gap-2 hover:bg-gray-100"

                    >

                        <FaArrowLeft />

                        Cancel

                    </button>

                    <button

                        onClick={logout}

                        className="px-8 py-3 rounded-xl bg-red-600 text-white flex items-center gap-2 hover:bg-red-700"

                    >

                        <FaSignOutAlt />

                        Logout

                    </button>

                </div>

            </div>

        </div>

    );

}