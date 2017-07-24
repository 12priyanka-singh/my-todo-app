const initState = window.localStorage.getItem('data') ?  JSON.parse(window.localStorage.getItem('data')): {};
const todos = (state = initState, action) => {
  const loginUser = window.localStorage.getItem('loginUser');

  switch (action.type) {
    case 'ADD_TODO':
      if (state[loginUser]) {
        const newState = Object.assign({}, state, {
          [loginUser]: [
              ...state[loginUser],
              {
                id: action.id,
                text: action.text,
                completed: false
              }
          ]
        });
        window.localStorage.setItem('data', JSON.stringify(newState));
        return Object.assign({}, state, {
          [loginUser]: [
              ...state[loginUser],
              {
                id: action.id,
                text: action.text,
                completed: false
              }
          ]
        });
      } else {
        const newState = Object.assign({}, state, {
          [loginUser]: [
              {
                id: action.id,
                text: action.text,
                completed: false
              }
          ]
        });
        window.localStorage.setItem('data', JSON.stringify(newState));
        return Object.assign({}, state, {
          [loginUser]: [
              {
                id: action.id,
                text: action.text,
                completed: false
              }
          ]
        });
      }
    case 'TOGGLE_TODO':
      const userTodos = state[loginUser];
      const newState = Object.assign({}, state, {
        [loginUser]: [
          ...userTodos.map(todo =>
            (todo.id === action.id)
              ? Object.assign({}, todo, {completed: !todo.completed})
              : todo
          )
        ]
      });
      window.localStorage.setItem('data', JSON.stringify(newState))
      return Object.assign({}, state, {
        [loginUser]: [
          ...userTodos.map(todo =>
            (todo.id === action.id)
              ? Object.assign({}, todo, {completed: !todo.completed})
              : todo
          )
        ]
      });
    default:
      return state
  }
}

export default todos
