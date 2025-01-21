import { ResponseMessage, UpdateTaskInput } from "../../graphql/types";
import Task from "../../domain/entity/todo";
import { throwTaskNotFound } from "../../helpers/errors";

export default async function updateNote(
  input: UpdateTaskInput,
  id: String,
  res: Response
): Promise<ResponseMessage> {
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
}
