const fsm = (spec) => {
  let state = spec.initial
  return {
    dispatch (action) {
      let nextState = spec.states[state][action]
      if (nextState === undefined) { return }
      state = (typeof nextState === 'function')
        ? nextState()
        : nextState
    },
    getState () { return state }
  }
}

module.exports = fsm
