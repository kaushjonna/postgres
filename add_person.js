const settings = require("./settings"); // settings.json
const person = process.argv.splice(2); //input
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const knex = require('knex')({
  client: 'pg',
  connection: {
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
  }
});
const data = [{ first_name: person[0], last_name: person[1], birthdate: person[2] }];

knex('famous_people').insert(data).then(() => { console.log('data inserted') })
  .catch((err) => { console.log(err); throw err })
  .finally(() => {
    knex.destroy();
  });
