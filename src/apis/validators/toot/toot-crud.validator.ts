import { z } from 'zod';

// const tootMediaSchema = z.object({
//   id: z.string(),
//   url: z.string().url(),
//   type: z.enum(['image', 'video', 'gifv']),
// });

const createTootSchema = z.object({
  content: z.string().min(1).max(280),
  sensitiveContent: z.boolean().default(false),
  // media_ids: z.array(tootMediaSchema).optional(),
  in_reply_to_id: z.string().optional(),
  poll: z
    .object({
      options: z.array(z.string().min(1).max(25)),
      expires_in: z.number().min(300).max(604800),
      multiple: z.boolean().optional(),
      hide_totals: z.boolean().optional(),
    })
    .optional(),
  reply_settings: z
    .enum(['EVERYONE', 'FOLLOWING', 'DISABLED'])
    .default('EVERYONE'),
  language: z
    .enum(['en', 'fr', 'es', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh'])
    .default('en'),
  visibility: z
    .enum(['PUBLIC', 'UNLISTED', 'PRIVATE', 'DIRECT'])
    .default('PUBLIC'),
});

const updateTootSchema = z.object({
  content: z.string().min(1).max(280),
  sensitiveContent: z.boolean().default(false),
  reply_settings: z
    .enum(['EVERYONE', 'FOLLOWING', 'DISABLED'])
    .default('EVERYONE'),
  visibility: z
    .enum(['PUBLIC', 'UNLISTED', 'PRIVATE', 'DIRECT'])
    .default('PUBLIC'),
});

type TypeCreateTootSchema = z.infer<typeof createTootSchema>;
type TypeUpdateTootSchema = z.infer<typeof updateTootSchema>;

export { createTootSchema, updateTootSchema };
export type { TypeCreateTootSchema, TypeUpdateTootSchema };
