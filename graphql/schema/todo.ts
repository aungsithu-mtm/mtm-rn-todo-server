import { gql } from "apollo-server-express";

const Task = gql`
    type Task {
        _id: ID
        title: String
        description: String
        userId: String
        date: String
        fromTime: String
        toTime: String
        imageUrl: String
        status: String
        isActive: Boolean
    }
`

const TaskInput = gql`
    input TaskCreateInput {
        title: String
        description: String
        date: String
        fromTime: String
        toTime: String
        imageUrl: String
        isActive: Boolean
    }

   input UpdateTaskInput {
        _id: String
        title: String
        description: String
        date: String
        fromTime: String
        toTime: String
        imageUrl: String
        isActive: Boolean
        status: String
    }

    input UpdateTaskStatusInput {
        _id: String
        status: String
    }

    input ToggleStatus {
        _id: String
    }
`

const TaskQuery = gql`
    extend type Query{
        tasks: [Task]
        tasksByDate(date: String) : [Task]
        getTask(id: ID): Task
    }
`

const TaskMutation = gql`
    extend type Mutation {
        createTask(input: TaskCreateInput): ResponseMessage
        updateTask(id: String, input: UpdateTaskInput!): ResponseMessage
        updateTaskStatus(input: UpdateTaskStatusInput!): ResponseMessage
        deleteTask(id: String): ResponseMessage
        deleteTasks(input: [String]): ResponseMessage
    }
`

export default [
    Task,
    TaskQuery,
    TaskInput,
    TaskMutation
]