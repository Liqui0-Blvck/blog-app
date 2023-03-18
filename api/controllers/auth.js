import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { secret } from '../constant/secret.js'

export const register = (req, res) => {

  const q = "SELECT * FROM users WHERE email = ? OR username = ?";
  
  db.query(q, [req.body.email, req.body.username], (err, result) => {
    if (err) return res.json(err)
    if (result.length > 0) {
      return res.status(409).json({ error: 'User already exists' })
    }

    // encrypt password hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const query = "INSERT INTO users (username, email, password) VALUES (?,?,?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(query, values, (err, result) => {
      if (err) return res.json(err)
      return res.status(201).json({ message: 'User created' })
    })

  })

}

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, result) => {
    if (err) return res.status(500).json(err)
    if (result.length === 0) return res.status(404).json({ error: 'User not found' })
    
    // check the password
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, result[0].password);

    if(!isPasswordCorrect) return res.status(401).json({ error: 'Wrong username or password' })

    const token = jwt.sign({ id: result[0].id }, secret);

    const {password, ...other} = result[0]

    
    res.cookie("access_token", token ,{
        httpOnly: true,
        path: '/'
      })
      .status(200)
      .json(other)
  })

  
}



export const logout = (req, res) => {
  res.clearCookie("token", {
    sameSite: 'none',
    secure: true
  })
  res.status(200).json({ message: 'Logged out' })
}