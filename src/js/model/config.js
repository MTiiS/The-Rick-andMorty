const CONFIG = {
  TOTAL_PAGES: 34,
  TOTAL_PAGIN_BUTTONS: 7,
  OFFSET_STEP: 3,

  PREV_BUTTON: {
    id: "prev",
    content: "<<"
  },
  NEXT_BUTTON: {
    id: "next",
    content: ">>"
  }
}

function getConfig(name) {
  if (name) return CONFIG[name];
  return CONFIG;
}

export { getConfig }