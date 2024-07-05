const express = require('express');
const app = express();
const port=3000;
const {
    createUser,
    readUsers,
    updateUser,
    deleteUser
  } = require('./Service');
  app.use(express.json());
  //fetch all users
  app.get('/api/users', async (req, res) => {
    res.send(await readUsers())
  });
  //create new user
  app.post('/api/newuser', async (req, res) => {
    const newUser = req.body;
    await createUser(newUser);
    res.status(201).json({
      message: 'User added successfully'
    });
  });
  //Update User
  app.put('/api/updateuser', async (req, res) => {
    const email = req.query.email;
    const updatedUser = req.body;
    await updateUser(email,req.body);
    res.status(201).json({
        message:"User Updated successfully"
    });
  });
  //delete user
  app.delete('/api/removeuser',async (req,res) => {
    const email = req.query.email;
    await deleteUser(email);
    res.status(201).json({
        message:"User removed successfully"
    });
  })
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  async function run() {
    try {
     
  
      // Create a new user
      await createUser('Jane Doe', 'jane.doe@example.com', 25);
  
      // Read all users
      const users = await readUsers();
      console.log('Fetched Users:', users);
  
      // Update a user
      await updateUser('jane.doe@example.com', { age: 26 });
  
      // Delete a user
      await deleteUser('jane.doe@example.com');
    } catch (err) {
      console.error('Error in run function:', err);
    } 
  }
  