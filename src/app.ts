import { Cat, CatType } from "./app.model";
import express from "express";

const app: express.Application = express();
const port: number = 8000;

// * logging middleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is middleware");
  next();
});

// * json middleware
app.use(express.json());

// * READ 고양이 전체 데이터 다 조회
app.get("/cats", (req, res) => {
  try {
    const cats = Cat;
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

// * READ 특정 고양이 데이터 조회
app.get("/cats/:id", (req, res) => {
  try {
    const id = req.params.id;
    const target = Cat.find((cat) => {
      return cat.id === id;
    });
    res.status(200).send({
      success: true,
      data: {
        target,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

// * CREATE 새로운 고양이 추가
app.post("/cats", (req, res) => {
  try {
    const data = req.body;
    Cat.push(data);
    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

// * UPDATE 고양이 수정
app.patch("/cats/:id", (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = Cat.reduce((acc: CatType[], cur: CatType) => {
      if (cur.id === id) {
        acc.push(data);
      } else {
        acc.push(cur);
      }
      return acc;
    }, []);
    res.status(200).send({
      success: true,
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

app.delete("/cats/:id", (req, res) => {
  try {
    const id = req.params.id;
    const result = Cat.filter((cat) => cat.id !== id);
    res.status(200).send({
      success: true,
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

// * 404 middleware
app.use((req, res, next) => {
  console.log("this is error middelware");
  res.send({ error: "404 Not Found Error " });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
