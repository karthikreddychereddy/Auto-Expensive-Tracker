export default function ConversationSection({

  title,
  children,

}) {

  return (

    <div className="mb-6">

      <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">

        {title}

      </h3>

      <div>

        {children}

      </div>

    </div>

  );

}