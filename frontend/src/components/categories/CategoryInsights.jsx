import {
  FaLightbulb,
  FaCheckCircle,
  FaIcons,
  FaPalette,
} from "react-icons/fa";

import {
  useCategory,
} from "../../context/CategoryContext";

export default function CategoryInsights() {
  const {
    categories,
  } = useCategory();

  const totalCategories =
    categories.length;

  const icons =
    categories.filter(
      item =>
        Boolean(
          item.icon?.trim()
        )
    ).length;

  const colors =
    categories.filter(
      item =>
        Boolean(
          item.color?.trim()
        )
    ).length;

  return (
    <div className="rounded-3xl bg-gradient-to-r from-[#0B6B57] to-[#0D8A6A] p-7 text-white shadow-lg">

      <div className="flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
          <FaLightbulb
            size={22}
          />
        </div>

        <div>

          <h2 className="text-2xl font-bold">
            Category Insights
          </h2>

          <p className="mt-1 text-sm text-white/70">
            Your category setup at a glance.
          </p>

        </div>

      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl bg-white/10 p-5">

          <FaCheckCircle />

          <p className="mt-4 text-sm text-white/75">
            Total Categories
          </p>

          <h3 className="mt-1 text-3xl font-bold">
            {totalCategories}
          </h3>

        </div>

        <div className="rounded-2xl bg-white/10 p-5">

          <FaIcons />

          <p className="mt-4 text-sm text-white/75">
            Custom Icons
          </p>

          <h3 className="mt-1 text-3xl font-bold">
            {icons}
          </h3>

        </div>

        <div className="rounded-2xl bg-white/10 p-5">

          <FaPalette />

          <p className="mt-4 text-sm text-white/75">
            Color Coded
          </p>

          <h3 className="mt-1 text-3xl font-bold">
            {colors}
          </h3>

        </div>

      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-4">

        <p className="text-sm leading-6 text-white/85">
          Categories created here are now shared with your expense and budget forms, keeping financial classification consistent throughout PaisaTrack.
        </p>

      </div>

    </div>
  );
}