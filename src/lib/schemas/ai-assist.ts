import { z } from "zod";

export const aiProspectSchema = z.object({
  companyName: z.string().min(2, "Indique le nom de l'entreprise"),
  sector: z.string().min(2, "Indique le secteur"),
  city: z.string().min(2, "Indique la ville"),
  targetRole: z.string().optional(),
  context: z.string().optional(),
});

export type AiProspectFormValues = z.infer<typeof aiProspectSchema>;
