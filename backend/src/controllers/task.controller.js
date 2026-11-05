import Task from "../Models/task.model.js";
export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
    });
    res.json({ message: "Task created successfully", data: task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.update({ status }, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Task updated successfully", data: task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Task deleted successfully", data: task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getTasksbyid = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    res.json({ message: "Task retrieved successfully", data: task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getalltask = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json({ message: "Tasks retrieved successfully", data: tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};