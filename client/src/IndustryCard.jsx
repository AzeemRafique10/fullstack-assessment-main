import React, { useEffect, useState } from "react";
import axios from "axios";

const IndustryCard = () => {
  const [companiesData, setCompaniesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIndustryId, setExpandedIndustryId] = useState(null);

  // Fetch companies data
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/companies");
        console.log("Fetched Companies Data:", response.data);
        setCompaniesData(response.data.items || []);
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
      const industries = company.industries || [];
      industries.forEach((industry) => {
        if (!acc[industry.id]) {
          acc[industry.id] = {
            industryName: industry.name,
            industryLogo: industry.logo || null,
            companies: [],
          };
        }
        acc[industry.id].companies.push(company);
      });
      return acc;
    }, {});
  };

  // Sort companies alphabetically by name
  const sortByName = (companies) =>
    companies.sort((a, b) => a.name.localeCompare(b.name));

  // Group and sort the companies
  const categorizedCompanies = groupByIndustry(companiesData);
  const sortedCategorizedCompanies = Object.keys(categorizedCompanies).reduce(
    (acc, industryId) => {
      acc[industryId] = {
        industryName: categorizedCompanies[industryId].industryName,
        industryLogo: categorizedCompanies[industryId].industryLogo,
        companies: sortByName(categorizedCompanies[industryId].companies),
      };
      return acc;
    },
    {}
  );

  // Toggle expanded industry sections
  const toggleIndustryExpand = (industryId) => {
    setExpandedIndustryId((prev) => (prev === industryId ? null : industryId));
  };

  return (
    <div className="bg-gray-50 flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg w-auto p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Industries</h2>

        {Object.keys(sortedCategorizedCompanies).map((industryId) => (
          <div
            key={industryId}
            className="bg-white shadow-md rounded-lg w-96 mb-4 p-5"
          >
            {/* Industry Header */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleIndustryExpand(industryId)}
            >
              <div className="flex items-center gap-3">
                {sortedCategorizedCompanies[industryId].industryLogo && (
                  <img
                    src={sortedCategorizedCompanies[industryId].industryLogo}
                    alt={sortedCategorizedCompanies[industryId].industryName}
                    className="w-8 h-8 rounded-md object-cover"
                  />
                )}
                <h2 className="text-lg font-semibold text-gray-800">
                  {sortedCategorizedCompanies[industryId].industryName}
                </h2>
              </div>
              <span className="text-gray-500 text-sm font-medium">
                {sortedCategorizedCompanies[industryId].companies.length}
              </span>
            </div>

            {/* Table of Companies */}
            {expandedIndustryId === industryId && (
              <table className="w-full mt-4">
                <thead>
                  <tr>
                    <th className="text-sm font-medium text-gray-500 text-left pb-2">
                      Name
                    </th>
                    <th className="text-sm font-medium text-gray-500 text-right pb-2">
                      Total Jobs
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedCategorizedCompanies[industryId].companies.map(
                    (company, index) => (
                      <tr
                        key={index}
                        className="border-t cursor-pointer"
                        onClick={() => console.log(`Company ID: ${company.id}`)}
                      >
                        <td className="flex items-center gap-3 py-3 text-black text-sm">
                          {company.logo ? (
                            <img
                              src={company.logo}
                              alt={company.name}
                              className="w-8 h-8 rounded-md object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-gray-200 rounded-md" />
                          )}
                          {company.name}
                        </td>
                        <td className="py-3 text-right text-gray-800 text-sm">
                          {company.total_jobs_available || 0}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryCard;
