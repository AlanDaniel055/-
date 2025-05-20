import { z } from "zod";

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        required_error: "Descripcion requerida",
        invalid_type_error: "Descripcion requerida",
      })
      .min(3, {
        message: "La descripcion es demasiado corta",
      })
  ),
  title: z.optional(
    z
      .string({
        required_error: "Titulo es requerido",
        invalid_type_error: "Titulo es requerido",
      })
      .min(3, {
        message: "Titulo demasiado corto",
      })
  ),
  id: z.string(),
});
