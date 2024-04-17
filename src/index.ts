import express from "express";
import { ordersRouter } from "routes/orders.routes";
import { productsRouter } from "routes/products.routes";
import { cartRouter } from "routes/carts.routes";

const PORT = 8000;
const app = express();
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('api/profile/cart', cartRouter);
app.use('api/profile/cart/checkout', ordersRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${ PORT }/`);
})