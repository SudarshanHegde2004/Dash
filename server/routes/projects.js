const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_FILE = path.join(__dirname, '../storage/projects.json');

// Helper: Read existing projects
const readProjects = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

// Helper: Save projects to file
const saveProjects = (projects) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2));
};

// GET all projects
router.get('/', (req, res) => {
  const projects = readProjects();
  res.json(projects);
});

// POST new project
router.post('/', (req, res) => {
  const projects = readProjects();
  const newProject = {
    id: Date.now(),
    ...req.body
  };
  projects.push(newProject);
  saveProjects(projects);
  res.status(201).json(newProject);
});

module.exports = router;
