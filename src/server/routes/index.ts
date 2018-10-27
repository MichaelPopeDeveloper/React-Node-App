import * as express from "express";
const router = express.Router();

export const IndexRoute = router
  .get('/', (req, res) => {
    res.send("HomePage!")
  })
  .get('/page1', (req, res) => {
    res.send("page1");
  });
