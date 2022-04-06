import User from "./users.model.js";

export const usersResBuilder = (success, data, error) => {
    return {
        success, data, error
    }
}

export const createUser = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    if (!username || !email) {
        res.status(400).json(usersResBuilder(false, null, 'Username or Email is required'))
    } else {
        User.create({ username, email })
            .then((result) => res.status(200).json(usersResBuilder(true, result, null)))
            .catch((err) => res.status(400).json(usersResBuilder(false, null, err)))
    }
}

export const getUser = (req, res) => {
    const id = req.params.id
    User.findByPk(id)
        .then((user) => {
            if (user == null) {
                res.status(400).json(usersResBuilder(false, null, `User with id ${id} does not exist`))
            } else {
                res.status(200).json(usersResBuilder(true, user, null))
            }
        })
        .catch((err) => res.status(400).json(usersResBuilder(false, null, err)))
}

export const updateUser = (req, res) => {
    const id = req.params.id
    User.findByPk(id)
        .then((user) => {
            if (user == null) {
                res.status(400).json(usersResBuilder(false, null, `User with id ${id} does not exist`))
            } else {
                User.update({
                    username: req.body.username == undefined ? user.username : req.body.username,
                    email: req.body.email == undefined ? user.email : req.body.email,
                    address: req.body.address == undefined ? user.address : req.body.address,
                    phone: req.body.phone == undefined ? user.phone : req.body.phone,
                },
                { where: {  id: id} })
                    .then((data) => res.status(200).json(usersResBuilder(true, 'User updated succesfully', null)))
                    .catch((err) => res.status(400).json(usersResBuilder(false, null, err)))
            }
        })
        .catch((err) => res.status(400).json(usersResBuilder(false, null, err)))
}

export const deleteUser = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then((user) => {
            if (user == null) {
                res.status(400).json(usersResBuilder(false, null, `User with id ${id} does not exist`))
            } else {
                User.destroy({ where: { id } })
                    .then((data) => res.status(200).json(usersResBuilder(true, `User with id ${id} is deleted`, null)))
                    .catch((err) => res.status(400).json(usersResBuilder(false, null, err)))
            }
        })
        .catch((err) => res.status(400).json(usersResBuilder(false, null, err)))

}