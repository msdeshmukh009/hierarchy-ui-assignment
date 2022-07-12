import { useState } from "react";
import { Modal } from "../modal/Modal";
import { TeamForm } from "../team-form/TeamForm";
import { Team } from "../team/Team";

const Branch = ({ departmentName, teams, head }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <li>
      <Modal showModal={showModal}>
        <TeamForm setShowModal={setShowModal} departmentName={departmentName} />
      </Modal>

      <div className="member">
        <span>
          Department: <span className="text-2xl">{departmentName}</span>
        </span>
        <span>
          {" "}
          Department head: <span className="text-2xl">{head.name}</span>
        </span>
      </div>

      <ul>
        {teams.map(team => (
          <Team key={team.id} team={team} departmentName={departmentName} />
        ))}

        <li onClick={() => setShowModal(true)}>
          <div className="member border-dotted">
            <span>Add+</span>
          </div>
        </li>
      </ul>
    </li>
  );
};

export { Branch };
