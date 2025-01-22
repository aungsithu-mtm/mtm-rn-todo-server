import { ResponseMessage, UpdateTaskInput, UpdateTaskStatusInput } from "../../graphql/types";
import Task from "../../domain/entity/todo";
import { throwTaskNotFound } from "../../helpers/errors";

const updateTaskService = {
  updateTask: async (input: UpdateTaskInput, id: String, res: Response): Promise<ResponseMessage> => {
    const {
      title,
      description,
      isActive,
      date,
      fromTime,
      toTime
    } = input;
    const task = await Task.findOne({ _id: id });
    if (!task) return throwTaskNotFound(res);
    task.title = title;
    task.description = description;
    task.isActive = isActive || task.isActive;
    task.date = new Date(date)
    task.fromTime = fromTime || ''
    task.toTime = toTime || ''
    await task.save();
    return {
      isSuccess: true,
      message: "Task is successfully updated.",
      type: "TaskUpdated",
      data: null,
    };
  },
  updateTaskStatus: async (input: UpdateTaskStatusInput, res: Response): Promise<ResponseMessage> => {
    const { _id, status } = input
    const task = await Task.findOne({ _id: _id });
    if (!task) return throwTaskNotFound(res);
    switch (status) {
      case 'NEW': task.status = 'NEW'; break;
      case 'INPROGRESS': task.status = 'INPROGRESS'; break;
      case 'COMPLETED': task.status = 'COMPLETED'; break;
      default: return throwTaskNotFound(res);
    }
    await task.save();
    return {
      isSuccess: true,
      message: "Task is successfully updated.",
      type: "TaskUpdated",
      data: null,
    };
  }
}

export default updateTaskService