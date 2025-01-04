import { z } from "zod";
const productZodSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, { message: "nome precisa ter no minimo 3 caracteres" }),
  price: z
    .number()
    .nullable()
    .refine((val) => val !== null && val >= 0.01, {
      message: "Preço é obrigatório e deve ser maior que zero",
    }),
  amount: z
    .number()
    .nullable()
    .refine((val) => val !== null && val >= 1, {
      message: "Quantidade é obrigatória e deve ser maior que zero",
    }),
});

export default productZodSchema;
