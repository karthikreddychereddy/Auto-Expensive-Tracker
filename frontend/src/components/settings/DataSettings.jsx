import toast from "react-hot-toast";

export default function DataSettings() {

  const exportData=()=>{

    const data={

      expenses:JSON.parse(localStorage.getItem("expenses")||"[]"),

      income:JSON.parse(localStorage.getItem("income")||"[]"),

      budgets:JSON.parse(localStorage.getItem("categoryBudgets")||"{}"),

      savings:JSON.parse(localStorage.getItem("savings")||"[]"),

      goals:JSON.parse(localStorage.getItem("goals")||"[]"),

    };

    const blob=new Blob(

      [JSON.stringify(data,null,2)],

      {type:"application/json"}

    );

    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download="finance-data.json";

    a.click();

    toast.success("Export Complete");

  };

  const clearAll=()=>{

    if(!window.confirm("Delete all local data?")) return;

    localStorage.clear();

    toast.success("All Data Cleared");

    window.location.reload();

  };

  return(

    <div className="bg-white rounded-3xl border p-6">

      <h2 className="text-xl font-bold mb-6">

        Data

      </h2>

      <div className="flex gap-4">

        <button

          onClick={exportData}

          className="bg-[#0B6B57] text-white px-5 py-3 rounded-xl"

        >

          Export Data

        </button>

        <button

          onClick={clearAll}

          className="bg-red-600 text-white px-5 py-3 rounded-xl"

        >

          Clear Data

        </button>

      </div>

    </div>

  );

}