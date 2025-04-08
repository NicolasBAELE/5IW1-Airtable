import { create } from "../bdd/CRUD/create.js"
import { retrieve } from "../bdd/CRUD/retrieve.js"
import bcrypt from 'bcryptjs';

async function register(table, fields) {
    try {
        const { password, email, ...remainingFields } = fields

        if (!email) {
            console.log("Un email est obligatoire");
            throw new Error("Un email est obligatoire");
        }

        if (!password) {
            console.log("Un mot de passe est obligatoire");
            throw new Error("Un mot de passe est obligatoire");
        }

        const records = await retrieve(table, { filterByFormula: `email = '${email}'` });
        if (records.length !== 0) {
            throw new Error('Cette adresse email est déjà utilisée');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return await create(table, { ...remainingFields, email: email, password: hashedPassword })
    } catch (e) {
        console.log('Une erreur est survenue: ', e);
    }
}

export { register }