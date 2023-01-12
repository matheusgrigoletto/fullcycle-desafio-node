const app = require('express')();
const mysql = require('mysql2');

const PORT = 3000;
const connectionConfig = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};
const people = [
  'John Doe',
  'Andie Georgelin',
  'Joella Hampshire',
  'Tedd Mahony',
  'Lyndy Latehouse',
  'Trent Edger',
  'Christy Comfort',
  'Naomi Fehely',
  'Vinny Bettlestone',
  'Vicky Andrysek',
  'Geri Cacacie',
  'Forrester Binnell',
  'Bernadine Corthes',
  'Myra Gouldthorp',
  'Nial Abercromby',
  'Del Ronan',
  'Joellyn Ossulton',
  'Caddric Manjot',
  'Ramona Cloake',
  'Gweneth Jannasch',
  'Letty McKeurton',
  'Foo Bar',
];

app.get('/', async (_, res) => {
  res.setHeader('Context-Type', 'text/html');

  try {
    await insertRecords();
    const records = await getRecords();
  
    const html = `<h1>Full Cycle Rocks!</h1>
      <ul>
        ${records.map(({ name }) => `<li>${name}</li>`).join('')}
      </ul>
    `;
  
    res.send(html);
  } catch (err) {
    console.log(err);
    res.send('erro');
  }
});

app.listen(PORT, () => console.log(`Servidor executando na porta ${PORT}`));

async function query(sql) {
  const connection = mysql.createConnection(connectionConfig);

  console.log({ sql });

  const queryPromise = new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  })

  const queryResults = await queryPromise;

  connection.end();
  return queryResults;
}

async function insertRecords() {
  const sqlTable = `CREATE TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))`;
  await query(sqlTable);

  const randomIndex = Math.floor(Math.random() * people.length);
  const sqlInsert = `INSERT INTO people(name) VALUES ("${people[randomIndex]}")`;
  await query(sqlInsert);
}

async function getRecords() {
  return await query(`SELECT * FROM people`);
}
