import {
  useEffect,
  useRef,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  FaWallet,
} from "react-icons/fa";

import {
  FcGoogle,
} from "react-icons/fc";

import toast from "react-hot-toast";

import {
  useAuth,
} from "../context/AuthContext";

export default function OAuthSuccess() {
  const {
    completeGoogleLogin,
  } = useAuth();

  const navigate =
    useNavigate();

  const [
    searchParams,
  ] =
    useSearchParams();

  const handledRef =
    useRef(false);

  useEffect(() => {

    if (
      handledRef.current
    ) {
      return;
    }

    handledRef.current =
      true;

    const code =
      searchParams.get(
        "code"
      );

    if (!code) {

      toast.error(
        "Google login could not be completed."
      );

      navigate(
        "/login",
        {
          replace: true,
        }
      );

      return;
    }

    const finishLogin =
      async () => {

        try {

          const response =
            await completeGoogleLogin(
              code
            );

          toast.success(
            response?.message ||
              "Signed in with Google."
          );

          navigate(
            "/dashboard",
            {
              replace: true,
            }
          );

        } catch (error) {

          console.error(
            "Google login failed:",
            error
          );

          toast.error(
            error?.response?.data
              ?.message ||
              error?.response?.data
                ?.error ||
              error?.message ||
              "Google login failed."
          );

          navigate(
            "/login",
            {
              replace: true,
            }
          );
        }
      };

    finishLogin();

  }, [
    completeGoogleLogin,
    navigate,
    searchParams,
  ]);

  return (
    <div className="flex h-screen items-center justify-center bg-[#FBF7EB] p-6">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B6B57] text-2xl text-white">
          <FaWallet />
        </div>

        <div className="mx-auto mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <FcGoogle size={28} />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Signing you in
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Connecting your Google account
          securely to PaisaTrack.
        </p>

        <div className="mx-auto mt-6 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#0B6B57]" />

      </div>

    </div>
  );
}