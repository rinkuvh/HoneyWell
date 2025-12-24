import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useQueryParams = (fetchData) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Convert searchParams to a plain object
  const queryObject = Object.fromEntries(searchParams.entries());

  // Update params safely (auto-stringify + remove empty values)
  const updateQueryParams = (newParams) => {
    const mergedParams = {
        ...queryObject,
        ...newParams,
    };

    // Remove null, undefined, or empty string values
    const cleanedParams = Object.fromEntries(
      Object.entries(mergedParams).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
    );

    setSearchParams(cleanedParams);
  };

  const handlePageChange = (e, newPage) => {
    updateQueryParams({ page: newPage + 1 });
  };

  const handleRowsPerPageChange = (e) => {
    updateQueryParams({ limit: e.target.value, page: 1 });
  };
  const handleResetQueryParams = () => {
    setSearchParams({})
  }
  useEffect(()=>{
    fetchData();
  }, [searchParams.toString()])
  return {
    query: queryObject,
    updateQueryParams,
    setSearchParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleResetQueryParams
  };
};
