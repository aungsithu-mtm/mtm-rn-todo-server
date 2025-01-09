import { ApolloError } from "apollo-server-errors";
import Todo from "../../domain/entity/todo"
import { TaskCreateInput } from '../types'
import {
    throwTaskNotFound,
    validateAuthentication,
} from "../../helpers/errors";
import createTask from "../../services/todoService/createTask";

export default {
    Query: {
        tasksQuery: async (_, arg, { req, res }) => {
            try {
                validateAuthentication(req, res);
                const tasks = await Todo.find();
                return tasks;
            } catch (error) {
                throw new ApolloError(error);
            }
        },
        taskDetailQuery: async (parent: any, { id }: any, { req, res }) => {
            try {
                validateAuthentication(req, res);
                const taskExist = await Todo.findById(id);
                if (!taskExist) return throwTaskNotFound(res);
                return taskExist;
            } catch (error) {
                throw new ApolloError(error);
            }
        },
    },
    Mutation: {
        createTaskResolver: async (_: any, { input }: { input: TaskCreateInput }, { req, res }) => {
            try {
                const response = await createTask(input, req.userId);
                return response;
            } catch (error) {
                throw new ApolloError(error);
            }
        },
    },
};
