const express = require('express');

//Create our app...
const app = express();
let port = process.env.PORT || 3000;

app.use(function(request, response, next) {
	//If the header is found then it moves on otherwise it make the request a
	//http request.
	if (request.headers['x-forwarded-proto'] === 'https') {
		response.redirect('http://' + request.hostname + request.url);
	} else {
		next();
	}
});

app.use(express.static('public'));

app.listen(port, function() {
	console.log(`Server started on port ${port}`);
});
