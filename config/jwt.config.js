// jwtconf - JWT Config File
const { myApp_jwtPrivateKey } = process.env;

module.exports.token = `${myApp_jwtPrivateKey}`;