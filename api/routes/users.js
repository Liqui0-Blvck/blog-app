import express from 'express'
import { showUsers } from '../controllers/users.js'

const routes = express.Router()

routes.get('/users', showUsers)

export default routes