//@ts-nocheck
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import { Company, Employee, Role, User } from './models'
import * as AdminJSSequelize from '@adminjs/sequelize'
import * as AdminJSMongoose from '@adminjs/mongoose'
import session from 'express-session';
import { generateResource } from './utils/modelingModels';
import { encryptPassword } from './utils/userUtils';
import { sequelize } from './db';
require('dotenv').config();
const mysqlStore = require('express-mysql-session')(session);
import bcrypt from "bcrypt";
import locale from './locales'
import form from './routes/form';
import http from 'http';
import { Server } from "socket.io";
import { SocketDataForm } from './interfaces/SocketInterface'
import FormController from './controllers/FormController'


AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource, 
  Database: AdminJSMongoose.Database
});

const PORT = 3011
const formCtrl = new FormController();

const start = async () => {
  const app = express()
  const server = http.createServer(app);
  const io = new Server<SocketDataForm>(server);
  
  sequelize.sync().then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });

  const admin = new AdminJS({
    resources: [
      generateResource(User, {
        password: {
          type: 'password',
          isVisible: {
            add: true, list: false, edit: true, filter: false, show: false
          }
        }
      }, {
        new: {
          before: async (request: any) => {
            return encryptPassword(request);
          }
        },
        edit: {
          before: async (request: any) => {
            return encryptPassword(request);
          }
        },
      }),
      generateResource(Role),
      generateResource(Employee),
      generateResource(Company)
    ],
    dashboard: {
      component: AdminJS.bundle('./components/dashboard.tsx')
    },
    branding: {
      favicon: "https://cdn-icons-png.flaticon.com/512/5146/5146077.png",
      logo: "https://cdn-icons-png.flaticon.com/512/5146/5146077.png",
      companyName: "Gestor de Funcionários"
    },
    ...locale,
  })  

  const sessionStore = new mysqlStore({
    connectionLimit: 10,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    createDatabaseTable: true
  })

  const secret = 'tsiVAtrIm9w6brtVZ7LhheemelWsTWU2';
  const cookieName = 'adminjs';
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate: async (email: string, password: string) => {
        const user = await User.findOne({ where: { email } });
        if (user) {
          const verifica = await bcrypt.compare(password, user.getDataValue('password'));
          if(verifica){
            return user;
          }
          return false;
        }
        return false;
      },
      cookieName: cookieName,
      cookiePassword: secret
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: secret,
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production'
      },
      name: cookieName
    }
  )
  app.use(admin.options.rootPath, adminRouter);

  app.use('/form', form);

  io.on('connection', (socket) => {
    console.log("Usuário se conectou.");

    socket.on('SEND_FORM', (data) => {
      const { message, user_sender, user_receptor, cpf, email, name } = data;
      formCtrl.sendForm(message, user_sender, user_receptor, cpf, email, name)

      io.emit('RECEIVE_FORM', data)    
      })

    socket.on("disconnect", (reason)=>{console.log('Desconectou')} );
  })



  server.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()