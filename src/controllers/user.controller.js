// controllers/user.controller.js

import userService from "../services/user.service.js";

export async function getAll(req, res) {
    try {
        const users = await userService.getAll();
        if (users.length > 0) {
            return res.status(200).json(users);
        }

        return res.status(200).json({ message: "No se encontraron users" });
        
    } catch (error) {
        res.status(500).json({ error: "Error al recuperar usuarios" });
    }
}

export async function getById(req, res) {
    try {
        const { id } = req.params;

        const user = await userService.getById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json({ error: "Error al recuperar el usuario" });
    }
}

export async function create(req, res) {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const userExist = await userService.getByEmail(email);

        if (userExist) {
            return res.status(400).json({ message: "Email ya existe" });
        }

        const newUser = await userService.create(req.body);

        return res.status(201).json(newUser);
        
    } catch (error) {
        res.status(500).json({ error: "Error al crear el usuario" });
    }
}

export async function update(req, res) {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, age, password } = req.body;

        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const user = await userService.getById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await userService.update(id, req.body);

        return res.status(200).json({ message: "User actualizado" });
        
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
}

export async function deleteOne(req, res) {
    try {
        const { id } = req.params;

        const user = await userService.getById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await userService.deleteOne(id);

        return res.status(200).json({ message: "User eliminado" });
        
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
}