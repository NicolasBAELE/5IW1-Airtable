import { retrieve } from "./back/src/bdd/CRUD/retrieve";


(async () => {
    try {
        const users = await retrieve('Administrateurs');
        console.log(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
    }
})();

// (async () => {
//     try {
//         const user = await create('Utilisateur', {
//             "Lastname": "Lecaplain",
//             "Firstname": "Baptiste",
//             "Email": "baptiste@gmail.com",
//             "Job": "Humouriste",
//             "TJM": 700,
//         });
//         console.log(user);
//     } catch (error) {
//         console.error('Error creating user:', error);
//     }
// })();

// update('Utilisateur', [{
//     id: 'recp7IxECTL21fCKu',
//     fields: {
//         "TJM": 500,
//     }
// }])

// destroy('Utilisateur', ['recqg11U5S7bSHrb4'])


// (async () => {
//     try {
//         const user = await register('Administrateurs', {
//             "name": "Nicolas BAELE",
//             "email": "nicolas2@gmail.com",
//             "password": "password"
//         })
//         console.log(user);
//     } catch (error) {
//         console.error('Error creating user:', error);
//     }
// })();


// (async () => {
//     try {
//         const token = await login('nicolas@gmail.com', 'Niko250200')
//         console.log(token);
//     } catch (error) {
//         console.error('Error login user:', error);
//     }
// })();

// (async () => {
//     try {
//         const token = await verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDQwMjk1ODgsImV4cCI6MTc0NDAzMzE4OH0.vXTg49_yh8FS-qpmvL3GU4ertYN0YQ0OHCsn3bXIrbk')
//         console.log(token);
//     } catch (error) {
//         console.error('Error login user:', error);
//     }
// })();

