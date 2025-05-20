import { z } from "zod";

export const UpdateList = z.object({
  title: z
    .string({
      required_error: "Titulo es requerido",
      invalid_type_error: "Titulo es requerido",
    })
    .min(3, {
      message: "Tiulo demasiado corto",
    }),
  id: z.string(),
  boardId: z.string(),
});
