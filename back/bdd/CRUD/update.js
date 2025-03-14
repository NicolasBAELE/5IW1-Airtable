import base from "../credentials.js";

function update(table, data) {
    base(table).update(data, function (err) {
        if (err) {
            console.error(err);
            return;
        }
    });
}

export { update }