export const signup = (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    res.status(201).json({ message: 'User created successfully' });
  } else {
    res.status(400).json({ message: 'Invalid input' });
  }
};
export const logout = (req, res) => {
  // In a real application, i would handle session termination here
  res.status(200).json({ message: 'Logout successful' });
};
export const login = (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

