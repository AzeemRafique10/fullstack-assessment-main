import React, { useEffect, useState } from "react";
import axios from "axios";

const IndustryCard = () => {
  const [companiesData, setCompaniesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch companies data
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/companies"); // Your API endpoint
        setCompaniesData(response.data); // Assuming response contains the companies' data
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch companies.");
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Group companies by industry
  const groupByIndustry = (companies) => {
    return companies.reduce((acc, company) => {
      const { industry } = company;
      if (!acc[industry]) {
        acc[industry] = [];
      }
      acc[industry].push(company);
      return acc;
    }, {});
  };

  // Sort companies alphabetically
  const sortByName = (companies) => {
    return companies.sort((a, b) => a.name.localeCompare(b.name));
  };

  const categorizedCompanies = groupByIndustry(companiesData);
  const sortedCategorizedCompanies = Object.keys(categorizedCompanies).reduce((acc, industry) => {
    acc[industry] = sortByName(categorizedCompanies[industry]);
    return acc;
  }, {});

  return (
    <div className="flex flex-wrap gap-6">
      {Object.keys(sortedCategorizedCompanies).map((industry) => (
        <div key={industry} className="bg-white shadow-md rounded-lg w-96 p-5">
          {/* Card header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">{industry}</h2>
            <span className="text-gray-500 text-sm font-medium">
              {sortedCategorizedCompanies[industry].length}
            </span>
          </div>

          {/* Table of companies */}
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-sm font-medium text-gray-500 text-left pb-2">Name</th>
                <th className="text-sm font-medium text-gray-500 text-right pb-2">Total jobs</th>
              </tr>
            </thead>
            <tbody>
              {sortedCategorizedCompanies[industry].map((company, index) => (
                <tr key={index} className="border-t">
                  <td className="flex items-center gap-3 py-3 text-black text-sm">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-8 h-8 rounded-md object-cover"
                    />
                    {company.name}
                  </td>
                  <td className="py-3 text-right text-gray-800 text-sm">{company.jobs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default IndustryCard;
