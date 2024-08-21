import express from "express"
import bodyParser from "body-parser";
import router from "./src/routes/auth_routes.js"
import config from "./config.js"


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/v1", router);




app.listen(config.PORT, () => {
    console.log("start using server")
});
