import { useContext } from "react";
import { v4 as uuid } from "uuid";
import { DepartmentContext } from "../context";

const useDepartments = () => {
  const { companyDepartments, setCompanyDepartments } = useContext(DepartmentContext);

  const updateLocalStorage = updatedInformation => {
    localStorage.setItem("departments", JSON.stringify(updatedInformation));
  };

  const addNewMember = (teamName, employeeInfo, departmentName) => {
    const updatedDepartments = companyDepartments.map(department =>
      department.departmentName === departmentName
        ? {
            ...department,
            teams: department.teams.map(team =>
              team.teamName === teamName
                ? {
                    ...team,
                    members: [
                      ...team.members,
                      {
                        id: uuid(),
                        teamName,
                        role: `${departmentName} Team Member`,
                        ...employeeInfo,
                      },
                    ],
                  }
                : team
            ),
          }
        : department
    );
    setCompanyDepartments(updatedDepartments);
    updateLocalStorage(updatedDepartments);
  };

  const updateInfo = (teamName, updatedInfo, departmentName, isTeamLead) => {
    const updatedDepartments = companyDepartments.map(department => {
      if (department.departmentName === departmentName) {
        return {
          ...department,
          teams: department.teams.map(team => {
            if (team.teamName === teamName) {
              if (isTeamLead) {
                return {
                  ...team,
                  teamLead: updatedInfo,
                };
              }
              return {
                ...team,
                members: team.members.map(member =>
                  member.id === updatedInfo.id ? updatedInfo : member
                ),
              };
            }
            return team;
          }),
        };
      }
      return department;
    });
    setCompanyDepartments(updatedDepartments);
    updateLocalStorage(updatedDepartments);
  };

  const changeTeam = (prevTeam, newTeam, departmentName, updatedInfo) => {
    const updatedDepartments = companyDepartments.map(department =>
      department.departmentName === departmentName
        ? {
            ...department,
            teams: department.teams.map(team => {
              if (team.teamName === prevTeam) {
                return {
                  ...team,
                  members: team.members.filter(member => member.id !== updatedInfo.id),
                };
              }
              if (team.teamName === newTeam) {
                return {
                  ...team,
                  members: [...team.members, updatedInfo],
                };
              }
              return team;
            }),
          }
        : department
    );
    setCompanyDepartments(updatedDepartments);
    updateLocalStorage(updatedDepartments);
  };

  const removeMember = (teamName, employeeId, departmentName) => {
    const updatedDepartments = companyDepartments.map(department =>
      department.departmentName === departmentName
        ? {
            ...department,
            teams: department.teams.map(team =>
              team.teamName === teamName
                ? {
                    ...team,
                    members: team.members.filter(member => member.id !== employeeId),
                  }
                : team
            ),
          }
        : department
    );
    setCompanyDepartments(updatedDepartments);
    updateLocalStorage(updatedDepartments);
  };

  const addNewTeam = (departmentName, newTeam) => {
    const updatedDepartments = companyDepartments.map(department =>
      department.departmentName === departmentName
        ? {
            ...department,
            teams: [...department.teams, newTeam],
          }
        : department
    );
    setCompanyDepartments(updatedDepartments);
    updateLocalStorage(updatedDepartments);
  };

  const updateTeamInfo = (departmentName, updatedTeamInfo) => {
    const updatedDepartments = companyDepartments.map(department =>
      department.departmentName === departmentName
        ? {
            ...department,
            teams: department.teams.map(team =>
              team.id === updatedTeamInfo.id ? updatedTeamInfo : team
            ),
          }
        : department
    );
    setCompanyDepartments(updatedDepartments);
    updateLocalStorage(updatedDepartments);
  };

  return {
    companyDepartments,
    setCompanyDepartments,
    addNewMember,
    updateInfo,
    changeTeam,
    removeMember,
    addNewTeam,
    updateTeamInfo,
  };
};

export { useDepartments };
