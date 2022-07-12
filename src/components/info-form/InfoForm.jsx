import { useMemo, useState } from "react";
import { useDepartments } from "../../hooks";
const defaultInfo = { name: "", email: "", phone: "" };

const InfoForm = ({
  info = defaultInfo,
  setShowModal,
  teamName,
  departmentName,
  isDisplayingInfo,
  isTeamLead,
}) => {
  const [employeeInfo, setEmployeeInfo] = useState(info);
  const [isUpdating, setIsUpdating] = useState(false);
  const { addNewMember, updateInfo, removeMember, companyDepartments, changeTeam } =
    useDepartments();
  const { name, email, phone } = employeeInfo;

  const closeModal = e => {
    e.preventDefault();
    e.stopPropagation();
    setEmployeeInfo(info);
    setShowModal(false);
  };

  const changeHandler = e => {
    const { name, value } = e.target;
    setEmployeeInfo({ ...employeeInfo, [name]: value });
  };

  const handleAdd = e => {
    e.preventDefault();
    addNewMember(teamName, employeeInfo, departmentName);
    setShowModal(false);
    setEmployeeInfo(defaultInfo);
  };

  const handleUpdate = e => {
    e.preventDefault();
    e.stopPropagation();

    if (teamName !== employeeInfo.teamName) {
      changeTeam(teamName, employeeInfo.teamName, departmentName, employeeInfo);
    } else {
      updateInfo(teamName, employeeInfo, departmentName, isTeamLead);
    }
    setShowModal(false);
    setIsUpdating(false);
  };

  const handleDelete = e => {
    e.preventDefault();
    e.stopPropagation();

    removeMember(teamName, employeeInfo.id, departmentName);

    setShowModal(false);
  };

  const respectiveTeams = useMemo(() => {
    return companyDepartments
      .find(department => department.departmentName === departmentName)
      ?.teams.map(team => team.teamName);
  }, [departmentName, companyDepartments]);

  const disableBtn = () => {
    return !(name !== "" && email !== "" && phone !== "");
  };

  return (
    <form className="bg-neutral-100 p-4 rounded-md flex flex-col gap-2">
      {isDisplayingInfo ? (
        <div className="flex gap-2 justify-center">
          <button onClick={handleDelete} title="Delete" className="bg-neutral-200 p-2 rounded-md">
            Delete
          </button>
          <button
            onClick={e => {
              e.preventDefault();
              setIsUpdating(prevState => !prevState);
            }}
            title="Edit"
            className="bg-blue-400 p-2 rounded-md"
          >
            Edit
          </button>
        </div>
      ) : null}

      <input
        value={name}
        name="name"
        readOnly={isUpdating ? false : isDisplayingInfo}
        onChange={changeHandler}
        className="focus:outline-none p-2 rounded-md read-only:bg-neutral-100 read-only:border-2 read-only:border-neutral-300"
        type="text"
        placeholder="Name"
      />
      <input
        value={email}
        name="email"
        readOnly={isUpdating ? false : isDisplayingInfo}
        onChange={changeHandler}
        className="focus:outline-none p-2 rounded-md read-only:bg-neutral-100 read-only:border-2 read-only:border-neutral-300"
        type="email"
        placeholder="Email"
      />
      <input
        value={phone}
        name="phone"
        readOnly={isUpdating ? false : isDisplayingInfo}
        onChange={changeHandler}
        className="focus:outline-none p-2 rounded-md read-only:bg-neutral-100 read-only:border-2 read-only:border-neutral-300"
        type="text"
        placeholder="Phone number"
      />
      {isUpdating && !isTeamLead ? (
        <select
          value={employeeInfo.teamName}
          className="focus:outline-none p-2 rounded-md"
          onChange={e => {
            setEmployeeInfo(prevInfo => ({ ...prevInfo, teamName: e.target.value }));
          }}
        >
          {respectiveTeams.map(team => (
            <option value={team}>{team}</option>
          ))}
        </select>
      ) : (
        <input
          className="focus:outline-none p-2 rounded-md read-only:bg-neutral-100 read-only:border-2 read-only:border-neutral-300"
          type="text"
          readOnly
          value={teamName}
        />
      )}
      <div className="flex gap-2 justify-center">
        <button onClick={closeModal} title="Discard" className="bg-neutral-200 p-2 rounded-md">
          {isDisplayingInfo ? "Close" : "Discard"}
        </button>

        {isUpdating && isDisplayingInfo ? (
          <button
            disabled={disableBtn()}
            onClick={handleUpdate}
            title="Update"
            className="bg-blue-400 p-2 rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            Update
          </button>
        ) : (
          <>
            {!isDisplayingInfo ? (
              <button
                disabled={disableBtn()}
                onClick={handleAdd}
                title="Add"
                className="bg-blue-400 p-2 rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                Add
              </button>
            ) : null}
          </>
        )}
      </div>
    </form>
  );
};

export { InfoForm };
