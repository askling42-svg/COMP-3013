import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import { useState } from "react";
type Props = {addAssignment: (text: string) => void};

export function Header({addAssignment}: Props) {
  const [text, setText] = useState("");

  const hanndleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAssignment(text);
    setText("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <header className={styles.header} onSubmit={hanndleSubmit}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm}>
        <input placeholder="Add a new assignment" value={text} type="text" onChange={handleChange} />
        <button disabled={!text}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
