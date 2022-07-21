import { assign, createMachine } from "xstate";

type TodoAppMachineEvents =
  | { type: "ADD_TODO" }
  | { type: "CHANGE_ADD_INPUT"; value: string }
  | { type: "SUBMIT_FOR_SAVING" }
  | { type: "DELETE_TODO"; value: string };

type TodoAppMachineServices = {
  loadTodos: { data: string[] };
  saveTodo: { data: void };
  deleteTodo: { data: void };
};

export const todoAppMachine = createMachine(
  {
    context: {
      todos: [] as string[],
      errorMessage: undefined as string | undefined,
      createNewTodoInput: "" as string,
    },
    tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
    schema: {
      events: {} as TodoAppMachineEvents,
      services: {} as TodoAppMachineServices,
    },
    initial: "loading",
    states: {
      loading: {
        invoke: {
          src: "loadTodos",
          onDone: [
            {
              actions: "setTodos",
              cond: "hasData",
              target: "todosLoaded",
            },
            {
              target: "creatingNewTodo",
            },
          ],
          onError: [
            {
              actions: "setErrorMessage",
              target: "loadingFailed",
            },
          ],
        },
      },
      todosLoaded: {
        on: {
          ADD_TODO: {
            target: "creatingNewTodo",
          },
          DELETE_TODO: {
            target: "deletingTodo",
          },
        },
      },
      loadingFailed: {},
      creatingNewTodo: {
        initial: "showingFormInput",
        states: {
          showingFormInput: {
            on: {
              CHANGE_ADD_INPUT: {
                actions: "changeCreateInput",
              },
              SUBMIT_FOR_SAVING: {
                target: "savingFormInput",
              },
            },
          },
          savingFormInput: {
            invoke: {
              src: "saveTodo",
              onDone: [
                {
                  target: "#todoMachine.loading",
                  actions: "clearCreateInput",
                },
              ],
              onError: [
                {
                  actions: "setErrorMessage",
                  target: "showingFormInput",
                },
              ],
            },
          },
        },
      },
      deletingTodo: {
        invoke: {
          src: "deleteTodo",
          onDone: [
            {
              target: "loading",
            },
          ],
          onError: [
            {
              actions: "setErrorMessage",
              target: "deletingFailed",
            },
          ],
        },
      },
      deletingFailed: {
        after: {
          "2500": {
            target: "todosLoaded",
          },
        },
      },
    },
    id: "todoMachine",
  },
  {
    actions: {
      setTodos: assign({
        todos: (_, event) => event.data,
      }),
      setErrorMessage: assign({
        errorMessage: (_, event) => (event.data as Error).message,
      }),
      changeCreateInput: assign({
        createNewTodoInput: (_, event) => event.value,
      }),
      clearCreateInput: assign({
        createNewTodoInput: (context, event) =>
          (context.createNewTodoInput = ""),
      }),
    },
    guards: {
      hasData: (_, event) => event.data.length > 0,
    },
  }
);
