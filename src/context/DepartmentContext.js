import { createContext, useEffect, useState } from "react";
import { company } from "../data";

const DepartmentContext = createContext();

const { departments } = company;

const DepartmentsProvider = ({ children }) => {
  const [companyDepartments, setCompanyDepartments] = useState(
    JSON.parse(localStorage.getItem("departments")) || departments
  );

  useEffect(() => {
    if (!localStorage.getItem("departments")) {
      localStorage.setItem("departments", JSON.stringify(departments));
    }
  }, []);

  return (
    <DepartmentContext.Provider value={{ companyDepartments, setCompanyDepartments }}>
      {children}
    </DepartmentContext.Provider>
  );
};

export { DepartmentContext, DepartmentsProvider };
