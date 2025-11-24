import { supabase } from "../lib/supabase";
import { logInfo, logError } from "../logger.js";

export async function guardarAlumno({nombre,matricula,semestre}) {
  try {
    logInfo("Insertando alumno en Supabase");
    const { data, error } = await supabase
      .from("alumnos")
      .insert([
        {
          matricula: matricula,
          nombre: nombre,
          semestre: semestre
        }
      ]);

    if (error) {
      logError("Error al insertar alumno", error);
      return { success: false, error };
    }

    logInfo("Alumno insertado correctamente");
    return { success: true, data };

  } catch (err) {

    logError("Excepción en guardarAlumno", err);
    return { success: false, error: err };

  }
}

export const cargarAlumnos = async () => {
  try {
    logInfo("Cargando alumnos de Supabase");
    const { data, error } = await supabase.from("alumnos").select("*");

    if (error) {
      logError("Error al cargar alumnos de Supabase");
      return { success: false, error };
    }

     logInfo("Alumnos cargados exitosamente");
    return { success: true, data };

  } catch (err) {
    return { success: false, error: err };
  }
};