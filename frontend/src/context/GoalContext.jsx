import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import { goalService } from "../services/goalService";
import { useAuth } from "./AuthContext";


const GoalContext = createContext(null);


export function GoalProvider({ children }) {


  const { user } = useAuth();


  const [goals, setGoals] = useState([]);

  const [goalProgress, setGoalProgress] = useState(null);


  const [search, setSearch] = useState("");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");



  // ==========================
  // Load Goals
  // ==========================


  const loadGoals = async () => {


    if (!user) {

      setGoals([]);

      return;

    }


    try {


      const data =
        await goalService.getAll();



      const formatted = data.map(item => ({


        id: item.id,


        title: item.goalName,


        targetAmount:
          Number(item.targetAmount || 0),


        savedAmount:
          Number(item.savedAmount || 0),


        deadline:
          item.targetDate,


        status:
          item.status === "COMPLETED"
            ? "Completed"
            : "Active",


        progress:
          item.progress,


        remainingAmount:
          item.remainingAmount,


      }));


      setGoals(formatted);



    } catch(error) {


      console.log(
        "LOAD GOALS ERROR:",
        error.response?.data || error.message
      );


      toast.error(
        "Failed to load goals"
      );


    }


  };





  // ==========================
  // Load Progress
  // ==========================


  const loadProgress = async () => {


    if (!user) {

      setGoalProgress(null);

      return;

    }


    try {


      const data =
        await goalService.getProgress();


      setGoalProgress(data);



    } catch(error) {


      console.log(
        "LOAD PROGRESS ERROR:",
        error.response?.data || error.message
      );


    }


  };





  // Reload on user change

  useEffect(() => {


    if(user){

      loadGoals();

      loadProgress();

    }
    else{

      setGoals([]);

      setGoalProgress(null);

    }


  },[user]);





  // ==========================
  // CRUD
  // ==========================


  const addGoal = async (payload) => {


    try {


      await goalService.create({

        goalName: payload.goalName,

        targetAmount: payload.targetAmount,

        savedAmount: payload.savedAmount,

        targetDate: payload.targetDate,

      });



      toast.success(
        "Goal Added"
      );



      await loadGoals();

      await loadProgress();



      window.dispatchEvent(
        new Event("dashboard-update")
      );


    } catch(error) {


      console.log(
        "ADD GOAL ERROR:",
        error.response?.data || error.message
      );


      toast.error(
        "Failed to add goal"
      );


    }


  };





  const updateGoal = async (id,payload) => {


    try {


      await goalService.update(id,{

        goalName: payload.goalName,

        targetAmount: payload.targetAmount,

        savedAmount: payload.savedAmount,

        targetDate: payload.targetDate,

      });



      toast.success(
        "Goal Updated"
      );



      await loadGoals();

      await loadProgress();



    } catch(error) {


      console.log(error);

      toast.error(
        "Failed to update goal"
      );


    }


  };





  const deleteGoal = async(id)=>{


    try {


      await goalService.delete(id);



      toast.success(
        "Goal Deleted"
      );



      await loadGoals();

      await loadProgress();



    } catch(error) {


      console.log(error);

      toast.error(
        "Failed to delete goal"
      );


    }


  };





  // ==========================
  // Summary
  // ==========================


  const totalGoals = goals.length;


  const activeGoals =
    goals.filter(
      item => item.status === "Active"
    ).length;


  const completedGoals =
    goals.filter(
      item => item.status === "Completed"
    ).length;





  const overallProgress = useMemo(()=>{


    if(
      goalProgress &&
      goalProgress.progress !== undefined
    ){

      return Number(goalProgress.progress);

    }



    const target =
      goals.reduce(
        (sum,item)=>
          sum + Number(item.targetAmount || 0),
        0
      );



    const saved =
      goals.reduce(
        (sum,item)=>
          sum + Number(item.savedAmount || 0),
        0
      );



    if(target === 0)

      return 0;



    return (saved / target) * 100;



  },[goals,goalProgress]);





  const filteredGoals = useMemo(()=>{


    return goals.filter(item=>{


      const matchesSearch =
        item.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );



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

        goalProgress,


        search,

        setSearch,


        priorityFilter,

        setPriorityFilter,


        statusFilter,

        setStatusFilter,


        loadGoals,

        loadProgress,


      }}

    >

      {children}


    </GoalContext.Provider>

  );


}



export const useGoal = () =>
  useContext(GoalContext);