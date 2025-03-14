import { login } from "./back/authentification/login.js";
import { register } from "./back/authentification/register.js";

// (async () => {
//     try {
//         const users = await retrieve('Utilisateur', { filterByFormula: `email = 'lecaplain@gmail.com'` });
//         console.log(users);
//     } catch (error) {
//         console.error('Error retrieving users:', error);
//     }
// })();

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
//         const user = await register({
//             "lastname": "BAELE",
//             "firstname": "Nicolas",
//             "email": "nicolas@gmail.com",
//             "job": "Juste le Boss",
//             "tjm": 1000,
//             "password": "Niko250200"
//         })
//         console.log(user);
//     } catch (error) {
//         console.error('Error creating user:', error);
//     }
// })();


(async () => {
    try {
        const token = await login('nicolas@gmail.com', 'Niko2502003333')
        console.log(token);
    } catch (error) {
        console.error('Error login user:', error);
    }
})();