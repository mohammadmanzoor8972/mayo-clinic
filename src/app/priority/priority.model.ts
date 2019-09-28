export interface Priority {
    _id: string;
    _etag: string;
    departmentId: string;
    // listId: number;
    startAtDay: number;
    endAtDay: number;
    // perhaps infer the start/end based on gt/lt
}
