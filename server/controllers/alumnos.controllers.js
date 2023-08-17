import { prisma } from "../db.js";
import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

export const crearAlumno = async (req, res) => {
  const createdAlumno = await prisma.alumnos.create({
    data: req.body,
  });

  res.json(createdAlumno);
};

export const obtenerAlumnos = async (req, res) => {
  const alumnos = await prisma.alumnos.findFirst({
    where: {
      id_alumno: 1,
    },
  });

  res.json(alumnos);
};

export const obtenerAlumno = async (req, res) => {
  const alumno = await prisma.alumnos.findFirst({
    where: {
      id_alumno: parseInt(req.params.id),
    },
  });

  res.json(alumno);
};

export const actualizarAlumno = async (req, res) => {
  try {
    const updateAlumno = await prisma.alumnos.update({
      where: {
        id_alumno: parseInt(req.params.id),
      },
      data: req.body,
    });

    res.json(updateAlumno);
  } catch (error) {
    console.log(error);
  }
};

export const subirArchivo = async (req, res) => {
  try {
    const archivos = {};

    if (req.files.length !== 0) {
      archivos.certificadoSecundaria = req.files[0].path;
      archivos.actaNacimiento = req.files[1].path;
      archivos.curpArchivo = req.files[2].path;
      archivos.altaIMSS = req.files[3].path;
      archivos.formatoFM3 = req.files[4] ? req.files[4].path : "";

      await prisma.alumnos.update({
        where: {
          id_alumno: parseInt(req.params.id),
        },
        data: archivos,
      });
    }
    console.log("Todo bien");
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};
