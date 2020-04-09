const connection = require('../database/connection');
const User = require('../models/User');

module.exports = {

    async index(req, res)
    {
        try
        {
            const user = await User.findAll();

            if (user.length === 0)
            {
                return res.status(404).json({ error: "There are no users registered in the system" });
            }

            return res.json(user);
        }
        catch (error)
        {
            console.log(error);
            return res.status(500).json({ error: 'An unexpected error has occured, please try again later.' });
        }
    },

    async detail(req, res)
    {
        try
        {
            const { user_id } = req.params;

            const user = await User.findByPk(user_id);

            if (!user)
            {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.json(user);
        }
        catch (error)
        {
            console.log(error);
            return res.status(500).json({ error: 'An unexpected error has occured, please try again later.' });
        }
    },

    async create(req, res)
    {
        try
        {
            let { name, id_number, login, password, email, department_id } = req.body;

            name = name.toUpperCase();
            login = login.toLowerCase();
            email = email.toLowerCase();

            const user = await User.findOne({
                attributes: ['user_id'],
                where: { login: login }
            });

            if (user)
            {
                return res.status(409).json({ error: 'This login is already in use.' });
            }

            const response = await User.create({
                name,
                id_number,
                login,
                password,
                email,
                department_id
            });

            return res.status(201).json({ user_id: response.null });
        }
        catch (error)
        {
            console.log(error);
            return res.status(500).json({ error: 'An unexpected error has occured, please try again later.' });
        }
    },

    async update(req, res)
    {
        try
        {
            res.send('NOT IMPLEMENTED USER UPDATE');
        }
        catch (error)
        {
            console.log(error);
            return res.status(500).json({ error: 'An unexpected error has occured, please try again later.' });
        }
    },

}