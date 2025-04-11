import { retrieve } from "../bdd/CRUD/retrieve.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function login(email, password) {
    try {
        let records = await retrieve('Users', { filterByFormula: `email = '${email}'` });

        if (records.length === 0) {
            throw new Error('Utilisateur non trouvé');
        }

        const user = records[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Mot de passe incorrect');
        }

        console.log(user);
        console.log({ userId: user.id, isAdmin: !!user.is_admin });

        const token = jwt.sign({ userId: user.id, isAdmin: !!user.is_admin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token };
    } catch (error) {
        console.error('Erreur lors de la connexion de l\'administrateur:', error);
        throw error;
    }
}

export { login }