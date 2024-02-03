const UserRepository = require('../repository/user-repository')
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/serverConfig')


class UserService {
    constructor(){
        this.userRepository = new UserRepository;
    }

    async create(data){
        try {
            const user = await  this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong at the service layer");
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

     
}

module.exports = UserService;