import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { TAssignment } from "./interfaces";
import { BASE_URL } from "./constants";

function App() {
  const [assignments, setAssignments] = useState<TAssignment[]>([]);
  const [loading, setLoading] = useState(false);

  async function refetch() {
    setAssignments(await (await fetch(`${BASE_URL}/assignments`)).json());
  }

  const override = {
    margin: "100px auto",
    display: "flex",
    justifyContent: "center"
  }

    useEffect(() => {
      setLoading(true);
      refetch()
        .then(() => setLoading(false));
    }, [])

  return (
    <>
      <Header refetch={refetch} />
      {loading && <PulseLoader color="#f2f2f2" cssOverride={override} />}
      {!loading && <Assignments assignments={assignments} refetch={refetch} />}
    </>
  );
}

export default App;
