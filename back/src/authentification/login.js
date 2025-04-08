import { retrieve } from "../bdd/CRUD/retrieve.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function login(email, password) {
    try {
        let records = await retrieve('Etudiants', { filterByFormula: `email = '${email}'` });
        let isAdmin = false

        if (records.length === 0) {
            records = await retrieve('Administrateurs', { filterByFormula: `email = '${email}'` });

            if (records.length === 0) {
                throw new Error('Utilisateur non trouvé');
            }

            isAdmin = true
        }

        const user = records[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Mot de passe incorrect');
        }

        const token = jwt.sign({ userId: user.Id, isAdmin: isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token };
    } catch (error) {
        console.error('Erreur lors de la connexion de l\'administrateur:', error);
        throw error;
    }
}

export { login }