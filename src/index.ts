import app from "./app";

const serverPort = Number(process.env.PORT || 8080);

app.listen(serverPort, (cb) => {
  console.log("Listening on %d", serverPort);
});
