import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: [true, "Ein Name ist nötig"] },
    rating: { type: Number, required: [true, "Ein Rating ist nötig"] },
    comment: { type: String, required: [true, "Ein Kommentar ist nötig"] },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Ein Name ist nötig"],
    },
    image: {
      type: String,
      required: [true, "Ein Bild ist nötig"],
    },
    brand: {
      type: String,
      required: [true, "Eine Marke ist nötig"],
    },
    category: {
      type: String,
      required: [true, "Eine Kategorie ist nötig"],
    },
    desc: {
      type: String,
      required: [true, "Eine Beschreibung ist nötig"],
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.plugin(aggregatePaginate);

const Product = mongoose.model("Product", productSchema);
export default Product;
