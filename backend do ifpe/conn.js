const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'aluno',
    password: 'ifpecjbg',
    database: 'ifshoes'
  });

  db.connect(err => {
    if (err) {
      console.error('Error connecting to the database:', err.message);
      return;
    }
    console.log('Connected to the MySQL database');
  });

module.exports = db