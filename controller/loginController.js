const express = require("express")
const session = require("express-session")
const MongoStore = require("connect-mongo")

const app = express()

app.use(
	session({
		store: MongoStore.create({
			mongoUrl:
				"mongodb+srv://fedeUsername:Mongo.0303@cluster0.0kdfdvp.mongodb.net/?retryWrites=true&w=majority",
			mongoOptions: {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
		}),

		secret: "secreto",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 600,
			expires: 600,
		},
	})
)

app.get("/root", (req, res) => {
	res.send("<h1>Te damos la bienvenida!</h1>")
})

app.get("/root/:name", (req, res) => {
	let { name } = req.params

	if (!req.session[name]) {
		req.session[name] = {}
		req.session[name].name = name
		req.session[name].cantidadDeLogins = 1
	} else {
		req.session[name].cantidadDeLogins += 1
	}

	res.send(
		`<h1>Te damos la bienvenida ${name}! Visitaste ${req.session[name].cantidadDeLogins} veces</h1>`
	)
})

app.get("/olvidar", (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res.json({ status: "Logout ERROR" })
		}
		res.send("Logout OK")
	})
})

app.listen(8080, () => {
	console.log("Servidor escuchando en el puerto 8080")
})
