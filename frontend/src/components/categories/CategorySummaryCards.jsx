import {
  FaLayerGroup,
  FaIcons,
  FaPalette,
  FaAlignLeft,
} from "react-icons/fa";

import {
  useCategory,
} from "../../context/CategoryContext";

export default function CategorySummaryCards() {
  const {
    categories,
  } = useCategory();

  const totalCategories =
    categories.length;

  const categoriesWithIcons =
    categories.filter(
      item =>
        Boolean(
          item.icon?.trim()
        )
    ).length;

  const categoriesWithColors =
    categories.filter(
      item =>
        Boolean(
          item.color?.trim()
        )
    ).length;

  const categoriesWithDescriptions =
    categories.filter(
      item =>
        Boolean(
          item.description?.trim()
        )
    ).length;

  const cards = [
    {
      title:
        "Total Categories",

      value:
        totalCategories,

      subtitle:
        "Available categories",

      icon:
        <FaLayerGroup />,

      color:
        "bg-blue-500",

      bg:
        "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      title:
        "With Icons",

      value:
        categoriesWithIcons,

      subtitle:
        "Customized icons",

      icon:
        <FaIcons />,

      color:
        "bg-purple-500",

      bg:
        "bg-purple-50 dark:bg-purple-950/20",
    },
    {
      title:
        "With Colors",

      value:
        categoriesWithColors,

      subtitle:
        "Color coded",

      icon:
        <FaPalette />,

      color:
        "bg-orange-500",

      bg:
        "bg-orange-50 dark:bg-orange-950/20",
    },
    {
      title:
        "Descriptions",

      value:
        categoriesWithDescriptions,

      subtitle:
        "Categories explained",

      icon:
        <FaAlignLeft />,

      color:
        "bg-green-500",

      bg:
        "bg-green-50 dark:bg-green-950/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:gap-6">

      {cards.map(
        card => (
          <div
            key={
              card.title
            }
            className={`
              ${card.bg}
              rounded-3xl
              border
              border-slate-100
              p-6
              transition
              hover:-translate-y-1
              hover:shadow-lg
              dark:border-slate-800
            `}
          >

            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-800 dark:text-white">
                  {card.value}
                </h2>

                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  {card.subtitle}
                </p>

              </div>

              <div
                className={`
                  ${card.color}
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  text-xl
                  text-white
                `}
              >
                {card.icon}
              </div>

            </div>

          </div>
        )
      )}

    </div>
  );
}