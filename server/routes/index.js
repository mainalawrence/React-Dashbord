import {Router} from 'express';
import clientRoutes from "./client.js";
import generalRoutes from "./general.js";
import managementRoutes from "./management.js";
import salesRoutes from "./sales.js";
import router from './Auth.js';
import products from './ProductRoute.js';

const app=Router();

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/auth",router);
app.use("/products",products);

export default app;