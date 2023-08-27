import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import { Role, User } from './models'
import * as AdminJSSequelize from '@adminjs/sequelize'
require('dotenv').config();


AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

//Conexão 
const PORT = 3010
const start = async () => {
  const app = express()
  const admin = new AdminJS({
    resources: [User,Role]
  })  

  const adminRouter = AdminJSExpress.buildRouter(admin)
  app.use(admin.options.rootPath, adminRouter)

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()