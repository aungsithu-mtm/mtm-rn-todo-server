export type TaskCreateInput = {
    title: string;
    description: string;
    date: string;
    fromTime: string;
    toTime: string;
    imageUrl: string;
    isActive: boolean;
}

export type UpdateTaskInput = {
    _id: string;
    title: string;
    description: string;
    date: string;
    fromTime: string;
    toTime: string;
    imageUrl: string;
    isActive: boolean;
    status: string;
}

export type UpdateTaskStatusInput = {
    _id: string;
    status: string;
}




