const pg = require("pg");
const settings = require("./settings"); // settings.json
const person = process.argv.splice(2); //input


const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name= $1::text`, [person[0]], (err, result) => {
    if (result.rows.length === 0) {
      console.log('checking last name...');
      client.query(`SELECT * FROM famous_people WHERE last_name= $1::text`, [person[0]], (err, result) => {
        if (err) {
          return console.error("error running query", err);
        }
        console.log(`Found ${result.rows.length} Person(s) by the name ${person[0]}:`);
        let i = 1;
        result.rows.forEach((item) => {
          console.log(`- ${i}: ${item.first_name} ${item.last_name}, born '${item.birthdate}`);
          i++;
        });
        client.end();
      });

    } else {
      if (err) {
        return console.error("error running query", err);
      }
      console.log(`Found ${result.rows.length} Person(s) by the name ${person[0]}:`);
      let i = 1;
      result.rows.forEach((item) => {
        console.log(`- ${i}: ${item.first_name} ${item.last_name}, born '${item.birthdate}`);
        i++;
      });
      client.end();
    }
  });
});