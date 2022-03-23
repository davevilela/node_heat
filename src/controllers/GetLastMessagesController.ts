import { Request, Response } from "express";
import signale from "signale";
import { GetLastMessageService } from "../services/GetLastMessagesService";

class GetLastMessagesController {
  async handle(req: Request, res: Response) {
    try {
      const service = new GetLastMessageService();

      const result = await service.execute();

      return res.json(result);
    } catch (err) {
      if (err instanceof Error) {
        signale.error("GetLastMessagesController", err);
        return res.json({ error: err.message });
      }
    }
  }
}

export { GetLastMessagesController };
