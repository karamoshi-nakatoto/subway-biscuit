import express from "express";
import { promises as fs } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { modifyResponse } from "./modifyResponse.js";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const app = express();

const port = process.env.PORT || 8080;

app.use(
  express.static("assets", {
    // Don't send the index because we need to modify it first
    index: false,
  })
);

app.get("/", async (req, res) => {
  const file = await fs.readFile(
    join(projectRoot, "assets/index.html"),
    "utf-8"
  );

  const modifiedResponse = modifyResponse(file);

  res.end(modifiedResponse);
});

app.listen(port, () => console.log(`Listening on ${port}`));
