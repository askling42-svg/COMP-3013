import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";
import type { TAssgn } from "../../types";
type Props = {
  data: TAssgn[];
  totalCreated: number;
  onSet: (assgn: TAssgn[]) => void;
  onDelete: (id: number) => void;
  toggleComplete: (id: number, copleted: boolean) => void;
}

export function Assignments(props : Props) {

  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{props.totalCreated}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>{props.data.filter(assignment => assignment.completed === true).length} of {props.data.length}</span>
        </div>
      </header>

      <div className={styles.list}>
        {
          props.data.map((assignment) => (
            <Assignment assignment={assignment} onDelete={props.onDelete} toggleComplete={props.toggleComplete} key={assignment.id} />
          ))
        }
        
      </div>
    </section>
  );
}
