// import { useEffect, useState } from "react";

// const useGroupedCompanies = (apiUrl) => {
//   const [groupedData, setGroupedData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//           throw new Error(`Error: ${response.statusText}`);
//         }
//         const companies = await response.json();
//         const grouped = companies.reduce((acc, company) => {
//           const industry = company.industry || "Unknown";
//           if (!acc[industry]) acc[industry] = [];
//           acc[industry].push(company);
//           return acc;
//         }, {});
//         Object.keys(grouped).forEach(
//           (key) =>
//             (grouped[key] = grouped[key].sort((a, b) =>
//               a.name.localeCompare(b.name)
//             ))
//         );
//         setGroupedData(grouped);
//       } catch (error) {
//         console.error("Failed to fetch companies data:", error);
//       }
//     };

//     fetchData();
//   }, [apiUrl]);

//   return groupedData;
// };

// export default useGroupedCompanies;
