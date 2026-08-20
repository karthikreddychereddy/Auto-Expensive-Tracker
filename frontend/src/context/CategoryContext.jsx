import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  categoryService,
} from "../services/categoryService";

import {
  useAuth,
} from "./AuthContext";

const CategoryContext =
  createContext(null);

export function CategoryProvider({
  children,
}) {
  const {
    user,
  } = useAuth();

  const [
    categories,
    setCategories,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState(null);

  const [
    search,
    setSearch,
  ] = useState("");

  // ==========================================
  // FETCH CATEGORIES
  // ==========================================

  const fetchCategories =
    useCallback(async () => {
      if (!user) {
        setCategories([]);
        setLoading(false);
        setError(null);

        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data =
          await categoryService.list();

        setCategories(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {
        console.error(
          "Failed to load categories:",
          error
        );

        setCategories([]);

        setError(
          error?.response?.data
            ?.message ||
          "Failed to load categories."
        );

        toast.error(
          "Failed to load categories"
        );

      } finally {
        setLoading(false);
      }
    }, [user]);

  // ==========================================
  // USER CHANGE / LOGIN / LOGOUT
  // ==========================================

  useEffect(() => {
    if (user) {
      fetchCategories();
    } else {
      setCategories([]);
      setSearch("");
      setError(null);
    }
  }, [
    user,
    fetchCategories,
  ]);

  // ==========================================
  // ADD CATEGORY
  // ==========================================

  const addCategory =
    async payload => {
      try {
        const created =
          await categoryService.create(
            payload
          );

        setCategories(
          previous => [
            ...previous,
            created,
          ]
        );

        toast.success(
          "Category Added"
        );

        return created;

      } catch (error) {
        console.error(
          "Add category failed:",
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
          "Failed to add category"
        );

        throw error;
      }
    };

  // ==========================================
  // UPDATE CATEGORY
  // ==========================================

  const updateCategory =
    async (
      id,
      payload
    ) => {
      try {
        const updated =
          await categoryService.update(
            id,
            payload
          );

        setCategories(
          previous =>
            previous.map(
              item =>
                item.id === id
                  ? updated
                  : item
            )
        );

        toast.success(
          "Category Updated"
        );

        return updated;

      } catch (error) {
        console.error(
          "Update category failed:",
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
          "Failed to update category"
        );

        throw error;
      }
    };

  // ==========================================
  // DELETE CATEGORY
  // ==========================================

  const deleteCategory =
    async id => {
      try {
        await categoryService.remove(
          id
        );

        setCategories(
          previous =>
            previous.filter(
              item =>
                item.id !== id
            )
        );

        toast.success(
          "Category Deleted"
        );

      } catch (error) {
        console.error(
          "Delete category failed:",
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
          "Failed to delete category"
        );

        throw error;
      }
    };

  // ==========================================
  // FILTERED CATEGORIES
  // ==========================================

  const filteredCategories =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      if (!normalizedSearch) {
        return categories;
      }

      return categories.filter(
        item =>
          item.name
            ?.toLowerCase()
            .includes(
              normalizedSearch
            ) ||
          item.description
            ?.toLowerCase()
            .includes(
              normalizedSearch
            )
      );
    }, [
      categories,
      search,
    ]);

  // ==========================================
  // SUMMARY
  // ==========================================

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

  // ==========================================
  // PROVIDER
  // ==========================================

  return (
    <CategoryContext.Provider
      value={{
        loading,
        error,

        categories,
        filteredCategories,

        fetchCategories,

        addCategory,
        updateCategory,
        deleteCategory,

        search,
        setSearch,

        totalCategories,

        categoriesWithIcons,
        categoriesWithColors,
        categoriesWithDescriptions,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategory = () => {
  const context =
    useContext(
      CategoryContext
    );

  if (!context) {
    throw new Error(
      "useCategory must be used within CategoryProvider"
    );
  }

  return context;
};