import { z } from "zod";

export const step1Schema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyType: z.string().min(1, "Company type is required"),
  registrationNumber: z.string().optional(),
  establishedDate: z.string().optional(),
  employeeCount: z
    .number({ error: "Employee count must be a number" })
    .optional(),
  contactName: z.string().min(1, "Contact person name is required"),
  contactEmail: z.string().email("Invalid email format"),
  contactPhone: z
    .string()
    .min(6, "Phone number must be at least 6 digits"),
  companyLogo: z
    .instanceof(File)
    .optional()
    .or(z.string().optional()), // Allow stored logo (IndexedDB)
});
export type Step1Schema = z.infer<typeof step1Schema>;

export const step2Schema = z.object({
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().optional(),
  zipCode: z
    .number({ error: "ZIP / PIN must be a number" })
    .min(1, "ZIP / PIN is required"),
  bankName: z.string().min(1, "Bank Name is required"),
});
export type Step2Schema = z.infer<typeof step2Schema>;

export const step3Schema = z.object({
  services: z
    .array(z.string())
    .min(1, "At least one service must be selected"),
  pricingModel: z.enum(["Subscription", "One-time", "Pay-per-use"] as const, "Pricing model is required"),
  currency: z.enum(["INR", "USD", "EUR"]).optional(),
  declaration: z.literal(true, { message: "You must agree to proceed" }),
  notes: z.string().optional(),
  finalDoc: z
    .instanceof(File)
    .optional()
    .or(z.string().optional()), // Allow stored file via IndexedDB
});
export type Step3Schema = z.infer<typeof step3Schema>;

export const companyTypesData = [
  "Private Limited",
  "Public Limited",
  "Partnership",
  "Sole Proprietorship",
];

export const countriesData = ["India", "USA", "Canada"];

export const pricingModels = ["Subscription", "One-time", "Pay-per-use"];
export const currencies = ["INR", "USD", "EUR"];
export const servicesOffered = [
  "Consulting",
  "Software Development",
  "Support",
  "Training",
];
