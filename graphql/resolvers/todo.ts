import { ApolloError } from "apollo-server-errors";
import Task from "../../domain/entity/todo"
import { TaskCreateInput, UpdateTaskInput } from '../types'
import {
    throwTaskNotFound,
    validateAuthentication,
} from "../../helpers/errors";
import updateTask from "../../services/todoService/updateTask";
import createTask from "../../services/todoService/createTask";
import deleteTaskService from "../../services/todoService/deleteTask"

export default {
    Query: {
        tasks: async (_, arg, { res, req }) => {
            try {
                validateAuthentication(req, res);
                const tasks = await Task.aggregate([
                    {
                        $lookup: {
                            from: "users",
                            localField: "userId",
                            foreignField: "_id",
                            as: "task",
                        },
                    },
                    {
                        $sort: {
                            createdAt: -1
                        }
                    }
                ]);
                return tasks;
            } catch (error) {
                throw new ApolloError(error);
            }
        },
        getTask: async (_, { id }: { id: String }, { res, req }) => {
            try {
                validateAuthentication(req, res);
                const taskExist = await Task.findOne({ _id: id });
                console.log("Task Exisst", taskExist.date)
                if (!taskExist) throwTaskNotFound(res);
                return taskExist;
            } catch (error) {
                throw new ApolloError(error);
            }
        },
    },
    Mutation: {
        createTask: async (_, { input }: { input: TaskCreateInput }, { res, req }) => {
            try {
                validateAuthentication(req, res);
                const response = await createTask(input, req.userId);
                return response;
            } catch (error) {
                throw new ApolloError(error);
            }
        },
        updateTask: async (
            _,
            { input, id }: { id: String; input: UpdateTaskInput },
            { res, req }
        ) => {
            try {
                validateAuthentication(req, res);
                const response = await updateTask(input, id, res);
                return response;
            } catch (error) {
                throw new ApolloError(error);
            }
        },
        deleteTask: async (_, id: String, { res, req }) => {
            try {
                validateAuthentication(req, res);
                const response = await deleteTaskService.deleteTask(id, res);
                return response;
            } catch (error) {
                throw new ApolloError(error);
            }
        },
        deleteTasks: async (_, { input }: { input: String[] }, { res, req }) => {
            try {
                validateAuthentication(req, res);
                const response = await deleteTaskService.deleteTasks(input, res);
                return response;
            } catch (error) {
                throw new ApolloError(error);
            }
        },
    },
};
