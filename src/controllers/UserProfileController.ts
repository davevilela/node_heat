import { Request, Response } from "express";
import signale from "signale";
import { UserProfileService } from "../services/UserProfileService";

class UserProfileController {
  async handle(req: Request, res: Response) {
    try {
      const service = new UserProfileService();

      const result = await service.execute(req.user_id);

      return res.json(result);
    } catch (err) {
      if (err instanceof Error) {
        signale.error("UserProfileController", err);
        return res.json({ error: err.message });
      }
    }
  }
}

export { UserProfileController };
