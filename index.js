import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js"




/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


/* ROUTES */
app.use("/user", userRoutes);
app.use("/product", productRoutes);

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const db = mongoose.connection;
    console.log('Connexion à la base de données réussie.');

    const collection = db.collection('users');
    

    /* SEULEMENT AJOUTER LES DONNÉES UNE FOIS */
    // collection.insertMany(dataAffiliateStat);
    // collection.insertMany(dataOverallStat);
    // collection.insertMany(dataProduct);
    // collection.insertMany(dataProductStat);
    // collection.insertMany(dataTransaction);
    // collection.insertMany(dataUser);

    app.listen(PORT, () => console.log(`Serveur en écoute sur le port : ${PORT}`));
  })
  .catch((error) => console.log(`${error} n'a pas pu se connecter à la base de données.`));
