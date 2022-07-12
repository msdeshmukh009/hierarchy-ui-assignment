import { v4 as uuid } from "uuid";

export const company = {
  departments: [
    {
      departmentName: "HR",
      head: {
        name: "Maia Hayward",
        id: uuid(),
        phone: "6127940313",
        email: "maia@gmail.com",
        role: "HR Head",
        teamName: "HR Team 1",
      },
      teams: [
        {
          teamName: "HR Team 1",
          id: uuid(),
          teamLead: {
            name: "Melody Howe",
            id: uuid(),
            phone: "6120337946",
            email: "melody@gmail.com",
            role: "HR Team lead",
            teamName: "HR Team 1",
          },
          members: [
            {
              name: "Elsie Malone",
              id: uuid(),
              phone: "7319083122",
              email: "elsie@gmail.com",
              role: "HR Team Member",
              teamName: "HR Team 1",
            },
            {
              name: "Harley Sowle",
              id: uuid(),
              phone: "7477262335",
              email: "harley@gmail.com",
              role: "HR Team Member",
              teamName: "HR Team 1",
            },
          ],
        },
      ],
    },
    {
      departmentName: "Engineering",
      head: {
        name: "Maxine Parker",
        id: uuid(),
        phone: "6148064160",
        email: "maxine@gmail.com",
        role: "Engineering Head",
      },
      teams: [
        {
          teamName: "New Feature",
          id: uuid(),
          teamLead: {
            name: "Willa Delgado",
            id: uuid(),
            phone: "8917219699",
            email: "willa@gmail.com",
            role: "Engineering Team lead",
            teamName: "New Feature",
          },
          members: [
            {
              name: "Cary Ruiz",
              id: uuid(),
              phone: "6127975740",
              email: "cary@gmail.com",
              role: "Engineering Team Member",
              teamName: "New Feature",
            },
            {
              name: "Jewel Fox",
              id: uuid(),
              phone: "6749937464",
              email: "jewel@gmail.com",
              role: "Engineering Team Member",
              teamName: "New Feature",
            },
          ],
        },
      ],
    },
    {
      departmentName: "Design",
      head: {
        name: "Trista Buckley",
        id: uuid(),
        phone: "8066497813",
        email: "trista@gmail.com",
        role: "Design Head",
      },
      teams: [
        {
          teamName: "Cart Designer",
          id: uuid(),
          teamLead: {
            name: "Ivory Cantrell",
            id: uuid(),
            phone: "7979857148",
            email: "ivory@gmail.com",
            role: "Design Team lead",
            teamName: "Cart Designer",
          },
          members: [
            {
              name: "Bailey Holt",
              id: uuid(),
              phone: "6638766649",
              email: "bailey@gmail.com",
              role: "Design Team Member",
              teamName: "Cart Designer",
            },
            {
              name: "Alfred Hudson",
              id: uuid(),
              phone: "8848268242",
              email: "alfred@gmail.com",
              role: "Design Team Member",
              teamName: "Cart Designer",
            },
          ],
        },
      ],
    },
  ],
};
