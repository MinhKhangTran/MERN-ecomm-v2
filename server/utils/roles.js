import AccessControl from "accesscontrol";

let grantsObject = {
  admin: {
    profile: {
      "read:any": ["*"],
      "delete:any": ["*"],
      "update:any": ["*"],
    },
    products: {
      "create:any": ["*"],
    },
  },
  benutzer: {
    profile: {
      "update:own": ["*"],
    },
  },
};
export const roles = new AccessControl(grantsObject);
