import base from "../credentials.js";

function retrieve(table, filter = {}) {
    const result = [];
    return new Promise((resolve, reject) => {
        base(table).select(filter).eachPage(
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

export { retrieve }
