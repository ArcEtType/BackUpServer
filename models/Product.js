import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    
    Designation: String,
    Taille: Number,
    Couleur: String,
    Famille: String,
    Type: String,
    NeufOccasion: {
      type: String,
      enum: ["neuf", "occasion"],
      default: "neuf",
    },
    Garantie: String,
    PointDeVente: {
      type: String,
      enum: ["St-Pierre", "St-Paul"],
      default: "St-Pierre",
    },
    Stock: Number,
    Quantite: Number,
    VenteHT: Number,
    TauxTVA: String,
    VenteTTC: Number,
    
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
