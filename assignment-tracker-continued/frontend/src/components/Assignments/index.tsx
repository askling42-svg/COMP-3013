import { TAssignment } from "../../interfaces";
import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";
import { deleteAssignment, toggleAssignment } from "../../dal";

type Props = {
  assignments: TAssignment[];
  refetch: () => Promise<void>;
};
export function Assignments({ assignments, refetch }: Props) {
  
  const handleDeleteButton = async (id: string) => {
    await deleteAssignment(id);
    refetch();
  };

  const handleCompletedTask = async (id:string) => {
    await toggleAssignment(id);
    refetch();
  };

  const countCompletedTasks = () => {
    return assignments.filter((assignment) => assignment.completed).length;
  };
  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{assignments.length}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>
            {countCompletedTasks()} of {assignments.length}
          </span>
        </div>
      </header>

      <div className={styles.list}>
        {assignments.map((assignment, index) => (
          <Assignment
            id={assignment.id}
            assignment={assignment.task}
            completed={assignment.completed}
            handleDeleteButton={handleDeleteButton}
            handleCompletedTask={handleCompletedTask}
            key={index}
          />
        ))}
      </div>
    </section>
  );
}
