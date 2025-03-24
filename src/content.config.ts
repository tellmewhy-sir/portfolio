import { glob } from "astro/loaders";
import { z, defineCollection, reference } from "astro:content";

const experience = defineCollection({
    loader: glob({
        pattern: '**/[^_]*.json', base: './src/content/experience'
    }),
    schema: z.object({
        companyName: z.string(),
        location: z.string(),
        role: z.string(),
        type: z.string(),
        url: z.string().url().optional(),
        summary: z.string(),
        tech: z.array(z.string()),
        relatedProjects: z.array(reference("projects")),
        yearsActive: z.object({
            start: z.string(),
            end: z.string(),
        }),
    })
})

const projects = defineCollection({
    loader: glob({
        pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects'
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tech: z.array(z.string()),
        url: z.string().url(),
        category: z.string(),
    })
})

export const collections = {
    experience, projects
}