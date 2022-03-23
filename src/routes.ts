import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLastMessagesController } from "./controllers/GetLastMessagesController";
import { UserProfileController } from "./controllers/UserProfileController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handle
);

router.get(
  "/last_messages",
  ensureAuthenticated,
  new GetLastMessagesController().handle
);

router.get("/profile", ensureAuthenticated, new UserProfileController().handle);

export { router };
