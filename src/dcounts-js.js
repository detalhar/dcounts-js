(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('dCounts', factory)
  } else if (typeof exports === 'object' && module.exports) {
    module.exports = factory
  } else {
    root.dCounts = factory
  }
}(this, function dCounts(selector, limit=150) {
  if (typeof selector !== 'string' && typeof limit !== 'number') {
    return
  }
  const el = document.getElementById(selector)

  const div = `<div id="counters-${selector}">0 of ${limit} characters</div>`

  const init = () => {
    if (el === null) {
      throw new Error(`Something's wrong with your selector`)
    }
    createDiv()
    el.addEventListener('keyup', counters, false)
  }

  const createDiv = () => el.insertAdjacentHTML('afterend', div)

  const counters = () => {
    let total = limit
    let typedCharacters = el.value.length
    let count = document.getElementById(`counters-${selector}`)
    count.innerHTML = `${typedCharacters} of ${total} characters`

    if (typedCharacters >= total) {
      el.focus()
      el.value = el.value.substring(0, total)
      count.innerHTML = `You have reached the allowed character limit`
    }
  }
  init()
}))
