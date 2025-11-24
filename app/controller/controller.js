import { guardarAlumno,cargarAlumnos } from "../model/model";
import { logInfo, logError } from "../logger.js";

export async function validateData(matricula, nombre, semestre) {
  try{
    logInfo("Validando inputs..");
    if (!matricula.trim()) {
      return "La matrícula está vacía";
    }

    if (matricula.length !== 9) {
      return "La matrícula debe tener exactamente 9 caracteres";
    }

    if (!matricula.startsWith("A0")) {
      return "La matrícula debe iniciar con 'A0'";
    }

    if (!nombre.trim()) {
      return "El nombre está vacío";
    }

    if (!semestre.trim()) {
      return "El semestre está vacío";
    }
    logInfo("Validación exitosa");

    const result = await guardarAlumno({ matricula, nombre, semestre });

    if (result.success) {
      return "Alumno guardado con éxito";
    } else {
      return "Error al guardar en Supabase: " + result.error.message;
    }
  }
  catch(err){
    return "Error inesperado: " + err.message;
  }
}

export async function loadAlumnos(){
  try {
    const result = await cargarAlumnos();

    if (result.success) {
      return result.data;
    } else {
      return [];
    }

  } catch (err) {
    console.log("Error inesperado:", err);
    return [];
  }
}