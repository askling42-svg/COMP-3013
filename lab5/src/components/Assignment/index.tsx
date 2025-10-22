import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import { BsCheckCircleFill } from "react-icons/bs";
import type { TAssgn } from "../../types";
type Props = {
  assignment: TAssgn;
  onDelete: (id: number) => void;
  toggleComplete: (id: number, completed: boolean) => void;
}

export function Assignment(props: Props) {
  const handleDelete = () => {props.onDelete(props.assignment.id)}
  const handleToggle = () => {props.toggleComplete(props.assignment.id, props.assignment.completed)}
  return (
    <div className={styles.assignment}>
      <button className={styles.checkContainer} onClick={handleToggle}>
        {props.assignment.completed ?<BsCheckCircleFill /> : <div />}
      </button>

      <p className={props.assignment.completed ? styles.textCompleted : ""}>{props.assignment.text}</p>

      <button className={styles.deleteButton} onClick={handleDelete}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
