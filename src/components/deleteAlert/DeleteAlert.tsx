import './style.scss';

interface DeleteAlertProps {
    todoItemText: string;
    onDelete: () => void;
    onCancel: () => void;
}
export const DeleteAlert = ({onCancel, onDelete, todoItemText}: DeleteAlertProps) => {

    return(
        <div className="alertContainer" data-testid="delete-alert">
            <div className="alertContent">
                <p>{`Todo item "${todoItemText}" will be deleted. Are you sure?`}</p>
                <div className="actions">
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={onDelete} data-testid="approve-delete">Yes, Delete</button>
                </div>
            </div>
        </div>
    )
}
