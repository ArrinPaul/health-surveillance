const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mock user storage (replace with Convex integration later)
const mockUsers = [];

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password, role, location } = req.body;

  try {
    // Check if user already exists
    const existingUser = mockUsers.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = { 
      id: Date.now().toString(), 
      name, 
      email, 
      password: hashedPassword, 
      role, 
      location,
      createdAt: new Date().toISOString()
    };
    mockUsers.push(user);

    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Find user by email in mock storage
    const user = mockUsers.find(u => u.email === email);
    
    // If no user in mock storage, allow login for demo purposes
    if (!user && email && password) {
      // Create a demo user for testing
      const demoUser = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        role: role || 'health-worker',
        location: 'Demo Location'
      };
      
      // Generate JWT
      const token = jwt.sign(
        { id: demoUser.id, role: demoUser.role },
        process.env.JWT_SECRET || 'default-secret-key',
        { expiresIn: '1h' }
      );

      return res.status(200).json({ 
        token, 
        role: demoUser.role,
        user: demoUser,
        message: 'Demo login successful'
      });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'default-secret-key',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, role: user.role, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    // Find user in mock storage
    const user = mockUsers.find(u => u.id === req.user.id);
    
    if (!user) {
      // Return demo user profile for testing
      return res.status(200).json({
        id: req.user.id,
        name: 'Demo User',
        email: 'demo@example.com',
        role: req.user.role || 'health-worker',
        location: 'Demo Location'
      });
    }

    // Remove password from response
    const { password, ...userProfile } = user;
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};