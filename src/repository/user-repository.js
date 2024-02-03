const {User} = require('../models/index');

class UserRepository{

    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async destory(userId){
        try {
            await User.destory({
                where: { id : userId }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async getById(userId){
        try {
            const user = await User.findByPk(userId , {
                attributes : ['email' , 'id']
            });
            // attributes are used to get some particular data not all the data . in this case we want [email , id] only not password. In order to get all just write findByPk(userId) , nothing to pass in attributes.
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }    

}

module.exports=UserRepository;