import http from "http";
import app from "./app/app.js"
const server =http.createServer(app)
const PORT =process.env.PORT || 2030;
server.listen(PORT,console.log(`server started in port ${PORT}`))