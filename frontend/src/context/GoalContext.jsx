import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import { goalService } from "../services/goalService";

const GoalContext = createContext(null);


export function GoalProvider({ children }) {


  const [goals, setGoals] = useState([]);


  const [search, setSearch] = useState("");

  const [priorityFilter, setPriorityFilter] = useState("All");

  const [statusFilter, setStatusFilter] = useState("All");



  // ===========================
  // Load Goals
  // ===========================

  const loadGoals = async () => {

    try {

      const data = await goalService.getAll();


      const formatted = data.map(item => ({

        id: item.id,

        title: item.goalName,

        targetAmount: item.targetAmount,

        savedAmount: item.savedAmount,

        deadline: item.targetDate,

        status:
          item.status === "COMPLETED"
            ? "Completed"
            : "Active",

        progress: item.progress,

        remainingAmount: item.remainingAmount,

      }));


      setGoals(formatted);


    } catch (error) {

      toast.error("Failed to load goals");

    }

  };



  useEffect(() => {

    loadGoals();

  }, []);




  // ===========================
  // CRUD
  // ===========================


  const addGoal = async (payload) => {


    try {


      await goalService.create({

        goalName: payload.title,

        targetAmount: payload.targetAmount,

        savedAmount: payload.savedAmount,

        targetDate: payload.deadline,

      });



      toast.success("Goal Added");

      loadGoals();

      window.dispatchEvent(
        new Event("dashboard-update")
      );


    } catch(error) {

      toast.error("Failed to add goal");

    }

  };





  const updateGoal = async (id, payload) => {


    try {


      await goalService.update(id, {


        goalName: payload.title,

        targetAmount: payload.targetAmount,

        savedAmount: payload.savedAmount,

        targetDate: payload.deadline,


      });



      toast.success("Goal Updated");

      loadGoals();


      window.dispatchEvent(
        new Event("dashboard-update")
      );


    } catch(error) {

      toast.error("Failed to update goal");

    }

  };






  const deleteGoal = async (id) => {


    try {


      await goalService.delete(id);



      toast.success("Goal Deleted");


      loadGoals();


      window.dispatchEvent(
        new Event("dashboard-update")
      );



    } catch(error) {


      toast.error("Failed to delete goal");


    }


  };




  // ===========================
  // Summary
  // ===========================


  const totalGoals = goals.length;



  const activeGoals = goals.filter(

    item => item.status === "Active"

  ).length;



  const completedGoals = goals.filter(

    item => item.status === "Completed"

  ).length;




  const overallProgress = useMemo(() => {


    const target = goals.reduce(

      (sum,item) =>

        sum + Number(item.targetAmount),

      0

    );


    const saved = goals.reduce(

      (sum,item) =>

        sum + Number(item.savedAmount),

      0

    );



    if(target === 0)

      return 0;



    return (saved / target) * 100;


  },[goals]);





  // ===========================
  // Filters
  // ===========================


  const filteredGoals = useMemo(() => {


    return goals.filter(item => {


      const matchesSearch =

        item.title

          ?.toLowerCase()

          .includes(search.toLowerCase());



      const matchesPriority =

        priorityFilter === "All"

          ? true

          : item.priority === priorityFilter;




      const matchesStatus =

        statusFilter === "All"

          ? true

          : item.status === statusFilter;




      return (

        matchesSearch &&

        matchesPriority &&

        matchesStatus

      );


    });


  },[

    goals,

    search,

    priorityFilter,

    statusFilter

  ]);





  return (


    <GoalContext.Provider


      value={{


        goals,

        filteredGoals,


        addGoal,

        updateGoal,

        deleteGoal,


        totalGoals,

        activeGoals,

        completedGoals,

        overallProgress,


        search,

        setSearch,


        priorityFilter,

        setPriorityFilter,


        statusFilter,

        setStatusFilter,


      }}


    >


      {children}


    </GoalContext.Provider>


  );


}



export const useGoal = () => useContext(GoalContext);