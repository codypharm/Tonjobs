import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import FormData from "form-data";
import fetch from "node-fetch";
import acceptedTaskRouter from "./routes/acccptedTaskRoute";
import jobRouter from "./routes/jobRoute";
import config from "./config";
import connectDB from "./db";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: false }));

// Enable Access-Control-Allow-Origin "*", bypassing CORS errors.
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.post("/authenticate", (req: Request, res: Response) => {
  const { code } = req.body;
  // console.log({ client_id, redirect_uri, client_secret, code });
  const data = new FormData();
  data.append("client_id", config.client_id);
  data.append("client_secret", config.client_secret);
  data.append("code", code);
  data.append("redirect_uri", config.redirect_uri);
  let access_token: string | null = null;

  // Request to exchange code for an access token
  fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    body: data,
  })
    .then((response) => response.text())
    .then((paramsString) => {
      let params = new URLSearchParams(paramsString);
      access_token = params.get("access_token");

      // Request to return data of a user that has been authenticated
      return fetch(`https://api.github.com/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      });
    })
    .then((response) => response.json())
    .then((response) => {
      if (access_token) {
        response["access_token"] = access_token;
      }
      console.log(response);
      return res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json(error);
    });
});

app.use("/api/v1/tasksacceptance", acceptedTaskRouter);
app.use("/api/v1/jobs", jobRouter);

app.get("/", (req: Request, res: Response) => {
  // Your root route logic here
});

const DB_URL: string = process.env.MONGO_URI || "";
console.log(DB_URL);

const PORT: number = parseInt(process.env.SERVER_PORT || "3000", 10);
connectDB();
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
