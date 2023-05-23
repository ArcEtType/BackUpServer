import mongoose from 'mongoose';
import User from "../models/Product.js";
import Product from '../models/Product.js';



export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().select("-password");
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
};

  /* READ */
export const getProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Product.findById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
};

/* CREATE */
export const createProduct = async (req, res) => {

   try {
        const{

            Designation,
            Taille,
            Couleur,
            Famille,
            Type,
            NeufOccasion,
            Garantie,
            PointDeVente,
            Stock,
            Quantite,
            VenteHT,
            TauxTVA,
            VenteTTC,

        } = req.body;
   
const saveProduct = await Product.create(
    {
            Designation,
            Taille,
            Couleur,
            Famille,
            Type,
            NeufOccasion,
            Garantie,
            PointDeVente,
            Stock,
            Quantite,
            VenteHT,
            TauxTVA,
            VenteTTC,
    }
);
    
res.status(201).json(saveProduct);
} catch (err) {
  res.status(500).json({ error: err.message });
}
};

/* UPDATE */

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId))
      return res.status(400).send("Invalid user ID: " + productId);

    const { 
        Designation,
        Taille,
        Couleur,
        Famille,
        Type,
        NeufOccasion,
        Garantie,
        PointDeVente,
        Stock,
        Quantite,
        VenteHT,
        TauxTVA,
        VenteTTC, 
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(productId, { 
      
        Designation,
        Taille,
        Couleur,
        Famille,
        Type,
        NeufOccasion,
        Garantie,
        PointDeVente,
        Stock,
        Quantite,
        VenteHT,
        TauxTVA,
        VenteTTC, 

     }, { new: true });

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found." });

    res.status(200).json(updatedProduct);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
  
/* DELETE */

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId))
      return res.status(400).send("Invalid user ID: " + productId);

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found." });

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Error: Mismatched product ID." });
  }
};