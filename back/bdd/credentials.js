import Airtable from 'airtable';
import dotenv from 'dotenv';

dotenv.config();

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
});
var base = Airtable.base(process.env.BASE);
export default base