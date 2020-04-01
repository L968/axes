const connection = require('../database/connection');

module.exports = {

    async index(req, res){
        const users = await connection('user').select('*');

        return res.json(users);
    },

    async detail(req, res){
        const { user_id } = req.params;

        const user = await connection('user')
        .select('*')
        .where('user_id', user_id)
        .first();

        return res.json(user);
    },

    async create(req, res){
        let { name, id_number, login, password, email, department_id } = req.body;

        name = name.toUpperCase();
        login = login.toUpperCase();
        email = email.toLowerCase();

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
        res.send('NOT IMPLEMENTED USER UPDATE');
    },

}