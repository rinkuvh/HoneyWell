import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useRef } from "react";

const usePaginationHook = (fetchData, setIndentRequest, defaultFilter = {}) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [firstFilter, setFirstFilter] = useState(
    defaultFilter?.firstFilter || ""
  );
  const [secondFilter, setSecondFilter] = useState(
    defaultFilter?.secondFilter || ""
  );
  const [thirdFilter, setThirdFilter] = useState(
    defaultFilter?.thirdFilter || ""
  );
  const [fourthFilter, setFourthFilter] = useState("");
  const searchInputRef = useRef(null);
  const handleSearch = debounce((value) => {
    setSearch(value);
    setIndentRequest([]);
    setPage(1);
    // fetchData(value, 1, rowsPerPage, tabValue, firstFilter);
  }, 800);

  const debouncedPageChange = debounce((newPage) => {
    setPage(newPage + 1);
    setIndentRequest([]);
    // fetchData(search, newPage + 1, rowsPerPage, tabValue, firstFilter);
  }, 800);

  const debouncedRowsPerPageChange = debounce((value) => {
    setRowsPerPage(value);
    setIndentRequest([]);
    setPage(1);
    // fetchData(search, 1, value, tabValue, firstFilter);
  }, 800);

  const debouncedTabChange = debounce((newValue) => {
    setTabValue(newValue);
    // fetchData(search, 1, rowsPerPage, newValue, firstFilter);
  }, 500);

  const handleFirstFilterDebounce = debounce((newValue) => {
    setFirstFilter(newValue);
    // fetchData(search, 1, rowsPerPage, tabValue, newValue);
  }, 500);

  const handleSecondFilterDebounce = debounce((newValue) => {
    setSecondFilter(newValue);
    // fetchData(search, 1, rowsPerPage, tabValue, firstFilter, newValue);
  }, 500);

  const handleThirdFilterDebounce = debounce((newValue) => {
    setThirdFilter(newValue);
    // fetchData(
    //   search,
    //   1,
    //   rowsPerPage,
    //   tabValue,
    //   firstFilter,
    //   secondFilter,
    //   newValue
    // );
  }, 500);

  const handleFourthFilterDebounce = debounce((newValue) => {
    setFourthFilter(newValue);
    // fetchData(
    //   search,
    //   1,
    //   rowsPerPage,
    //   tabValue,
    //   firstFilter,
    //   secondFilter,
    //   thirdFilter,
    //   newValue
    // );
  }, 500);

  const handleSearchChange = (e) => {
    if (e) {
      handleSearch(e.target.value.trim().toLowerCase());
    } else {
      handleSearch("");
    }
  };

  const handlePageChange = (e, newPage) => {
    debouncedPageChange(newPage);
  };

  const handleRowsPerPageChange = (e) => {
    debouncedRowsPerPageChange(e.target.value);
  };

  const handleTabChange = (event, newValue) => {
    debouncedTabChange(newValue);
  };

  const handleFirstFilter = (value) => {
    handleFirstFilterDebounce(value);
  };
  const handleSecondFilter = (value) => {
    handleSecondFilterDebounce(value);
  };
  const handleThirdFilter = (value) => {
    handleThirdFilterDebounce(value);
  };
  const handleFourthFilter = (value) => {
    handleFourthFilterDebounce(value);
  };

  const handleResetFilter = () => {
    setFirstFilter(defaultFilter?.firstFilter || "");
    setSecondFilter(defaultFilter?.secondFilter || "");
    setThirdFilter(defaultFilter?.thirdFilter || "");
    setFourthFilter("");
    setSearch("");
    if (searchInputRef?.current) {
      searchInputRef.current.value = "";
    }
    // fetchData("", 1, rowsPerPage, tabValue, "", "", "", "");
  };
  useEffect(() => {
    fetchData(
      search,
      page,
      rowsPerPage,
      tabValue,
      firstFilter,
      secondFilter,
      thirdFilter,
      fourthFilter
    );
  }, [
    search,
    page,
    rowsPerPage,
    tabValue,
    firstFilter,
    secondFilter,
    thirdFilter,
    fourthFilter,
  ]);

  return {
    page,
    tabValue,
    search,
    rowsPerPage,
    firstFilter,
    secondFilter,
    thirdFilter,
    setPage,
    setRowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    handleTabChange,
    handleSearchChange,
    handleFirstFilter,
    handleSecondFilter,
    handleThirdFilter,
    handleResetFilter,
    fourthFilter,
    handleFourthFilter,
    searchInputRef,
  };
};

export default usePaginationHook;
