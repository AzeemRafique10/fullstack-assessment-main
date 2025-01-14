import React from "react";

const CardUI = ({ industry, companies }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{industry}</h2>
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
          {companies.length}
        </span>
      </div>
      <ul className="mt-2">
        {companies.map((company, index) => (
          <li
            key={company.id || `${company.name}-${index}`}
            className="text-gray-700"
          >
            {company.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardUI;
