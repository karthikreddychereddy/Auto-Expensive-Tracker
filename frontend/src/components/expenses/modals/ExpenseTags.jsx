const tags = [
  "Family",
  "Business",
  "Education",
  "Travel",
  "Personal",
  "Health",
  "Emergency",
];

export default function ExpenseTags({
  selected,
  setSelected,
}) {

  const toggleTag = (tag) => {

    if (selected.includes(tag)) {

      setSelected(selected.filter((t) => t !== tag));

    } else {

      setSelected([...selected, tag]);

    }

  };

  return (

    <div>

      <label className="font-semibold">

        Tags

      </label>

      <div className="flex flex-wrap gap-3 mt-3">

        {tags.map((tag) => (

          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`px-4 py-2 rounded-full border transition ${
              selected.includes(tag)
                ? "bg-[#0B6B57] text-white border-[#0B6B57]"
                : "bg-white"
            }`}
          >
            {tag}
          </button>

        ))}

      </div>

    </div>

  );
}