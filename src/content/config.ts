import { z, defineCollection } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedDate: z.string(),
    featured: z.boolean().default(false),
    author: z.string().default('Trained Stoic'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  posts,
  pages,
};