import express from 'express'
import {
  createOrder,
  GetAllOrder,
  DeleteOrder,
  ShippingProduct,
  GetAllOrderPendding,
  GetAllOrderShipping,
  GetAllOrderPaid,
  PaidProduct,
  GetOrderPenddingByUser,
  GetOrderShippingByUser,
  GetOrderPaidByUser,
  GetAllOrderInAMonth,
  GetAllOrderPaypal,
  GetOrderPaypalByUser,
} from "../controllers/OrderController.js";
import { isAuth, isAdmin } from "../untils/until.js";

const OrderRouter = express.Router();

OrderRouter.post("/create", createOrder);
OrderRouter.put("/shipping/:id", ShippingProduct);
OrderRouter.put("/paid/:id", PaidProduct);

OrderRouter.get("/", GetAllOrder);
OrderRouter.get("/orderPaypal", GetAllOrderPaypal);
OrderRouter.get("/orderPendding", GetAllOrderPendding);
OrderRouter.get("/orderShipping", GetAllOrderShipping);
OrderRouter.get("/orderPaid", GetAllOrderPaid);

OrderRouter.get("/allOrderInAMonth", GetAllOrderInAMonth);

// --- user
OrderRouter.get("/:id", GetAllOrder);
OrderRouter.get("/orderPaypal/:id", GetOrderPaypalByUser);
OrderRouter.get("/orderPendding/:id", GetOrderPenddingByUser);
OrderRouter.get("/orderShipping/:id", GetOrderShippingByUser);
OrderRouter.get("/orderpaid/:id", GetOrderPaidByUser);


OrderRouter.delete('/delete/:id', DeleteOrder)

export default OrderRouter