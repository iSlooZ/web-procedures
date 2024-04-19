import * as z from "zod";

// Definir el esquema de Zod para el inicio de sesión
export const loginSchema = z.object({
  email: z.string().min(3).max(150), // Nombre de usuario debe tener entre 3 y 50 caracteres
  password: z.string().min(3).max(150), // Contraseña debe tener al menos 8 caracteres
});
