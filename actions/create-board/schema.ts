import { z } from "zod";

export const CreateBoardSchema = z.object({
  title: z
    .string({
      required_error: "Titulo requeido",
      invalid_type_error: "Titulo requeido",
    })
    .min(3, {
      message: "Titulo demasiado corto",
    }),
  image: z.string({
    required_error: "Imagen requeida",
    invalid_type_error: "Imagen requeida",
  }),
});
