const userModel = require("../models/user.model");

class UserService {
  // Find all users without populating category
  findAllUser = async () => userModel.find().select({ password: 0 });

  // Find user by username with populated category
  findByUsername = async (username) => {
    try {
      const userResult = await userModel.findOne({ username });
      console.log(userResult)
      return userResult;
    } catch (error) {
      throw error;
    }
  };

  // Find user by ID with populated category
  findById = async (id) => {
    try {
      const userId = await userModel.findById(id);
      console.log(userId)
      return userId;
    } catch (error) {
      throw error;
    }
  };

  // Create a new user
  createUser = async (body) => userModel.create(body);

  // Delete a user by ID
  deleteById = async (id) => userModel.findByIdAndDelete({ _id: id });

  // Update a user by ID
  updateById = async (id, body) => userModel.findByIdAndUpdate({ _id: id }, body, { new: true });
}

module.exports = UserService;
