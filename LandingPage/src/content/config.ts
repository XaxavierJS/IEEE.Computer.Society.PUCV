import { defineCollection, z } from 'astro:content';

const teamCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.enum([
      'Presidente',
      'Vicepresidente',
      'Tesorero',
      'Web Master',
      'Secretario',
      'Relaciones Exteriores'
    ]),
    photo: z.string().default('/placeholder-avatar.webp'),
    linkedin: z.string().url().optional(),
    order: z.number().default(99)
  })
});

export const collections = {
  team: teamCollection
};
