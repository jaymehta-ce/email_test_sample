/* eslint-disable linebreak-style*/
/*eslint-disable */

const { Client } = require('pg');
const client = new Client({
  host: process.env.host,
  port: process.env.dbport,
  user: process.env.user,
  password: process.env.password,
})

exports.saverecord = (req, res, status) => {
     try {
      client.connect();
      const text = 'INSERT INTO messagetbl(from,to,status,date) VALUES($1, $2, $3, $4) RETURNING *';
      const values = [req.body.from, req.body.to,status, 'NOW()']
      client.query(text, values, (err, res) => {
        if (err) throw err
          client.end()
      });
    } catch (err) {
      console.log(err.stack)
    }
};