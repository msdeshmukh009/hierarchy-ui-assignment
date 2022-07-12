import { Branch, SearchBar } from "../../components";
import { useDepartments } from "../../hooks";

const HierarchyUi = () => {
  const { companyDepartments } = useDepartments();

  return (
    <>
      <SearchBar />
      <div className="tree">
        <ul>
          <li>
            <div className="member">
              <span>CEO</span>
            </div>
            <ul>
              {companyDepartments.map(({ teams, departmentName, head }) => (
                <Branch
                  key={departmentName}
                  departmentName={departmentName}
                  teams={teams}
                  head={head}
                />
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export { HierarchyUi };
