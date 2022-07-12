import { useState } from "react";
import { useDepartments } from "../../hooks";
import { InfoForm } from "../info-form/InfoForm";
import { Modal } from "../modal/Modal";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [detailsMap, setDetailsMap] = useState({});
  const [searchCriteria, setSearchCriteria] = useState("name");
  const { companyDepartments } = useDepartments();

  const employees = companyDepartments
    .reduce((acc, curr) => {
      return [...acc, ...curr.teams.map(team => [team.teamLead, ...team.members]), curr.head];
    }, [])
    .flat()
    .filter(employee => employee[searchCriteria].toLowerCase().includes(searchQuery));

  return (
    <div className="w-max p-2 ml-4 bg-slate-300 rounded-md relative flex flex-col items-center gap-2">
      <input
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="focus:outline-none p-2 rounded-md"
        type="search"
        placeholder="Search"
      />
      <label>
        <span>Search By:</span>
        <select
          className="focus:outline-none rounded-md"
          value={searchCriteria}
          onChange={e => setSearchCriteria(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="phone">Phone Number</option>
        </select>
      </label>
      {searchQuery ? (
        <div className="absolute z-10 top-14 bg-slate-300 rounded-md text-center w-full flex flex-col gap-2 p-2">
          {employees.length ? (
            employees.map(employee => (
              <>
                <p
                  key={employee.id}
                  onClick={() => {
                    setDetailsMap({ [employee.id]: true });
                    setShowModal(true);
                  }}
                  className="text-lg cursor-pointer border-2 rounded-md border-slate-200"
                >
                  {employee.name}
                </p>
                {detailsMap[employee.id] ? (
                  <Modal showModal={showModal}>
                    <InfoForm
                      setShowModal={setShowModal}
                      info={employee}
                      teamName={employee?.teamName}
                      departmentName={employee?.role.split(" ")[0]}
                      isDisplayingInfo={true}
                    />
                  </Modal>
                ) : null}
              </>
            ))
          ) : (
            <p className="text-lg">No results found</p>
          )}
        </div>
      ) : null}
    </div>
  );
};
export { SearchBar };
