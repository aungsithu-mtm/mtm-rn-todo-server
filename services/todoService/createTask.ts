import { TaskCreateInput } from '../../graphql/types'
import { ResponseMessage } from '../../graphql/types';
import { v4 as uuidv4 } from 'uuid';

import Todo from "../../domain/entity/todo"

export default async function createTask(data: TaskCreateInput, userId: String): Promise<ResponseMessage> {
    const { fromDate, toDate } = data;
    const todo = new Todo({
        _id: uuidv4().toString(),
        title: data.title,
        description: data.description,
        userId: userId,
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        fromTime: data.fromTime,
        toTime: data.toTime,
        imageUrl: data.imageUrl || '',
        status: "NEW",
        isActive: true
    });
    await todo.save();
    return {
        isSuccess: true,
        message: "Task is Successfully Created",
        type: "taskCreate",
        data: null
    }
}