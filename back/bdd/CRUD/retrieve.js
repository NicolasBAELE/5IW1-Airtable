import base from "../credentials.js";

function fetchRecordById(table, id) {
    return new Promise((resolve, reject) => {
        base(table).find(id, function (err, record) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve({ id: record.id, ...record.fields });
            }
        });
    });
}

function fetchAllRecords(table) {
    const result = [];
    return new Promise((resolve, reject) => {
        base(table).select().eachPage(
            function page(records, fetchNextPage) {
                records.forEach(function (record) {
                    result.push({ id: record.id, ...record.fields });
                });
                fetchNextPage();
            },
            function done(err) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
}

async function retrieve(table, id) {
    if (id) {
        return fetchRecordById(table, id);
    }
    return fetchAllRecords(table);
}

// (async () => {
//     try {
//         const users = await retrieve('Utilisateur');
//         console.log(users);
//     } catch (error) {
//         console.error('Error retrieving users:', error);
//     }
// })();
