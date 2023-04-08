import { z } from 'zod';

const imageUploadSchema = z.object({
  fileName: z.string(),
  imageType: z.string(),
  url: z.string(),
});

type ImageUploadSchema = z.infer<typeof imageUploadSchema>;

export default imageUploadSchema;
export type { ImageUploadSchema };
