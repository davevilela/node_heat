import { Prisma } from "@prisma/client";
import signale from "signale";
import { io } from "../app";
import { SOCKET_EVENTS } from "../constants";
import { createMessageEvent } from "../helpers/createMessageEvent";
import { prismaClient } from "../lib/prisma";
import { MessageWithUser } from "./interfaces/Message";

class CreateMessageService {
  async execute(params: {
    text: string;
    userId: string;
  }): Promise<MessageWithUser> {
    signale.info("create message: ", params);
    const { text, userId } = params;
    const message = await prismaClient.message.create({
      data: {
        text,
        userId,
      },
      include: {
        user: true,
      },
    });

    createMessageEvent(message);

    return message;
  }
}

export { CreateMessageService };
