import AccessControl from "accesscontrol";

let grantsObject = {
  admin: {
    profile: {
      "read:any": ["*"],
      "delete:any": ["*"],
    },
  },
  benutzer: {
    profile: {
      "update:own": ["*"],
    },
  },
};
export const roles = new AccessControl(grantsObject);
