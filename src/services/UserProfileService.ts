import { User } from "@prisma/client";
import { prismaClient } from "../lib/prisma";

class UserProfileService {
  async execute(userId: string): Promise<User> {
    const result = await prismaClient.user.findUnique({
      where: { id: userId },
      rejectOnNotFound: true,
    });

    return result;
  }
}

export { UserProfileService };
