import { check } from "express-validator";

export const createOrderValidator = [
  //   check("orderItems").exists(),
  //   check("orderItems.*.name", "name nötig").exists(),
  // Shipping Address
  check("shipingAddress.address", "Eine Addresse ist nötig").notEmpty(),
  check("shipingAddress.city", "Eine Stadt ist nötig").notEmpty(),
  check("shipingAddress.plz", "Eine Postleitzahl ist nötig").notEmpty(),
  check("shipingAddress.country", "Ein Lad ist nötig").notEmpty(),

  check("paymentMethod", "Eine Methode ist nötig").notEmpty(),
  check("totalPrice", "Ein Preis ist nötig").notEmpty().isInt({ min: 0 }),
];
export const updateProductAdminValidator = [
  check("name", "Ein Name ist nötig").notEmpty(),
  check("image", "Ein Bild ist nötig").notEmpty(),
  check("brand", "Eine Marke ist nötig").notEmpty(),
  check("desc", "Eine Beschreibung ist nötig").notEmpty(),
  check("category", "Eine Kategorie ist nötig").notEmpty(),
  check("price", "Ein Preis ist nötig").notEmpty().isInt({ min: 0 }),
  check("countInStock", "Ein Count in Stock ist nötig")
    .notEmpty()
    .isInt({ min: 0 }),
  check("rating", "Ein Rating ist nötig").notEmpty().isInt({ min: 0, max: 5 }),
];
export const reviewValidator = [
  check("rating", "Ein Rating ist nötig").notEmpty().isInt({ min: 0, max: 5 }),
  check("comment", "Ein Kommentar ist nötig").notEmpty(),
];
