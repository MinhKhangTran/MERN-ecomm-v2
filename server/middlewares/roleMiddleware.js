import { roles } from "../utils/roles.js";

export const grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res
          .status(400)
          .json({ msg: "Diese Option ist nicht für dich gedacht!" });
      }
      //   console.log(permission);
      res.locals.permission = permission;
      next();
    } catch (error) {
      next(error);
    }
  };
};
