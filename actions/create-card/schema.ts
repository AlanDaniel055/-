import { z } from "zod";

export const Schema = z.object({
  title: z
    .string({
      required_error: "Tiulo es requerido",
      invalid_type_error: "Titulo es requerido",
    })
    .min(3, {
      message: "Titulo demasiado corto",
    }),
  boardId: z.string(),
  listId: z.string(),
});
