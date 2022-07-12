import { useState } from "react";
import { Modal } from "../modal/Modal";
import { InfoForm } from "../info-form/InfoForm";
import { Member } from "../member/Member";
import { TeamForm } from "../team-form/TeamForm";

const Team = ({ team, departmentName }) => {
  const [showModal, setShowModal] = useState(false);
  const [showTeamInfoModal, setShowTeamInfoModal] = useState(false);

  return (
    <li>
      <Modal showModal={showModal}>
        <InfoForm
          setShowModal={setShowModal}
          teamName={team.teamName}
          departmentName={departmentName}
        />
      </Modal>

      <Modal showModal={showTeamInfoModal}>
        <TeamForm
          setShowModal={setShowTeamInfoModal}
          teamName={team.teamName}
          departmentName={departmentName}
          isDisplayingInfo={true}
          info={team}
        />
      </Modal>

      <div className="member" onClick={() => setShowTeamInfoModal(true)}>
        <span>{team.teamName}</span>
      </div>

      <ul>
        <Member
          member={team.teamLead}
          team={team}
          departmentName={departmentName}
          isTeamLead={true}
        />

        {team.members.map(member => (
          <Member
            key={member.id}
            member={member}
            team={team}
            departmentName={departmentName}
            isTeamLead={false}
          />
        ))}

        <li onClick={() => setShowModal(prevState => !prevState)}>
          <div className="member">
            <span>Add +</span>
          </div>
        </li>
      </ul>
    </li>
  );
};

export { Team };
