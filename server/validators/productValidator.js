import { check } from "express-validator";

export const createProductAdminValidator = [
  check("name", "Ein Name ist nötig").notEmpty(),
  check("image", "Ein Bild ist nötig").notEmpty(),
  check("brand", "Eine Marke ist nötig").notEmpty(),
  check("desc", "Eine Beschreibung ist nötig").notEmpty(),
  check("category", "Eine Kategorie ist nötig").notEmpty(),
  check("price", "Ein Preis ist nötig").notEmpty().isInt({ min: 0 }),
];
