import { ResponseMessage } from "../../graphql/types";
import Task from "../../domain/entity/todo";
import { throwTaskNotFound } from "../../helpers/errors";

const deleteTaskService = {
  deleteTask: async (id: String, res: Response): Promise<ResponseMessage> => {
    const task = await Task.findOne({ _id: id });
    if (!task) return throwTaskNotFound(res);
    await task.deleteOne({ _id: id });
    return {
      isSuccess: true,
      message: "Task is successfully deleted.",
      type: "TaskDeleted",
      data: null,
    };
  },
  deleteTasks: async (
    input: String[],
    res: Response
  ): Promise<ResponseMessage> => {

    if (input.length === 0) {
      return {
        isSuccess: false,
        message: "No tasks to delete.",
        type: "Error",
        data: null,
      };
    }

    const tasks = await Task.find({ _id: { $in: input } });

    // Check if all tasks exist, and handle missing tasks
    const missingTasks = input.filter(id => !tasks.some(task => task._id.toString() === id));
    if (missingTasks.length > 0) {
      return throwTaskNotFound(res);
    }

    await Promise.all(tasks.map(async (task) => {
      await task.deleteOne();
    }));

    return {
      isSuccess: true,
      message: "Selected tasks are successfully deleted.",
      type: "TaskDeleted",
      data: null,
    };
  },
};

export default deleteTaskService
