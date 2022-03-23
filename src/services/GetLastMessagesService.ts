import { prismaClient } from "../lib/prisma";
import { MessageWithUser } from "./interfaces/Message";

class GetLastMessageService {
  async execute(): Promise<MessageWithUser[]> {
    const messages = await prismaClient.message.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
      },
    });

    return messages;
  }
}

export { GetLastMessageService };
