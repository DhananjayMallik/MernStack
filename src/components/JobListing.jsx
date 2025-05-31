import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets.js";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false); // Changed to false for mobile-first approach
  const [currentPage, setCurrentPage] = useState(1); // manage pagination

  /* category and location saved this state variable --> */
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);

  {
    /* Stored filter data like job data*/
  } 
  const [filterJobs, setFilteredJobs] = useState(jobs);

  /* when any search of those field then only filter out my relevant */
  const handleCategoryChange = (category) => {
    setSelectedCategory(
      // if selected category is there then only remove previous category and add new selected category --->
      (prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(
      // if selected location is there then only remove previous location and add new selected location --->
      (prev) =>
        prev.includes(location)
          ? prev.filter((c) => c !== location)
          : [...prev, location]
    );
  };

  /* Searching result when i search in my input field and also category and location based search--> */
  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategory.length === 0 || selectedCategory.includes(job.category);
    const matchesLocation = (job) =>
      selectedLocation.length === 0 || selectedLocation.includes(job.location);
    const machesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase()); // if title exist
    const machesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase()); // if location exist

    // contains filtered job data -->
    const newFilterJob = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          machesTitle(job) &&
          machesSearchLocation(job)
      );

    setFilteredJobs(newFilterJob); // save filter data
    setCurrentPage(1);
  }, [jobs, selectedCategory, selectedLocation, searchFilter]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">
      {/* sidebar */}
      <div className="lg:w-1/4 bg-white rounded-lg">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="lg:hidden w-full flex justify-between items-center px-4 py-3 bg-gray-100 rounded-lg mb-4"
        >
          <span className="font-medium">
            {showFilter ? "Hide Filters" : "Show Filters"}
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${
              showFilter ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Filter content */}
        <div
          className={`${showFilter ? "block" : "hidden"} lg:block space-y-6`}
        >
          {/* search filter from hero components */}
          {isSearched &&
            (searchFilter.title != "" || searchFilter.location != "") && (
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-3">Current Search</h3>
                <div className="flex flex-wrap gap-2">
                  {searchFilter.title && (
                    <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-sm">
                      {searchFilter.title}
                      <button
                        onClick={() =>
                          setSearchFilter((prev) => ({ ...prev, title: "" }))
                        }
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  )}
                  {searchFilter.location && (
                    <span className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-1 rounded-full text-sm">
                      {searchFilter.location}
                      <button
                        onClick={() =>
                          setSearchFilter((prev) => ({ ...prev, location: "" }))
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}

          {/* category filter */}
          <div className="mb-6">
            <h4 className="font-medium text-lg mb-3">Search By Categories</h4>
            <ul className="space-y-3">
              {JobCategories.map((category, index) => (
                <li className="flex items-center" key={index}>
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange(category)}
                    checked={selectedCategory.includes(category)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`category-${index}`}
                    className="ml-3 text-gray-600"
                  >
                    {category}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* location filter */}
          <div className="mb-6">
            <h4 className="font-medium text-lg mb-3">Search By Location</h4>
            <ul className="space-y-3">
              {JobLocations.map((location, index) => (
                <li className="flex items-center" key={index}>
                  <input
                    onChange={() => handleLocationChange(location)}
                    checked={selectedLocation.includes(location)}
                    type="checkbox"
                    id={`location-${index}`}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`location-${index}`}
                    className="ml-3 text-gray-600"
                  >
                    {location}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Job listings */}
      <section className="lg:w-3/4">
        <h3 className="font-medium text-2xl sm:text-3xl mb-2">Latest Jobs</h3>
        <p className="text-gray-600 mb-6">
          Get your desired job from top companies
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filterJobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>

        {/*Pagination */}
        {filterJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-3 mt-10">
            <a href="#job-list">
              <img
                onClick={() => setCurrentPage(Math.max(currentPage - 1), 1)}
                src={assets.left_arrow_icon}
                alt=""
              />
            </a>
            {Array.from({ length: Math.ceil(filterJobs.length / 6) }).map(
              (_, index) => (
                <a key={index} href="#job-list">
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-200 text-blue-600 "
                        : "text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </button>
                </a>
              )
            )}
            <a href="#job-list">
              <img
                onClick={() =>
                  setCurrentPage(
                    Math.min(currentPage + 1),
                    Math.ceil(filterJobs.length / 6)
                  )
                }
                src={assets.right_arrow_icon}
                alt=""
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
