// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setTodos: "done.invoke.todoMachine.loading:invocation[0]";
    setErrorMessage:
      | "error.platform.todoMachine.loading:invocation[0]"
      | "error.platform.todoMachine.creatingNewTodo.savingFormInput:invocation[0]";
    changeCreateInput: "CHANGE_ADD_INPUT";
  };
  internalEvents: {
    "done.invoke.todoMachine.loading:invocation[0]": {
      type: "done.invoke.todoMachine.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.todoMachine.loading:invocation[0]": {
      type: "error.platform.todoMachine.loading:invocation[0]";
      data: unknown;
    };
    "error.platform.todoMachine.creatingNewTodo.savingFormInput:invocation[0]": {
      type: "error.platform.todoMachine.creatingNewTodo.savingFormInput:invocation[0]";
      data: unknown;
    };
    "done.invoke.todoMachine.creatingNewTodo.savingFormInput:invocation[0]": {
      type: "done.invoke.todoMachine.creatingNewTodo.savingFormInput:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    loadTodos: "done.invoke.todoMachine.loading:invocation[0]";
    saveTodo: "done.invoke.todoMachine.creatingNewTodo.savingFormInput:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "loadTodos" | "saveTodo";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    loadTodos: "done.invoke.todoMachine.creatingNewTodo.savingFormInput:invocation[0]";
    saveTodo: "SUBMIT_FOR_SAVING";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "loading"
    | "todosLoaded"
    | "loadingFailed"
    | "creatingNewTodo"
    | "creatingNewTodo.showingFormInput"
    | "creatingNewTodo.savingFormInput"
    | { creatingNewTodo?: "showingFormInput" | "savingFormInput" };
  tags: never;
}