import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { useState } from "react";
import type { TAssgn } from "./types";

function App() {
  const [assignments, setAssignments] = useState<TAssgn[]>([]);
  const [created, setCreated] = useState<number>(0);

  const handleNewAssignment = (text: string) => {
    let id: number = assignments.length + 1;
    let completed: boolean = false;
    let newCount: number = created + 1;
    setAssignments(prevAssignments => [...prevAssignments, {id, text, completed}]);
    setCreated(newCount);
    console.log("New Assignemnt:", text);
  }

  const handleDeleteAssignment = (id: number) => {
    const filteredAssgn: TAssgn[] = assignments.filter(assignment => assignment.id !== id);
    const updatedAssgn: TAssgn[] = filteredAssgn.map((assignment, index) => ({
      ...assignment, id: index + 1
    }))
    setAssignments(updatedAssgn);
  }

  const handleCompleteAssignment = (id: number) => {
    setAssignments(prevAssignments =>
      prevAssignments.map(assignment =>
        assignment.id === id ? {...assignment, completed: true} : assignment
      )
    )
  }

  const handleUncompleteAssignment = (id: number) => {
    setAssignments(prevAssignments =>
      prevAssignments.map(assignment =>
        assignment.id === id ? {...assignment, completed: false} : assignment
      )
    )
  }

  const handleCompletionStatus = (id: number, completed: boolean) => {
    if(completed) {handleUncompleteAssignment(id)}
    else {handleCompleteAssignment(id)}
  }

  return (
    <>
      <Header addAssignment={handleNewAssignment} />
      <Assignments data={assignments} totalCreated={created} onSet={setAssignments} onDelete={handleDeleteAssignment} toggleComplete={handleCompletionStatus}/>
    </>
  );
}

export default App;
