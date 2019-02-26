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


knex.from('famous_people').select("*")
  .then((rows) => {
    for (row of rows) {
      console.log(`${row['id']} ${row['first_name']} ${row['last_name']} ${convertDate(row['birthdate'])} `);
    }
  }).catch((err) => { console.log(err); throw err })
  .finally(() => {
    knex.destroy();
  });


const convertDate = (date) => {
  return (`${date.getMonth()}, ${months[date.getDate() - 1]}, ${date.getFullYear()}`);
}

