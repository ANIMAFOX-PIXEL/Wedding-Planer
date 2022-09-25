const jwt = require('jsonwebtoken');

function validateToken(req, res, next){
	const token = req.get('Authorization').split(' ')[1];
	jwt.verify(token, process.env.SECRET, (err, decoded)=>{
		if(err){
			return res.status(401).json({
                status:     401,
				message:    'Authentication token is not valid: ' + err.message
			});
		}
		req.user = decoded.user;
		next();
	});
}

module.exports = validateToken;
