import { useMachine } from "@xstate/react";
import type { NextPage } from "next";
import { todoAppMachine } from "../machines/todoAppMachine";

const mockTodos = new Set<string>(["test1", "test2"]);

const Home: NextPage = () => {
  const [state, send] = useMachine(todoAppMachine, {
    services: {
      loadTodos: async () => {
        return Array.from(mockTodos);
      },
      saveTodo: async (context, event) => {
        mockTodos.add(context.createNewTodoInput);
      },
      deleteTodo: async (context, event) => {
        mockTodos.delete(event.value);
      },
    },
  });

  return (
    <div>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
      {state.matches("todosLoaded") && (
        <button onClick={() => send("ADD_TODO")}>Add Todo</button>
      )}
      {state.matches("creatingNewTodo.showingFormInput") && (
        <>
          <input
            type="text"
            value={state.context.createNewTodoInput}
            onChange={(e) =>
              send({ type: "CHANGE_ADD_INPUT", value: e.target.value })
            }
          />
          <button onClick={() => send({ type: "SUBMIT_FOR_SAVING" })}>
            Add Todo
          </button>
        </>
      )}
      {state.matches("todosLoaded") && (
        <div>
          <ul>
            {state.context.todos.map((todo, index) => (
              <li key={index}>
                {todo}{" "}
                {!state.matches("creatingNewTodo") && (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      send({ type: "DELETE_TODO", value: todo });
                    }}
                  >
                    ❌
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
