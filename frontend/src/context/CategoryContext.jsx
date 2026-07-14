import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import { categoryService } from "../services/categoryService";


const CategoryContext = createContext(null);


export function CategoryProvider({ children }) {


  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);


  const [search, setSearch] = useState("");


  // Temporary compatibility
  const [typeFilter] = useState("All");

  const setTypeFilter = () => {};



  // ==========================
  // Fetch Categories
  // ==========================

  const fetchCategories = async () => {

    try {

      setLoading(true);

      const data = await categoryService.list();

      setCategories(data);


    } catch (error) {

      console.error(error);

      toast.error("Failed to load categories");

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchCategories();

  }, []);




  // ==========================
  // CRUD
  // ==========================


  const addCategory = async (payload) => {

    try {

      const created =
        await categoryService.create(payload);


      setCategories(prev => [

        created,

        ...prev,

      ]);


      toast.success("Category Added");


    } catch(error) {

      console.error(error);

      toast.error("Failed to add category");

    }

  };



  const updateCategory = async (id, payload) => {

    try {


      const updated =
        await categoryService.update(id,payload);


      setCategories(prev =>

        prev.map(item =>

          item.id === id

            ? updated

            : item

        )

      );


      toast.success("Category Updated");


    } catch(error) {

      console.error(error);

      toast.error("Failed to update category");

    }

  };




  const deleteCategory = async (id) => {

    try {


      await categoryService.remove(id);


      setCategories(prev =>

        prev.filter(item =>

          item.id !== id

        )

      );


      toast.success("Category Deleted");


    } catch(error) {

      console.error(error);

      toast.error("Failed to delete category");

    }

  };





  // ==========================
  // Filters
  // ==========================


  const filteredCategories = useMemo(() => {


    return categories.filter(item => {


      const matchesSearch =

        item.name

          ?.toLowerCase()

          .includes(search.toLowerCase());


      return matchesSearch;


    });


  },[

    categories,

    search,

  ]);





  // ==========================
  // Summary
  // ==========================


  const totalCategories =
    categories.length;


  // Compatibility values
  const incomeCategories = 0;

  const expenseCategories = categories.length;




  return (

    <CategoryContext.Provider

      value={{


        loading,


        categories,

        filteredCategories,


        fetchCategories,


        addCategory,

        updateCategory,

        deleteCategory,



        search,

        setSearch,


        typeFilter,

        setTypeFilter,


        totalCategories,

        incomeCategories,

        expenseCategories,


      }}

    >

      {children}

    </CategoryContext.Provider>

  );

}



export const useCategory = () =>
  useContext(CategoryContext);