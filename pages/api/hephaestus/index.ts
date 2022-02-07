import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const filePath = path.resolve("art.png");
const imageBuffer = fs.readFileSync(filePath);

const API = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const pr = req.body;
    console.log(pr);

    const b64 = Buffer.from(imageBuffer).toString("base64");
    res.send(`data:image/png;base64,${b64}`);
  } else if (req.method === "GET") {
      res.status(200).json({status: "ok"});
  }
};

export default API;
