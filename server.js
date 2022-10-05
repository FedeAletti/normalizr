import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
// import configurarSocket from "./routes/mensajes.js";
import productosApiRouter from "./routes/product.js"

//Creacion de Servidor y Sockets
const app = express()
const PORT = 8080
const httpServer = createServer(app)
const io = new Server(httpServer, {})

//Inicio de Servidor
httpServer.listen(process.env.PORT || PORT, () =>
	console.log("Servidor Funcionando en Puerto: " + PORT)
)
httpServer.on("error", (error) => console.log(`Error en servidor ${error}`))

//Configuro Servidor
//dirname
import { fileURLToPath } from "url"
import { dirname } from "path"
const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)
app.use(express.static(__dirname + "/public"))
//app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.set("views", "./views")

app.use("/api/login", loginApiRouter)
app.use("/api/products-test", productosApiRouter)

//ruta de servidor Api Rest
app.use("/", (req, res) => {
	res.render("pages/home", { name: "Fede" })
})

//Configuracion de Socket
import { socketModel } from "./src/utils/socket.js"
socketModel(io)

// app.all("*", (req, res) => {
//   res.status(404).send("Ruta no encontrada");
// });
