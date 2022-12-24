export enum Action {
    CREATE = "CREATE",
    DELETE = "DELETE",
    VERIFY = "VERIFY",
}
export interface TodoListAction {
    id?: string;
    action: Action;
    text?: string;
}
