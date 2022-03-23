import { Request, Response } from "express";
import signale from "signale";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { code } = req.body;
    try {
      const service = new AuthenticateUserService();
      const result = await service.execute(`${code}`);

      return res.json(result);
    } catch (err) {
      if (err instanceof Error) {
        signale.error("AuthenticateUserController", err);
        return res.json({ error: err.message });
      }
    }
  }
}

export { AuthenticateUserController };
