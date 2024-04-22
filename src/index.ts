import express from "express";

import { cartRouter } from "./routes/carts.routes.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import { productsRouter } from "./routes/products.routes.js";

const PORT = 8000;
const app = express();
app.use(express.json());

app.use('/api', authMiddleware)
app.use('/api/products', productsRouter);
app.use('/api/profile/cart', cartRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${ PORT }/`);
})