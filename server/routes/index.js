import {Router} from 'express';
import clientRoutes from "./client.js";
import generalRoutes from "./general.js";
import managementRoutes from "./management.js";
import salesRoutes from "./sales.js";
import router from './Auth.js';
import products from './ProductRoute.js';
import users from './users.js';
import customer from './customers.js';

const app=Router();

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/auth",router);
app.use("/products",products);
app.use("/users",users);
app.use("/customer",customer);

export default app;