import base from "../credentials.js";

async function update(table, data) {
    return new Promise((resolve, reject) => {
        base(table).update(data, function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve('Update done');
        });
    });
}

export { update };