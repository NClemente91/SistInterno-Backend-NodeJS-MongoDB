require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const dbConnection = require("./configs/mongodb");
const routeAuth = require("./routes/auth.routes");
const routeUsers = require("./routes/users.routes");
const routeClothes = require("./routes/clothes.routes");
const routeError = require("./routes/error.routes");
const { validateToken } = require("./middleware/validate-auth");

const app = express();

dbConnection();

app.use(cors());

app.use(express.json());

app.use(morgan("tiny"));

app.use("/auth", routeAuth);
app.use("/users", validateToken, routeUsers);
app.use("/clothes", validateToken, routeClothes);
app.use("*", routeError);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
