import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface ITask {
    _id: string;
    title: string;
    description?: string;
    userId: string;
    fromDate: Date;
    toDate: Date;
    fromTime: string;
    toTime: string;
    imageUrl: string;
    status: "NEW" | "INPROGRESS" | "COMPLETED";
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
    {
        _id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 200,
        },
        userId: {
            type: String,
            ref: 'User',
            required: true,
        },
        fromDate: {
            type: Date,
            required: true,
        },
        toDate: {
            type: Date,
            required: true,
        },
        fromTime: {
            type: String,
            required: true,
        },
        toTime: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["NEW", "INPROGRESS", "COMPLETED"],
            required: true,
        },
        isActive: {
            type: Boolean,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const TaskMongoModel = mongoose.model<ITask>("Task", taskSchema);
export type toDoExtended = ITask & mongoose.Document<any, any>
export default TaskMongoModel;
