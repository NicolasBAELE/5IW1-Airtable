import jwt from 'jsonwebtoken';

async function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token valide. Données décodées:', decoded);
        return decoded;
    } catch (error) {
        console.error('Token invalide:', error.message);
        throw new Error('Token invalide');
    }
}

export { verifyToken };
