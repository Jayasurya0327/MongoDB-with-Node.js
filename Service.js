const mongoose = require('mongoose');
module.exports = {
  createUser,
  readUsers,
  updateUser,
  deleteUser
};
// Define the User schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true }
}, { collection: 'Users' });

const User = mongoose.model('User', userSchema);

// Function to connect to the database
async function connectToDatabase() {
    await mongoose.connect('mongodb://localhost:27017/Sample');
}

// Function to close the database connection
async function closeDatabaseConnection() {
    await mongoose.connection.close();
}

// Function to create a new user
async function createUser(newuser) {
     // Connect to the database
     await connectToDatabase();
    const newUser = new User(newuser);
    await newUser.save();
    await closeDatabaseConnection();
}

// Function to read all users
async function readUsers() {
    // Connect to the database
    await connectToDatabase();
    const users = await User.find({});
    return users;
    // Close the database connection
    await closeDatabaseConnection();
}

// Function to update a user by email
async function updateUser(email, updates) {
    // Connect to the database
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate(
      { email },
      updates,
      { new: true }
    );
    if(!updatedUser){
      throw "User Not Found";
    }
    // Close the database connection
    await closeDatabaseConnection();
}

// Function to delete a user by email
async function deleteUser(email) {
    // Connect to the database
    await connectToDatabase();
    const deletedUser = await User.findOneAndDelete({ email });
    if(!deletedUser){
      throw "User Not Found!";
    }
    return deletedUser;
    // Close the database connection
    await closeDatabaseConnection();
}
