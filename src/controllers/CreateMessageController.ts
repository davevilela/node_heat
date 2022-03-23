import { Request, Response } from "express";
import signale from "signale";
import { CreateMessageService } from "../services/CreateMessageService";

class CreateMessageController {
  async handle(req: Request, res: Response) {
    const { message } = req.body;
    const { user_id } = req;
    try {
      const service = new CreateMessageService();

      const result = await service.execute({ text: message, userId: user_id });

      return res.json(result);
    } catch (err) {
      if (err instanceof Error) {
        signale.error("CreateMessageController", err);
        return res.json({ error: err.message });
      }
    }
  }
}

export { CreateMessageController };
