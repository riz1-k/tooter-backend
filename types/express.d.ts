/* eslint-disable @typescript-eslint/consistent-type-imports */

declare namespace Express {
  export interface Request {
    user?: {
      id: import('@prisma/client').User['id'];
    };
  }
}
