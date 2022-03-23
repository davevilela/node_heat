import { serverHttp } from "./app";
import { APP_PORT } from "./constants";

serverHttp.listen(APP_PORT, () =>
  console.log(`server is runnning on port: ${APP_PORT} 🚀`)
);
