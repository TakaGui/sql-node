const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
  async show(request, response) {
    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.iLike]: '%@outlook.com'
        }
      },
      include: [
        { 
          association: 'addresses', 
          where: { street: 'Rua Caraguatatuba' } 
        },
        {
          association: 'techs',
          required: false,
          where: {
            name: {
              [Op.iLike]: 'React%'
            }
          }
        }
      ]
    })

    return response.json(users);
  }
};