import { z } from "zod";

export const prospectSearchSchema = z.object({
  sector: z.string(),
  city: z.string(),
  country: z.string().min(2, "Indique un pays"),
  radius: z.enum(["10 km", "20 km", "50 km", "100 km"]),
  companySize: z.string().optional(),
  keywords: z.string().optional(),
  targetRole: z.string().optional(),
});

export type ProspectSearchFormValues = z.infer<typeof prospectSearchSchema>;
