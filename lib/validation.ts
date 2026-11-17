import { z } from "zod";
import { parseExchangeRate, parseOrderAmount } from "@/lib/parse-amounts";

export { parseExchangeRate, parseOrderAmount };

export const calculatorSchema = z.object({
  orderAmountUsd: z
    .number({ error: "Enter an order amount." })
    .finite("Enter a valid order amount.")
    .min(0, "Order amount cannot be negative.")
    .max(10_000_000, "Enter an amount up to 10,000,000 USD."),
  platform: z.enum(["fiverr", "upwork"], { error: "Select a platform." }),
  taxStatus: z.enum(["filer", "nonFiler"], { error: "Select a tax assumption." }),
  usdToPkrRate: z
    .number({ error: "Enter a USD to PKR rate." })
    .finite("Enter a valid exchange rate.")
    .gt(0, "Exchange rate must be greater than zero.")
    .max(100_000, "Enter a realistic USD to PKR rate."),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  email: z.string().trim().email("Enter a valid email address.").max(120),
  topic: z.enum(["calculation", "correction", "partnership", "other"]),
  message: z
    .string()
    .trim()
    .min(20, "Write at least 20 characters so we can understand the question.")
    .max(2000, "Keep the message under 2,000 characters."),
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
