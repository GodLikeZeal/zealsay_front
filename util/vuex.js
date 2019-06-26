export const set = property => (state, payload) => {
  state[property] = payload
  try {
    localStorage.setItem(property, payload)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

export const toggle = property => state => (state[property] = !state[property])
