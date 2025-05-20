import { z } from "zod";

export const CreateListSchema = z.object({
  title: z
    .string({
      required_error: "Titulo es requerido",
      invalid_type_error: "Titulo es requerido",
    })
    .min(3, {
      message: "Titulo demasiado corto",
    }),
  boardId: z.string(),
});
