const express = require('express');
const app = express();
const port = 3000;
const {
  createUser,
  readUsers,
  updateUser,
  deleteUser
} = require('./Service');
app.use(express.json());
//fetch all users
app.get('/api/users', async (req, res) => {
  try {
    res.send(await readUsers())
  }
  catch (err) {
    res.status(400).json({
      message: err
    });
  }
});
//create new user
app.post('/api/newuser', async (req, res) => {
  try {
    const newUser = req.body;
    await createUser(newUser);
    res.status(201).json({
      message: 'User added successfully'
    });
  }
  catch (err) {
    res.status(400).json({
      message: err
    });
  }

});
//Update User
app.put('/api/updateuser', async (req, res) => {
  try {
    const email = req.query.email;
    const updatedUser = req.body;
    await updateUser(email, req.body);
    res.status(201).json({
      message: "User Updated successfully"
    });
  }
  catch (err) {
    res.status(400).json({
      message: err
    });
  }
});
//delete user
app.delete('/api/removeuser', async (req, res) => {
  try {
    const email = req.query.email;
    await deleteUser(email);
    res.status(201).json({
      message: "User removed successfully"
    });
  }
  catch (err) {
    res.status(400).json({
      message: err
    });
  }
})
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

