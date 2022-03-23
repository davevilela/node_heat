import { Prisma } from "@prisma/client";

export const messagePayload = Prisma.validator<Prisma.MessageArgs>()({
  include: {
    user: true,
  },
});

export type MessageWithUser = Prisma.MessageGetPayload<typeof messagePayload>;
