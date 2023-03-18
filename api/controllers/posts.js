import { db } from '../db.js';



export const getPosts = (req, res) => {
  const q = req.query.cat 
  ? "SELECT * FROM posts WHERE cat=?"
  : "SELECT * FROM posts"

  db.query(q, [req.query.cat], (err, response) => {
    if (err) return res.status(500).json({ message: err})

    res.status(200).json(response)
  })

}



export const getPost = (req, res) => {
  const q = "SELECT p.id, `username`,`title`,`desc`, p.img, u.img AS userImg ,`cat`,`date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=?"

  db.query(q, [req.params.id], (err, response) => {
    if (err) return res.status(500).json({ message: err})
    res.status(200).json(response[0])
  })
  

  
}

export const addPost = (req, res) => {

  const query = "INSERT INTO posts (`title`,`desc`,`img`,`cat`,`date`, `uid`) VALUES (?)"

  const values = [req.body.title, req.body.desc, req.body.img, req.body.cat, req.body.date, req.body.uid]

  console.log(values)

  db.query(query, [values], (err, response) => {
    if (err) return res.status(500).json({ message: err})
    res.status(200).json("Post added successfully")
  })



}


export const deletePost = (req, res) => {

  const query = "SELECT `id`, `uid` FROM posts WHERE id= ?"

  db.query(query, [req.params.id], (err, response) => {
    if (err) return res.status(500).json({ message: err})

    db.query("DELETE FROM posts WHERE id=?", [req.params.id], (err, response) => {
      if (err) return res.status(500).json({ message: err})
      res.status(200).json(response)
      console.log(response)
      console.log(err)
    })
  })

}

export const updatePost = (req, res) => {

  const query  = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=?, `date`=?  WHERE `id`=? AND `uid`=?" 

  const postId = req.params.id
  const userId = req.body.uid

  const values = [req.body.title, req.body.desc, req.body.img, req.body.cat, req.body.date]
  

  db.query(query, [...values, postId, userId], (err, response) => {
    if (err) return res.status(500).json({ message: err})
    res.status(200).json("Post added updated successfully")
  })

}