import { prisma } from "../db.js";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import cookieParser from "cookie-parser";

export const loginHandler = async (req, res) => {
  try {
    //usuario = CURP,  password = folio
    const { usuario, password } = req.body;
    const usuarioBuscado = await prisma.alumnos.findFirst({
      where: {
        folio_al: +password,
      },
    });
    let login = false;

    if (usuarioBuscado !== null) {
      const { folio_al } = usuarioBuscado;

      if (+password === folio_al) login = true;

      return res.json({ login: login, alumno: usuarioBuscado });
    }
    return res.status(200).json({ login: login });
  } catch (error) {
    console.log("Ocurrio un error", error);
  }
};
