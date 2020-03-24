const express = require('express');


const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const restricted = require('../auth/restricted-middleware.js');

const server = express();


server.use(express.json());


server.use('/api/auth', authRouter);
server.use('/api/users', restricted, checkRole("admin"), usersRouter);

server.get('/', (req, res) => {
  res.send("Server is up and running");
});

function checkRole (role) {
  return (req, res, next) => {
    if(req.decodedToken && req.decodedToken.department && req.decodedToken.department.toLowerCase() === role){
      next();

    } else {
      res.status(403).json({errorMessage: "shall not pass!"});
    }
  }
}

module.exports = server;
