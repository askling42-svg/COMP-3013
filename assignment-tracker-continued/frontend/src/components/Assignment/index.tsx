import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import { BsFillCheckCircleFill } from "react-icons/bs";

export function Assignment({
  id,
  assignment,
  completed,
  handleDeleteButton,
  handleCompletedTask,
}: {
  id: string;
  assignment: string;
  completed: boolean;
  handleDeleteButton: (id: string) => void;
  handleCompletedTask: (id: string, complete: boolean) => void;
}) {
  const checkCompleteIcon = () => {
    if (completed) {
      return <BsFillCheckCircleFill />;
    } else {
      return <div />;
    }
  };
  const checkCompleteText = () => {
    if (completed) {
      return <p className={styles.textCompleted}>{assignment}</p>;
    } else {
      return <p>{assignment}</p>;
    }
  };
  return (
    <div className={styles.assignment}>
      <button
        className={styles.checkContainer}
        onClick={() => {
          handleCompletedTask(id, !completed);
        }}
      >
        {checkCompleteIcon()}
      </button>

      {checkCompleteText()}

      <button
        className={styles.deleteButton}
        onClick={() => handleDeleteButton(id)}
      >
        <TbTrash size={20} />
      </button>
    </div>
  );
}
