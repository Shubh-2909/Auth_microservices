const dotenv = require('dotenv');
const bcrypt = require('bcrypt')

dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    //salt is added extra data that you passed with encrypted data, because any hacker if hack the algorithm then it may know the password using encryption also, so for second level of security we add salt self made some custom string at the end of encrypted password. this salt varies from person to person or computer to computer.
    SALT : bcrypt.genSaltSync(10),
    JWT_KEY : process.env.JWT_KEY
}