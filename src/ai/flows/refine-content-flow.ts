'use server';
/**
 * @fileOverview A Genkit flow for refining content, such as project descriptions or service offerings.
 *
 * - refineContent - A function that refines content for conciseness, impact, and compelling storytelling.
 * - RefineContentInput - The input type for the refineContent function.
 * - RefineContentOutput - The return type for the refineContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineContentInputSchema = z.object({
  originalContent: z
    .string()
    .describe('The original text content to be refined.'),
  contentType: z
    .string()
    .optional()
    .describe(
      'Optional: The type of content being refined (e.g., "project description", "service offering", "about me section").'
    ),
  keywords: z
    .array(z.string())
    .optional()
    .describe('Optional: A list of keywords or phrases to include or emphasize.'),
  targetAudience: z
    .string()
    .optional()
    .describe('Optional: The intended audience for the refined content (e.g., "potential clients", "recruiters").'),
});
export type RefineContentInput = z.infer<typeof RefineContentInputSchema>;

const RefineContentOutputSchema = z.object({
  refinedContent: z
    .string()
    .describe(
      'The AI-generated refined content, optimized for conciseness, impact, and compelling storytelling.'
    ),
});
export type RefineContentOutput = z.infer<typeof RefineContentOutputSchema>;

export async function refineContent(
  input: RefineContentInput
): Promise<RefineContentOutput> {
  return refineContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineContentPrompt',
  input: {schema: RefineContentInputSchema},
  output: {schema: RefineContentOutputSchema},
  prompt: `You are an expert copywriter specializing in creating concise, impactful, and compelling content for professional portfolios, especially for a graphic designer, web developer, video editor, animator, and 3D modeler named Udula Imanjith.

Your task is to refine the provided content to be suitable for a modern and clean portfolio website, ensuring it is engaging and professionally presented. Focus on clarity, brevity, and highlighting value.

Original Content:
{{{originalContent}}}

{{#if contentType}}
Content Type: {{{contentType}}}
{{/if}}

{{#if keywords}}
Keywords to emphasize: {{#each keywords}}'{{{this}}}' {{/each}}
{{/if}}

{{#if targetAudience}}
Target Audience: {{{targetAudience}}}
{{/if}}

Refine the above content to be highly effective for a portfolio. Provide only the refined content in the output.`,
});

const refineContentFlow = ai.defineFlow(
  {
    name: 'refineContentFlow',
    inputSchema: RefineContentInputSchema,
    outputSchema: RefineContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
