import { FaPen } from "react-icons/fa";
import { useProfile } from "../../context/ProfileContext";
import { useModal } from "../../context/ModalContext";

export default function PersonalInformation() {

  const { profile } = useProfile();
  const { openModal } = useModal();

  return (

    <div className="bg-white rounded-3xl shadow border p-8">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-2xl font-bold">

          Personal Information

        </h2>

        <button
          onClick={() => openModal("profile")}
          className="flex items-center gap-2 bg-[#0B6B57] text-white px-5 py-2 rounded-xl hover:bg-[#095544] transition"
        >

          <FaPen />

          Edit

        </button>

      </div>

      <div className="space-y-6">

        <Info
          title="Full Name"
          value={profile.name}
        />

        <Info
          title="Email"
          value={profile.email}
        />

        <Info
          title="Phone"
          value={profile.phone}
        />

        <Info
          title="Monthly Income"
          value={`₹${Number(profile.monthlyIncome).toLocaleString()}`}
        />

        <Info
          title="Savings Goal"
          value={`₹${Number(profile.savingsGoal).toLocaleString()}`}
        />

      </div>

    </div>

  );

}

function Info({ title, value }) {

  return (

    <div>

      <p className="text-sm text-gray-500">

        {title}

      </p>

      <h3 className="text-lg font-semibold mt-1">

        {value}

      </h3>

    </div>

  );

}