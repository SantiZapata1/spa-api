import usuarios from "../models/usuario";

export const getAdmins = async (req, res) => {
    try {
        const admins = await usuarios.find({ admin: true });
        console.log(admins)
        res.status(200).json(admins);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const setAdmin = async (req, res) => {
    try {
        const { nombre_de_usuario } = req.params;
        const user = await usuarios.findOne({ nombre_de_usuario });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        user.admin = true;
        await user.save();
        res.status(200).json({ message: "Usuario es ahora administrador" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const removeAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usuarios.findById(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        user.admin = false;
        await user.save();
        res.status(200).json({ message: "Usuario ya no es administrador" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
