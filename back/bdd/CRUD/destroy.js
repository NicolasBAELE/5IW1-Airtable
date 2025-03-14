import base from "../credentials.js";

function destroy(table, idList) {
    base(table).destroy(idList, function (err) {
        if (err) {
            console.error(err);
            return;
        }
    });
}

// destroy('Utilisateur', ['recqg11U5S7bSHrb4'])