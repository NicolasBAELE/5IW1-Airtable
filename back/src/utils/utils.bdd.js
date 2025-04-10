import { retrieve } from "../bdd/CRUD/retrieve.js";

export async function checkIdsExistence(table, ids) {
    const idList = Array.isArray(ids) ? ids : [ids];

    for (const id of idList) {
        const records = await retrieve(table, { filterByFormula: `RECORD_ID()='${id.trim()}'` });
        if (records.length === 0) {
            throw new Error(`L'enregistrement avec l'ID ${id.trim()} n'existe pas dans la table ${table}`);
        }
    }
}

export const toArray = (stringOrArray) => {
    return Array.isArray(stringOrArray) ? stringOrArray : [stringOrArray]
}

export async function retrieveLinkedDetails(table, ids) {
    if (!ids || ids.length === 0) return [];

    const filter = { filterByFormula: `OR(${ids.map(id => `RECORD_ID()='${id}'`).join(',')})` };
    const records = await retrieve(table, filter);
    return records;
}
