import React from "react";
import useGroupedCompanies from "./hooks/useGroupedCompanies";
import CardUI from "./components/CardUI";
import IndustryCard from "./IndustryCard";

const App = () => {
  const apiUrl = "http://localhost:3000/api/companies"; // Replace with deployed API URL
  const groupedCompanies = useGroupedCompanies(apiUrl);

  if (Object.keys(groupedCompanies).length === 0) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <>
      {/* <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(groupedCompanies).map(([industry, companies]) => (
          <CardUI key={industry} industry={industry} companies={companies} />
        ))}
      </div> */}

      <IndustryCard />
    </>
  );
};

export default App;
