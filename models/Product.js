import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    CodeArticle: String,
    Designation: String,
    Taille: Number,
    Couleur: String,
    Famille: String,
    Type: String,
    NeufOccasion: Boolean,
    Garantie: String,
    PointDeVente: String,
    Stock: Number,
    AchatMoyen: Number,
    VenteHT: Number,
    TauxTVA: String,
    VenteTTC: Number,
    DerniereModification: Date,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
