const express = require('express');
const cors = require('cors');
const projectRoutes = require('./routes/projects');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Only this is needed

app.use('/api/projects', projectRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
