const UserRepository = require('../repository/user-repository')
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const { use } = require('../routes');
const AppErrors = require('../utils/error-handler');


class UserService {
    constructor(){
        this.userRepository = new UserRepository;
    }

    async create(data){
        try {
            const user = await  this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw error;
            }
            console.log("Something went wrong at the service layer");
            throw error;
        }
    }

    async signIn(email , plainPassword){
        try {
            // Step 1 -> Fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            // Step 2 -> compare incoming plain password with stored encrypted password
            const passwordsMatch = this.checkPassword(plainPassword , user.password);

            if(!passwordsMatch){
                console.log("Password doesn't match")
                throw {error : "Wrong credentials"}
            }
            // step 3 -> if password match then create a token and send it to the user.
            const newJWT = this.createToken({email:user.email , id:user.id});
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in sign in process");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error : 'Invalid token'}
            }
            const user = this.userRepository.getById(response.id);
            if(!user){
                throw {error:'User not found with this corresponding token'}
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in Authentication process");
            throw error;
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user , JWT_KEY , {expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("Some went wrong in token craetion")
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token , JWT_KEY);
            return response;
        } catch (error) {
            console.log("Some went wrong in validation of token")
            throw error;
        }
    }
    
    checkPassword(userInputPlainPassword , encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword , encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    } 

    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }
}


module.exports = UserService;