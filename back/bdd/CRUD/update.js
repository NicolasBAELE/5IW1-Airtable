import base from "../credentials.js";

function update(table, data) {
    base(table).update(data, function (err) {
        if (err) {
            console.error(err);
            return;
        }
    });
}

// update('Utilisateur', [{
//     id: 'recp7IxECTL21fCKu',
//     fields: {
//         "TJM": 500,
//     }
// }])