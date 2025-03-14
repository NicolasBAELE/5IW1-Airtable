import base from "../credentials.js";

function create(table, fields) {
    return new Promise((resolve, reject) => {
        base(table).create([
            { "fields": fields },
        ], function (err, records) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const record = records[0];
                resolve({ id: record.id, ...record.fields });
            }
        });
    })
}


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