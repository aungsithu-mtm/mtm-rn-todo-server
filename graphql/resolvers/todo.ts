import { ApolloError } from "apollo-server-errors";
import Task from "../../domain/entity/todo"
import { TaskCreateInput, UpdateTaskInput, UpdateTaskStatusInput } from '../types'
import {
    throwTaskNotFound,
    validateAuthentication,
} from "../../helpers/errors";
import updateTaskService from "../../services/todoService/updateTask";
import createTask from "../../services/todoService/createTask";
import deleteTaskService from "../../services/todoService/deleteTask"

export default {
    Query: {
        tasks: async (_, args, { res, req }) => {
            try {
                validateAuthentication(req, res);
                const userId = req.userId;

                const tasks = await Task.aggregate([
                    {
                        $match: {
                            userId: userId,
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "userId",
                            foreignField: "_id",
                            as: "taskOwner",
                        },
                    },
                    {
                        $sort: {
                            createdAt: -1,
                        },
                    },
                ]);

                return tasks;
            } catch (error) {
                throw new ApolloError(error);
            }
        },
        tasksByDate: async (_, { date }: { date: String }, { res, req }) => {
            try {
                validateAuthentication(req, res);
                const userId = req.userId;
                const startOfDay = new Date(date as string);
                startOfDay.setUTCHours(0, 0, 0, 0);
                const endOfDay = new Date(date as string);
                endOfDay.setUTCHours(23, 59, 59, 999);
                const tasks = await Task.aggregate([
                    {
                        $match: {
                            userId: userId,
                            date: {
                                $gte: startOfDay,
                                $lte: endOfDay,
                            },
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "userId",
                            foreignField: "_id",
                            as: "taskOwner",
                        },
                    },
                    {
                        $sort: {
                            createdAt: -1,
                        },
                    },
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
                const response = await updateTaskService.updateTask(input, id, res);
                return response;
            } catch (error) {
                throw new ApolloError(error);
            }
        },
        updateTaskStatus: async (
            _,
            { input }: { input: UpdateTaskStatusInput },
            { res, req }
        ) => {
            try {
                validateAuthentication(req, res);
                const response = await updateTaskService.updateTaskStatus(input, res);
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
