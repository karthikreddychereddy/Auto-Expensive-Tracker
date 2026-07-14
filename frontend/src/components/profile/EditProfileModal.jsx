import { useEffect, useState } from "react";
import { useProfile } from "../../context/ProfileContext";

export default function EditProfileModal({
  open,
  onClose,
}) {

  const {
    profile,
    updateProfile,
  } = useProfile();

  const [form, setForm] = useState(profile);

  useEffect(() => {

    setForm(profile);

  }, [profile]);

  if (!open) return null;

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "monthlyIncome" ||
        name === "savingsGoal" ||
        name === "financialHealth"
          ? Number(value)
          : value,
    }));

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    updateProfile(form);

    onClose();

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl w-full max-w-2xl p-8">

        <h2 className="text-3xl font-bold mb-8">

          Edit Profile

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="text-sm text-gray-500">

                Profile Photo URL

              </label>

              <input
                type="text"
                name="photo"
                value={form.photo}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl p-3"
              />

            </div>

            <div>

              <label className="text-sm text-gray-500">

                Name

              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl p-3"
              />

            </div>

            <div>

              <label className="text-sm text-gray-500">

                Email

              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl p-3"
              />

            </div>

            <div>

              <label className="text-sm text-gray-500">

                Phone

              </label>

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl p-3"
              />

            </div>

            <div>

              <label className="text-sm text-gray-500">

                Monthly Income

              </label>

              <input
                type="number"
                name="monthlyIncome"
                value={form.monthlyIncome}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl p-3"
              />

            </div>

            <div>

              <label className="text-sm text-gray-500">

                Savings Goal

              </label>

              <input
                type="number"
                name="savingsGoal"
                value={form.savingsGoal}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl p-3"
              />

            </div>

          </div>

          <div className="flex justify-end gap-4 pt-6">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#0B6B57] text-white hover:bg-[#095544]"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}