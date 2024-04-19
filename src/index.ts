import express from "express";
import { productsRouter } from "./routes/products.routes";
import { cartRouter } from "./routes/carts.routes";
import { authMiddleware } from "./middlewares/auth.middleware";

const PORT = 8000;
const app = express();
app.use(express.json());

app.use('/api', authMiddleware)
app.use('/api/products', productsRouter);
app.use('/api/profile/cart', cartRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${ PORT }/`);
})