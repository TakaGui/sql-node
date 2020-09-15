const User = require('../models/User');
const Address = require('../models/Address');

module.exports = {
  async store(request, response) {
    const { user_id } = request.params;
    const { zip_code, street, number } = request.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return response.status(400).json({ error: 'User not found' });
    }

    const address = await Address.create({
      zip_code,
      street,
      number,
      user_id,
    });

    return response.json(address);
  }
};
