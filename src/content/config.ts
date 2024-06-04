import { z, defineCollection, reference } from "astro:content";

const experience = defineCollection({
    type: "data",
    schema: z.object({
        companyName: z.string(),
        location: z.string(),
        role: z.string(),
        url: z.string().url().optional(),
        summary: z.string(),
        tech: z.array(z.string()),
        relatedProjects: z.array(reference("projects")),
        yearsActive: z.object({
            start: z.number(),
            end: z.number(),
        }),
    })
})

const projects = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tech: z.array(z.string()),
        url: z.string().url(),
    })
})

export const collections = {
    experience, projects
}