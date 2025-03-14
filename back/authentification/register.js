import { create } from "../bdd/CRUD/create.js"
import bcrypt from 'bcryptjs';

async function register(fields) {
    try {
        const { password, ...remainingFields } = fields
        if (!password) {
            console.log("Un mot de passe est obligatoire");
            return
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        return await create('Utilisateur', { ...remainingFields, password: hashedPassword })
    } catch (e) {
        console.log('Une erreur est survenue: ', e);
    }
}

export { register }