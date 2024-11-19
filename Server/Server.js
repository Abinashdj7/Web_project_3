const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = 3000;


app.use(cors()); 
app.use(bodyParser.json()); 


const sequelize = new Sequelize('usersdb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, 
});


sequelize.authenticate()
  .then(() => {
    console.log('MySQL connected');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log('Error syncing database:', err));


app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
});

app.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.status(400).json({ message: 'Please provide name, email, and age.' });
    }

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name;
        user.email = email;
        user.age = age;

        await user.save(); 
        res.status(200).json(user); 
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err });
    }
});


app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy(); 
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err });
    }
});

app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ message: 'Please provide name, email, and age.' });
  }

  try {
    const newUser = await User.create({ name, email, age });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
