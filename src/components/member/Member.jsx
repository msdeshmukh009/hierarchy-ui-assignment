import { useState } from "react";
import { Modal } from "../modal/Modal";
import { InfoForm } from "../info-form/InfoForm";

const Member = ({ member, team, departmentName, isTeamLead }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <li onClick={() => setShowModal(true)}>
      <Modal showModal={showModal}>
        <InfoForm
          info={member}
          setShowModal={setShowModal}
          teamName={team.teamName}
          departmentName={departmentName}
          isDisplayingInfo={true}
          isTeamLead={isTeamLead}
        />
      </Modal>

      <div className="member">
        <span>{member.name}</span>
        <span>{member.role}</span>
      </div>
    </li>
  );
};

export { Member };
