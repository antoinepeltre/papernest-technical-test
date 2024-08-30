export interface Task {
    id: string;
    title: string;
    completed: boolean;
    deadline: string;
    isExpired?: boolean;
    position: number;
}
