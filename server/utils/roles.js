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
      "delete:any": ["*"],
      "update:any": ["*"],
    },
    orders: {
      "read:any": ["*"],
    },
  },
  benutzer: {
    profile: {
      "update:own": ["*"],
    },
    orders: {
      "read:own": ["*"],
    },
  },
};
export const roles = new AccessControl(grantsObject);
