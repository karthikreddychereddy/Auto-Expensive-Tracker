import {
  createContext,
  useContext,
  useState,
} from "react";


const SearchContext = createContext(null);



export function SearchProvider({ children }) {


  const [searchText, setSearchText] =
    useState("");



  return (

    <SearchContext.Provider

      value={{
        searchText,
        setSearchText,
      }}

    >

      {children}

    </SearchContext.Provider>

  );

}




export function useSearch(){

  return useContext(SearchContext);

}