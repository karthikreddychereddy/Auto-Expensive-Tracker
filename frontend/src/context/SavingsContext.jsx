import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import { savingsService } from "../services/savingsService";
import { useAuth } from "./AuthContext";


const SavingsContext = createContext(null);


export function SavingsProvider({ children }) {


  const { user } = useAuth();


  const [savings, setSavings] = useState([]);

  const [loading, setLoading] = useState(true);



  // ==========================
  // Search & Filters
  // ==========================

  const [search, setSearch] = useState("");

  const [dateFilter, setDateFilter] =
    useState("All");


  // Temporary compatibility

  const [goalFilter] = useState("All");

  const setGoalFilter = () => {};



  // ==========================
  // Fetch Savings
  // ==========================


  const fetchSavings = async () => {


    if (!user) {

      setSavings([]);

      return;

    }


    try {


      setLoading(true);


      const data =
        await savingsService.list();


      setSavings(data);


    } catch(error) {


      console.error(error);


      toast.error(
        "Failed to load savings"
      );


    } finally {


      setLoading(false);


    }


  };




  // Reload on user change

  useEffect(() => {


    if(user){

      fetchSavings();

    }
    else{

      setSavings([]);

    }


  }, [user]);





  // ==========================
  // CRUD
  // ==========================


  const addSaving = async (payload) => {


    try {


      const created =
        await savingsService.create(payload);



      setSavings(prev => [

        created,

        ...prev,

      ]);



      toast.success(
        "Saving Added"
      );



      window.dispatchEvent(
        new Event("dashboard-update")
      );


    } catch(error) {


      console.error(error);


      toast.error(
        "Failed to add saving"
      );


    }


  };





  const updateSaving = async (id, payload) => {


    try {


      const updated =
        await savingsService.update(
          id,
          payload
        );



      setSavings(prev =>

        prev.map(item =>

          item.id === id

          ? updated

          : item

        )

      );



      toast.success(
        "Saving Updated"
      );



      window.dispatchEvent(
        new Event("dashboard-update")
      );


    } catch(error) {


      console.error(error);


      toast.error(
        "Failed to update saving"
      );


    }


  };





  const deleteSaving = async (id) => {


    try {


      await savingsService.remove(id);



      setSavings(prev =>

        prev.filter(item =>

          item.id !== id

        )

      );



      toast.success(
        "Saving Deleted"
      );



      window.dispatchEvent(
        new Event("dashboard-update")
      );


    } catch(error) {


      console.error(error);


      toast.error(
        "Failed to delete saving"
      );


    }


  };





  // ==========================
  // Totals
  // ==========================


  const totalSavings = useMemo(() => {


    return savings.reduce(

      (sum,item) =>

        sum + Number(item.amount || 0),

      0

    );


  },[savings]);



  const totalTarget = totalSavings;

  const remainingSavings = 0;

  const overallProgress = 100;





  // ==========================
  // Filters
  // ==========================


  const filteredSavings = useMemo(() => {


    return savings.filter(item => {


      const matchesSearch =

        item.source
          ?.toLowerCase()
          .includes(search.toLowerCase())

        ||

        item.description
          ?.toLowerCase()
          .includes(search.toLowerCase());



      let matchesDate = true;



      const today = new Date();

      const itemDate =
        new Date(item.savingDate);



      if(dateFilter === "Today") {


        matchesDate =
          item.savingDate ===
          today.toISOString()
          .slice(0,10);


      }


      else if(dateFilter === "This Month") {


        matchesDate =

          itemDate.getMonth()
          ===
          today.getMonth()

          &&

          itemDate.getFullYear()
          ===
          today.getFullYear();


      }



      return matchesSearch && matchesDate;


    });


  },[
    savings,
    search,
    dateFilter
  ]);





  return (

    <SavingsContext.Provider

      value={{

        loading,

        savings,

        filteredSavings,


        fetchSavings,


        addSaving,

        updateSaving,

        deleteSaving,


        totalSavings,


        search,

        setSearch,


        dateFilter,

        setDateFilter,


        goalFilter,

        setGoalFilter,


        totalTarget,

        remainingSavings,

        overallProgress,


      }}

    >

      {children}


    </SavingsContext.Provider>

  );


}



export const useSavings = () =>
  useContext(SavingsContext);