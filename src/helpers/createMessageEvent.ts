import { io } from "../app";
import { SOCKET_EVENTS } from "../constants";
import { MessageWithUser } from "../services/interfaces/Message";

export function createMessageEvent(message: MessageWithUser): boolean {
  const socketPayload = {
    text: message.text,
    userId: message.userId,
    createdAt: message.createdAt,
    user: {
      name: message.user.name,
      avatar_url: message.user.avatar_url,
    },
  };

  return io.emit(SOCKET_EVENTS.onMessage, socketPayload);
}
