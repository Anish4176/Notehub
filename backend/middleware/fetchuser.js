var jwt = require('jsonwebtoken');
const secretkey = 'anishisagoodboy';

const fetchuser = async (req, res, next) => {
    const token = req.header('auth-token');
    // console.log('the token is :' + token);
    if (!token) {
        return res.status(401).send({ messege: "Invalid token" })
    }
    try {
        const data = jwt.verify(token, secretkey);
        // data={"id":"645f4cb7be12eb57c2edf591","iat":1683967159}
        req.user = data;
        next();
    }
    catch (err) {
        return res.status(401).send({ messege: "Invalid token" })
    }
}

module.exports = fetchuser; 