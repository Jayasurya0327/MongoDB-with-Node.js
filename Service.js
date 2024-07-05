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
  try {
    await mongoose.connect('mongodb://localhost:27017/Sample');
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err;
  }
}

// Function to close the database connection
async function closeDatabaseConnection() {
  try {
    await mongoose.connection.close();
  } catch (err) {
    console.error('Error closing the database connection:', err);
  }
}

// Function to create a new user
async function createUser(newuser) {
  try {
     // Connect to the database
     await connectToDatabase();
    const newUser = new User(newuser);
    await newUser.save();
  } catch (err) {
    console.error('Error creating user:', err);
  }
  finally {
    // Close the database connection
    await closeDatabaseConnection();
  }
}

// Function to read all users
async function readUsers() {
  try {
    // Connect to the database
    await connectToDatabase();
    const users = await User.find({});
    return users;
  } catch (err) {
    console.error('Error reading users:', err);
    return [];
  }
  finally {
    // Close the database connection
    await closeDatabaseConnection();
  }
}

// Function to update a user by email
async function updateUser(email, updates) {
  try {
    // Connect to the database
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate(
      { email },
      updates,
      { new: true }
    );
    return updatedUser;
  } catch (err) {
    console.error('Error updating user:', err);
    return null;
  }
  finally {
    // Close the database connection
    await closeDatabaseConnection();
  }
}

// Function to delete a user by email
async function deleteUser(email) {
  try {
    // Connect to the database
    await connectToDatabase();
    const deletedUser = await User.findOneAndDelete({ email });
    return deletedUser;
  } catch (err) {
    console.error('Error deleting user:', err);
    return null;
  }
  finally {
    // Close the database connection
    await closeDatabaseConnection();
  }
}
