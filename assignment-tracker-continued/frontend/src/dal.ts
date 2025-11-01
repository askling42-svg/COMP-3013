import { BASE_URL } from "./constants";

export function createAssignment(task: string) {
    fetch(`${BASE_URL}/assignments`, {
      method: "post",
      body: JSON.stringify({ task }),
      headers: {"Content-Type": "application/json"}
    });
}

export function deleteAssignment(id: string) {
    fetch(`${BASE_URL}/assignments/${id}/delete`, {
      method: "post",
    });
}

export function toggleAssignment(id: string) {
    fetch(`${BASE_URL}/assignments/${id}/toggle`, {
      method: "post",
    });
}