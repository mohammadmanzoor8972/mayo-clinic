export interface Day {
    weekday: number;
    name: string;
}
export interface CapacityMatrix {
    _id: string;
    _etag: string;
    departmentId: string;
    grid: GridItem[];
}

export interface GridItem {
    duration: number;
    day: string;
    physicianId: string;
}
