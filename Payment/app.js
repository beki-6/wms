require("dotenv").config();
const express = require("express");
const controllers = require("./apiControllers");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/verify/:id", controllers.verifyPayment);
app.use(
  "/api/pay",
  controllers.postTransactionData,
  controllers.verifyPayment,
  controllers.success
);
app.use("/api/success", controllers.success);
app.use("/api/transfer", controllers.initiateTransfer);

app.listen(process.env.PORT, () => {
  console.log("Server running...");
});
