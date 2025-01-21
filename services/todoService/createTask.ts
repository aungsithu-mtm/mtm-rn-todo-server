import { ResponseMessage } from "../../graphql/types";
import { TaskCreateInput } from "../../graphql/types/todoType";
import Task from "../../domain/entity/todo"
import { v4 as uuidv4 } from 'uuid';

export default async function createTask(input: TaskCreateInput, userId: string): Promise<ResponseMessage> {
    const {
        title,
        description,
        date,
        fromTime,
        toTime,
    } = input;
    const task = new Task();
    task._id = uuidv4().toString();
    task.title = title;
    task.description = description;
    task.isActive = true;
    task.userId = userId;
    task.date = new Date(date)
    task.fromTime = fromTime || ''
    task.toTime = toTime || ''
    task.imageUrl = ''
    task.status = 'NEW'
    await task.save();
    return {
        isSuccess: true,
        message: "Task is successfully added.",
        type: "TaskCreated",
        data: null
    }
}