import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();
export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin , setShowRecruiterLogin] = useState(false);
  // store jobs data into the state variable jobs -->
  // Function to fetch job data
  const fetchJob = async () => {
    setJobs(jobsData);
  };

  useEffect(() => {
    fetchJob();
  }, []);

  const value = {
    setSearchFilter,
    searchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
