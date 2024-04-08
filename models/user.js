// /models/users.js
'use strict';

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  })

  User.associate = function(models) {
  
  }

  User.addHook('beforeCreate', async function(user) {
    const salt = await bcrypt.genSalt(10); //whatever number you want
    console.log(user);
    user.password = await bcrypt.hash(user.password, salt);
  })

  return User;
};
