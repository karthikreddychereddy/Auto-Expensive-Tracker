import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import insightService from "../services/insightService";
import { useAuth } from "./AuthContext";


const InsightContext = createContext(null);


export function InsightProvider({ children }) {


  const { user } = useAuth();



  const [insight, setInsight] = useState(null);

  const [categoryBreakdown, setCategoryBreakdown] =
    useState([]);

  const [monthlyTrend, setMonthlyTrend] =
    useState([]);

  const [weeklyExpense, setWeeklyExpense] =
    useState([]);

  const [recentTransactions, setRecentTransactions] =
    useState([]);



  const [loading, setLoading] =
    useState(false);




  const clearInsights = () => {

    setInsight(null);

    setCategoryBreakdown([]);

    setMonthlyTrend([]);

    setWeeklyExpense([]);

    setRecentTransactions([]);

  };




  const fetchInsights = useCallback(async () => {


    if (!user) {

      clearInsights();

      return;

    }



    try {


      setLoading(true);



      const [
        insightData,
        categoryData,
        monthlyData,
        weeklyData,
        recentData,

      ] = await Promise.all([


        insightService.getInsights(),

        insightService.getCategoryBreakdown(),

        insightService.getMonthlyTrend(),

        insightService.getWeeklyExpense(),

        insightService.getRecentTransactions(),


      ]);



      setInsight(insightData);

      setCategoryBreakdown(categoryData);

      setMonthlyTrend(monthlyData);

      setWeeklyExpense(weeklyData);

      setRecentTransactions(recentData);



    } catch(error) {


      console.error(
        "Insight Error:",
        error
      );


    } finally {


      setLoading(false);


    }


  },[user]);





  // Reload whenever user changes

  useEffect(() => {


    fetchInsights();


  },[
    user,
    fetchInsights
  ]);






  return (

    <InsightContext.Provider

      value={{

        insight,

        categoryBreakdown,

        monthlyTrend,

        weeklyExpense,

        recentTransactions,

        loading,

        fetchInsights,

      }}

    >

      {children}


    </InsightContext.Provider>

  );

}



export const useInsights = () =>
  useContext(InsightContext);