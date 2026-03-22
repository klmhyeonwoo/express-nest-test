import express from "express";

const app: express.Application = express();
const port: number = 8000;

// 전역
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is middleware");
  next();
});

// 로컬 ('/');
app.get("/", (req, res, next) => {
  console.log("this is / middleware");
  next();
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send({ name: "hyeonwoo" });
});

app.post(`/user/:id`, (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  res.send({ name: "hyeonwoo", id });
});

// 404에 대한 전역 미들 웨어
app.use((req, res, next) => {
  console.log("this is error middelware");
  res.send({ error: "404 Not Found Error " });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
