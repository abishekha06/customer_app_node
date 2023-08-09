const express = require('express')
const server = express()
var bodyParser = require('body-parser')



const cors =require('cors');
const customerRouter = require('./routes/customer/customer.routes');
const providerRouter = require('./routes/Provider/provider.routes');

let allowedOrigins = [
	"http://localhost:3001",
	"http://localhost:5000"
	// "http://192.168.1.4:3001"
];
server.use(
	cors({
		origin: function (origin, callback) {
			// allow requests with no origin (like mobile apps or curl requests)
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				let msg =
					"The CORS policy for this site does not " +
					"allow access from the specified Origin.";
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
	})
);







server.use(express.json())
server.use(bodyParser.json())


server.use("/customer",customerRouter)
server.use('/provider',providerRouter)


server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader( 
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});





server.listen(3002,()=>{
    console.log("server started at http://localhost:3002")
})