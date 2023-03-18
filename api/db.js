import mysql from 'mysql'

export const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Nico123',
  database: 'blog'
})

db.connect((err) => {
  if (err) throw err
  console.log('connected as id'+ db.threadId)
})

