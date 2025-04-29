const express = require('express');
const cors = require('cors');
const { retrieve } = require('./src/bdd/CRUD/retrieve');
const { register } = require('./src/authentification/register');
const { login } = require('./src/authentification/login');
const { create } = require('./src/bdd/CRUD/create');
const { update } = require('./src/bdd/CRUD/update');
const { checkIdsExistence, toArray, retrieveLinkedDetails } = require('./src/utils/utils.bdd');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.get('/user', async (req, res) => {
    try {
        const data = await retrieve('Users');
        res.send(data);
    } catch (error) {
        console.error('Error retrieving admin:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/user', async (req, res) => {
    try {
        const data = await register(req.body);
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


app.get('/user', async (req, res) => {
    try {
        const data = await retrieve('Users');
        res.send(data);
    } catch (error) {
        console.error('Error retrieving students:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/project', async (req, res) => {
    try {
        const projects = await retrieve('Projets');

        const enrichedProjects = await Promise.all(
            projects.map(async (project) => {
                const [studentDetails, categoryDetails, technologyDetails, commentsDetails] = await Promise.all([
                    retrieveLinkedDetails('Users', project.user),
                    retrieveLinkedDetails('Categories', project.category),
                    retrieveLinkedDetails('Technologies', project.technologies),
                    retrieveLinkedDetails('Commentaires', project.comments),
                ]);

                const commentUserIds = commentsDetails.flatMap(comment => comment.user);
                const commentUserDetails = await retrieveLinkedDetails('Users', commentUserIds);

                const enrichedCommentsDetails = commentsDetails.map(comment => ({
                    ...comment,
                    userDetails: commentUserDetails.find(user => user.id === comment.user[0])
                }));

                return {
                    ...project,
                    studentDetails,
                    categoryDetails,
                    technologyDetails,
                    commentsDetails: enrichedCommentsDetails,
                };
            })
        );

        res.send(enrichedProjects);
    } catch (error) {
        console.error('Error retrieving projects:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/project', async (req, res) => {
    try {
        const { name, student, description, project_link, category, technologies, image_url } = req.body
        if (!name || !student || !description || !category || !technologies) {
            throw new Error("Tous les champs sont obligatoires");
        }

        const data = {
            name,
            user: toArray(student),
            category: toArray(category),
            creation_date: new Date().toISOString(),
            likes: 0,
            publishing_status: "caché",
            description,
            project_link,
            technologies: toArray(technologies),
            image: [{ url: image_url }]
        }

        await checkIdsExistence('Users', student);
        await checkIdsExistence('Categories', category);
        await checkIdsExistence('Technologies', technologies);

        const query = await create("Projets", data);
        res.send(query);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(400).send({ error: error.message });
    }
});

app.put('/project', async (req, res) => {
    try {
        const { id, name, student, description, project_link, category, technologies, image_url } = req.body

        if (!id || !name || !student || !description || !category || !technologies) {
            throw new Error("Tous les champs sont obligatoires");
        }

        await checkIdsExistence('Projets', id);
        await checkIdsExistence('Users', student);
        await checkIdsExistence('Categories', category);
        await checkIdsExistence('Technologies', technologies);

        const data = {
            name,
            user: toArray(student),
            category: toArray(category),
            description,
            project_link,
            technologies: toArray(technologies),
            image: [{ url: image_url }]
        }

        const query = await update("Projets", [{
            id,
            fields: data
        }]);
        res.send(query);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(400).send({ error: error.message });
    }
});

app.put('/project/like', async (req, res) => {
    try {
        const { id, user } = req.body;

        if (!id) {
            throw new Error('Un ID est obligatoire pour liker');
        }

        const records = await retrieve('Projets', { filterByFormula: `RECORD_ID()='${id.trim()}'` });
        if (records.length === 0) {
            throw new Error(`Le projet avec l'ID ${id.trim()} n'existe pas`);
        }

        await checkIdsExistence('Users', user);
        const oldProject = records[0];
        const likes = toArray(oldProject.likes);

        if (likes.includes(user)) {
            const updatedLikes = likes.filter(like => like !== user);
            const data = await update('Projets', [{
                id,
                fields: {
                    "likes": updatedLikes
                }
            }]);
            res.send({ data, message: 'Like retiré' });
        } else {
            const data = await update('Projets', [{
                id,
                fields: {
                    "likes": [...likes, user]
                }
            }]);
            res.send({ data, message: 'Like ajouté' });
        }

    } catch (error) {
        console.error('Error liking project:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/project/publishing_status', async (req, res) => {
    try {
        const { id, publishing_status } = req.body
        if (!id || !publishing_status) {
            throw new Error('Un ID et un status sont obligatoires pour changer le status')
        }

        await checkIdsExistence('Projets', id)

        const data = await update('Projets', [{
            id,
            fields: {
                "publishing_status": publishing_status
            }
        }]);
        res.send({ data });
    } catch (error) {
        console.error('Error liking project:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/category', async (req, res) => {
    try {
        const data = await retrieve('Categories');
        res.send(data);
    } catch (error) {
        console.error('Error retrieving categories:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/category', async (req, res) => {
    try {
        const { category_name, description } = req.body
        if (!category_name || !description) {
            throw new Error("Une catégorie doit avoir un nom et une description");
        }
        const data = await create('Categories', req.body);
        res.send(data);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/technology', async (req, res) => {
    try {
        const data = await retrieve('Technologies');
        res.send(data);
    } catch (error) {
        console.error('Error retrieving technologies:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/technology', async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            throw new Error("Une technologie doit avoir un nom");
        }
        const data = await create('Technologies', req.body);
        res.send(data);
    } catch (error) {
        console.error('Error creating technology:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/comment', async (req, res) => {
    try {
        const data = await retrieve('Commentaires');
        res.send(data);
    } catch (error) {
        console.error('Error retrieving comments:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/comment', async (req, res) => {
    try {
        const { comment, project, user } = req.body
        if (!comment) {
            throw new Error("Un commentaire doit avoir une description");
        }

        await checkIdsExistence('Projets', project)

        const data = await create('Commentaires', {
            comment,
            project: [project],
            user: [user],
            creation_date: new Date().toISOString(),
        });
        res.send(data);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
