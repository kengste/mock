import { server } from "./server.js";
const PORT = 5000;

server.listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
});
