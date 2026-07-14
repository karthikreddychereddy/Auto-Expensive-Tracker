import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import { initialIncome } from "../data/income";
import { incomeService } from "../services/expenseService";


const IncomeContext = createContext(null);


export function IncomeProvider({ children }) {


  const [income, setIncome] = useState(() => {

    const saved = localStorage.getItem("income");

    return saved
      ? JSON.parse(saved)
      : initialIncome;

  });



  // =========================
  // Fetch Income From Backend
  // =========================

  useEffect(() => {


    const fetchIncome = async () => {

      try {

        const data = await incomeService.list();


        const mapped = data.map((item) => ({

          id: item.id,

          amount: item.amount,

          category: item.category,

          source: item.source,

          description: item.description,

          incomeDate: item.incomeDate,

          transactionType: item.transactionType,

        }));


        setIncome(mapped);


      } catch (err) {

        console.error(
          "Failed to fetch income:",
          err
        );

      }

    };


    fetchIncome();


  }, []);





  // =========================
  // Search & Filters
  // =========================


  const [search, setSearch] = useState("");

  const [sourceFilter, setSourceFilter] = useState("All");

  const [dateFilter, setDateFilter] = useState("All");

  const [sortBy, setSortBy] = useState("newest");





  // =========================
  // Local Storage
  // =========================


  useEffect(() => {

    localStorage.setItem(
      "income",
      JSON.stringify(income)
    );

  }, [income]);





  // =========================
  // CRUD
  // =========================


  const addIncome = async (payload) => {

    try {


      const response =
        await incomeService.create(payload);



      const mappedIncome = {


        id: response.id,

        amount: response.amount,

        category: response.category,

        source: response.source,

        description: response.description,

        incomeDate: response.incomeDate,

        transactionType: response.transactionType,


      };



      setIncome((prev) => [

        mappedIncome,

        ...prev,

      ]);



      toast.success("Income Added");



      window.dispatchEvent(
        new Event("dashboard-update")
      );



    } catch (err) {


      console.error(
        "Add income error:",
        err.response?.data || err
      );


      toast.error(
        "Failed to add income"
      );


    }

  };





  const updateIncome = async (id, payload) => {


    try {


      const updated =
        await incomeService.update(
          id,
          payload
        );



      setIncome((prev) =>

        prev.map((item) =>

          item.id === id

          ? {

              id: updated.id,

              amount: updated.amount,

              category: updated.category,

              source: updated.source,

              description: updated.description,

              incomeDate: updated.incomeDate,

              transactionType: updated.transactionType,

            }

          : item

        )

      );



      toast.success(
        "Income Updated"
      );


    } catch (err) {


      console.error(err);


      toast.error(
        "Failed to update income"
      );


    }

  };





  const deleteIncome = async (id) => {


    try {


      await incomeService.remove(id);



      setIncome((prev) =>

        prev.filter(
          (item) => item.id !== id
        )

      );



      toast.success(
        "Income Deleted"
      );


    } catch (err) {


      console.error(err);


      toast.error(
        "Failed to delete income"
      );


    }

  };





  // =========================
  // Total Income
  // =========================


  const totalIncome = useMemo(() => {


    return income.reduce(

      (sum, item) =>

        sum + Number(item.amount || 0),

      0

    );


  }, [income]);





  // =========================
  // Filtered Income
  // =========================


  const filteredIncome = useMemo(() => {

    let filtered = income.filter((item) => {


      const searchText = search.toLowerCase();


      const matchesSearch =

        item.source
          ?.toLowerCase()
          .includes(searchText)

        ||

        item.category
          ?.toLowerCase()
          .includes(searchText)

        ||

        item.description
          ?.toLowerCase()
          .includes(searchText);



      const matchesSource =

        sourceFilter === "All"

          ? true

          : item.source === sourceFilter;



      let matchesDate = true;



      if(item.incomeDate){


        const itemDate =
          new Date(item.incomeDate);


        const today =
          new Date();



        if(dateFilter === "Today") {


          matchesDate =

            itemDate.toDateString()

            ===

            today.toDateString();


        }


        else if(dateFilter === "This Month"){


          matchesDate =

            itemDate.getMonth()
            ===
            today.getMonth()

            &&

            itemDate.getFullYear()
            ===
            today.getFullYear();


        }


        else if(dateFilter === "Last Month"){


          const lastMonth =
            new Date();


          lastMonth.setMonth(
            today.getMonth() - 1
          );


          matchesDate =

            itemDate.getMonth()
            ===
            lastMonth.getMonth()

            &&

            itemDate.getFullYear()
            ===
            lastMonth.getFullYear();


        }


        else if(dateFilter === "This Week"){


          const diff =

            (today - itemDate)

            /

            (1000 * 60 * 60 * 24);



          matchesDate =

            diff >= 0 && diff <= 7;


        }


      }



      return (

        matchesSearch

        &&

        matchesSource

        &&

        matchesDate

      );


    });



    filtered.sort((a,b)=>{


      switch(sortBy){


        case "oldest":

          return (

            new Date(a.incomeDate)

            -

            new Date(b.incomeDate)

          );



        case "highest":

          return (

            Number(b.amount)

            -

            Number(a.amount)

          );



        case "lowest":

          return (

            Number(a.amount)

            -

            Number(b.amount)

          );



        default:

          return (

            new Date(b.incomeDate)

            -

            new Date(a.incomeDate)

          );


      }


    });



    return filtered;


  },[
    income,
    search,
    sourceFilter,
    dateFilter,
    sortBy
  ]);

  return (

    <IncomeContext.Provider

      value={{

        income,

        filteredIncome,


        addIncome,

        updateIncome,

        deleteIncome,


        totalIncome,


        search,

        setSearch,


        sourceFilter,

        setSourceFilter,


        dateFilter,

        setDateFilter,


        sortBy,

        setSortBy,


      }}

    >

      {children}


    </IncomeContext.Provider>


  );


}




export const useIncome = () =>
  useContext(IncomeContext);