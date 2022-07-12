import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useDepartments } from "../../hooks";

const defaultInfo = {
  teamName: "",
  teamLead: { id: uuid(), name: "", email: "", phone: "" },
  members: [],
};

const TeamForm = ({ info = defaultInfo, isDisplayingInfo, setShowModal, departmentName }) => {
  const [teamInfo, setTeamInfo] = useState(info);
  const [isUpdating, setIsUpdating] = useState(false);

  const { addNewTeam, updateTeamInfo } = useDepartments();

  const {
    teamName,
    teamLead: { name, email, phone },
  } = teamInfo;

  const changeHandler = e => {
    const { name, value } = e.target;
    setTeamInfo(prevInfo => {
      if (name === "teamName") {
        return { ...prevInfo, [name]: value };
      }
      return { ...prevInfo, teamLead: { ...teamInfo.teamLead, [name]: value } };
    });
  };

  const closeModal = e => {
    e.preventDefault();
    setShowModal(false);
    setTeamInfo(info);
  };

  const handleAdd = e => {
    e.preventDefault();
    addNewTeam(departmentName, {
      ...teamInfo,
      teamLead: { ...teamInfo.teamLead, role: `${departmentName} Team Lead` },
    });
    setShowModal(false);
  };

  const enableEdit = e => {
    e.preventDefault();
    setIsUpdating(prevState => !prevState);
  };

  const handleUpdate = e => {
    e.preventDefault();
    updateTeamInfo(departmentName, teamInfo);
    setShowModal(false);
  };
  const disableBtn = () => {
    return !(name !== "" && email !== "" && phone !== "" && teamName !== "");
  };
  return (
    <form className="bg-neutral-100 p-4 rounded-md flex flex-col gap-2">
      {isDisplayingInfo ? (
        <button className="bg-blue-400 p-2 rounded-md" onClick={enableEdit}>
          Edit
        </button>
      ) : null}
      <input
        value={teamName}
        name="teamName"
        readOnly={isUpdating ? false : isDisplayingInfo}
        onChange={changeHandler}
        className="focus:outline-none p-2 rounded-md read-only:bg-neutral-100 read-only:border-2 read-only:border-neutral-300"
        type="text"
        placeholder="Team Name"
      />
      {!isDisplayingInfo ? (
        <>
          <h1 className="text-2xl text-center">Team Lead Info</h1>
          <input
            value={name}
            name="name"
            readOnly={isUpdating ? false : isDisplayingInfo}
            onChange={changeHandler}
            className="focus:outline-none p-2 rounded-md "
            type="text"
            placeholder="Name"
          />
          <input
            value={email}
            name="email"
            readOnly={isUpdating ? false : isDisplayingInfo}
            onChange={changeHandler}
            className="focus:outline-none p-2 rounded-md"
            type="text"
            placeholder="Email"
          />
          <input
            value={phone}
            name="phone"
            readOnly={isUpdating ? false : isDisplayingInfo}
            onChange={changeHandler}
            className="focus:outline-none p-2 rounded-md"
            type="text"
            placeholder="Phone"
          />
        </>
      ) : null}
      <div className="flex justify-center gap-2">
        <button onClick={closeModal} className="bg-neutral-200 p-2 rounded-md">
          {isDisplayingInfo ? "Close" : "Discard"}
        </button>
        {isDisplayingInfo ? (
          isUpdating ? (
            <button
              disabled={disableBtn()}
              onClick={handleUpdate}
              className="bg-blue-400 p-2 rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              Update
            </button>
          ) : null
        ) : (
          <button
            disabled={disableBtn()}
            onClick={handleAdd}
            className="bg-blue-400 p-2 rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            Add Team
          </button>
        )}
      </div>
    </form>
  );
};

export { TeamForm };
