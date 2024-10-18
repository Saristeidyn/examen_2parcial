import express, { Request, Response } from "express";
import { envs } from './config/envs';
import { dbConnection } from "./db/init";
import { Task} from './db/models/user.model';

const app = express();
app.use(express.json()); // Middleware for parsing JSON bodies

dbConnection(); // Initialize database connection

// In-memory task list as an example (you would replace this with a database in production)
//let todos: Array<{ id: number, title: string, description: string, completed: boolean }> = [];

// 1. GET /todos - Retrieve all tasks
app.get("/todos", async (req: Request, res: Response): Promise<any> => {
    try {
      const todos = await Task.findAll(); // Fetch all tasks from the database
      return res.json(todos);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving tasks" });
    }
  });

// 2. GET /todos/:id - Retrieve a task by its ID
app.get("/todos/:id", async (req: Request, res: Response): Promise<any> => {
    const taskId = parseInt(req.params.id);
    try {
      const todo = await Task.findByPk(taskId); // Find a task by its primary key (ID)
      if (todo) {
        return res.json(todo);
      } else {
        return res.status(404).json({ message: "Task not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving task" });
    }
  });

// 3. POST /todos - Create a new task
app.post("/todos", async (req: Request, res: Response): Promise<any> => {
    const { title, description, completed = false } = req.body;

    // Create a new task
    const newTask = {
        title,
        description,
        completed
    };
    const dbTask = await Task.create(newTask); // Save to database
    return res.status(201).json(dbTask);
});

// 4. PUT /todos/:id - Update an existing task by its ID
app.put("/todos/:id", async (req: Request, res: Response): Promise<any> => {
    const taskId = parseInt(req.params.id);
    const { title, description, completed } = req.body;
  
    try {
      const todo = await Task.findByPk(taskId);
  
      if (todo) {
        // Update the task fields
        todo.title = title || todo.title;
        todo.description = description || todo.description;
        todo.completed = completed !== undefined ? completed : todo.completed;
  
        await todo.save(); // Save the updated task to the database
        return res.json(todo);
      } else {
        return res.status(404).json({ message: "Task not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error updating task" });
    }
  });

// 5. DELETE /todos/:id - Delete a task by its ID
app.delete("/todos/:id", async (req: Request, res: Response): Promise<any> => {
    const taskId = parseInt(req.params.id);
  
    try {
      const result = await Task.destroy({
        where: { id: taskId }
      });
  
      if (result) {
        return res.json({ message: "Task deleted successfully" });
      } else {
        return res.status(404).json({ message: "Task not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error deleting task" });
    }
  });

// Start the server
app.listen(3000, () => {
    console.log("App running on port 3000");
});
