import express, { Request, Response } from "express";

import createJwt from "./utils/createjwt";
import chinookPlay from "./handlers/chinookPlay";
import chinookStop from "./handlers/chinookStop";

// Create a new instance of Express
const app = express();
app.use(express.json());

/**============================================
 *               chinook endpoints
 *=============================================**/

// Define a GET route handler
app.get("/api/chinook/hello", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

// Define a POST route handler
app.post("/api/chinook/play", chinookPlay);
// Define a POST route handler
app.post("/api/chinook/stop", chinookStop);

/**============================================
 *               northwind endpoints
 *=============================================**/

// Define a GET route handler
app.get("/api/northwind/hello", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

// Define a POST route handler
app.post("/api/northwind/users", (req: Request, res: Response) => {
  const { name, email } = req.body;
  res.status(201).send(`User ${name} with email ${email} was created`);
});

/**============================================
 *               utils
 *=============================================**/

app.post("/login", (req: Request, res: Response) => {
  console.log(req.body);
  const { userId } = req.body;
  const token = createJwt(userId);

  res.cookie("hasura-auth-token", token, { maxAge: 3600000 }); // 1 hour expiration

  res.send({ message: "Login successful with token " + token });
});

app.listen(5555, () => {
  console.log("Server started on port 5555");
});
