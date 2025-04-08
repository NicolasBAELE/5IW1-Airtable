const express = require('express');
const cors = require('cors');
const { retrieve } = require('./src/bdd/CRUD/retrieve');
const { register } = require('./src/authentification/register');
const { login } = require('./src/authentification/login');
const { create } = require('./src/bdd/CRUD/create');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.get('/admin', async (req, res) => {
    try {
        const data = await retrieve('Administrateurs');
        res.send(data);
    } catch (error) {
        console.error('Error retrieving admin:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/admin', async (req, res) => {
    try {
        const data = await register('Administrateurs', req.body);
        res.send(data);
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            throw new Error("L'email et le mot de passe sont obligatoires");
        }
        const data = await login(email, password);
        res.send(data);
    } catch (error) {
        console.error('Error logining in:', error);
        res.status(400).send({ error: error.message });
    }
});


app.get('/student', async (req, res) => {
    try {
        const data = await retrieve('Etudiants');
        res.send(data);
    } catch (error) {
        console.error('Error retrieving students:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/student', async (req, res) => {
    try {
        const data = await create('Etudiants', req.body);
        res.send(data);
    } catch (error) {
        console.error('Error registering student:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
