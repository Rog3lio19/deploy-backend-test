import express from "express";
import cors from "cors";
import alumnosRoutes from "./routes/alumnos.routes.js";
import familiaresRoutes from "./routes/familiares.routes.js";
import loginRoutes from "./routes/login.routes.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { PORT } from "./config.js";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const mimetypes = ["image/jpeg", "image/png", "application/pdf"];

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const path = `uploads/${req.query.id}`;
      if (!fs.existsSync(path)) fs.mkdirSync(path);
      cb(null, path);
    },
    filename: (req, file, cb) => {
      const fileExtension = extname(file.originalname);
      const fileName = file.originalname.split(fileExtension)[0];

      cb(null, `${fileName}-${Date.now()}${fileExtension}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (mimetypes.includes(file.mimetype)) cb(null, true);
    else
      cb(
        new Error(
          `Solo este tipo de archivos son permitidos '${mimetypes.join(" ")}' `
        )
      );
  },
  limits: {
    fieldSize: 10000000,
  },
});

const app = express();

// const corsOptions = {
//   //Permite que se guarde la cookie con el jwt
//   origin: "http://localhost:3000",
//   credentials: true,
//   optionSuccessStatus: 200,
// };

app.use("/public", express.static(join(CURRENT_DIR, "../uploads/")));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.get("/", async (req, res) => {
  res.send("Hola mundo");
});
app.use("/api", multerUpload.array("file"), alumnosRoutes);
app.use("/api", familiaresRoutes);
app.use("/api", loginRoutes);

app.listen(PORT);
console.log("Server on port: ", PORT);
