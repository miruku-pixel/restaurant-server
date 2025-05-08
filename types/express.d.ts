import { User } from "@prisma/client"; // Adjust the import path as necessary

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
