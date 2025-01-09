import { gql } from "apollo-server-express";

const Task = gql`
    type Task {
        _id: ID
        title: String
        description: String
        userId: String
        fromDate: String
        toDate: String
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
        fromDate: String
        toDate: String
        fromTime: String
        toTime: String
        imageUrl: String
        isActive: Boolean
    }

   input UpdateTaskInput {
        _id: String
        title: String
        description: String
        fromDate: String
        toDate: String
        fromTime: String
        toTime: String
        imageUrl: String
        isActive: Boolean
        status: String
    }

    input UpdateTaskStatusInput {
        _id: String
        status : String
    }
`

const TaskQuery = gql`
    extend type Query{
        tasksQuery: [Task]
        taskDetailQuery(_id: ID): Task
    }
`

const TaskMutation = gql`
    extend type Mutation {
        createTaskResolver(input: TaskCreateInput!): ResponseMessage
    }
`

export default [
    Task,
    TaskQuery,
    TaskInput,
    TaskMutation
]