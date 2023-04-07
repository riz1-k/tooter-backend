/* eslint-disable @typescript-eslint/consistent-type-imports */

declare namespace Express {
  export interface Request {
    user?: import('@prisma/client').User['id'];
  }
}
