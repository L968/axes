const connection = require('../database/connection');

module.exports = {

    async index(req, res){
        const users = await connection('user').select('*');

        return res.json(users);
    },

    async create(req, res){
        const { name, id_number, login, password, email, department_id } = req.body;

        const [user_id] = await connection('user').insert({
            name,
            id_number,
            login,
            password,
            email,
            department_id
        });

        return res.status(201).json({ user_id });
    },

    async update(req, res){

    },

}