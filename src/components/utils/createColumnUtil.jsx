export function createColumnUtil(title, id) {
  const colors = ["#49C4E5", "#8471F2", "#67E2AE", "#FF7A59"]

  return {
    id: id || Date.now().toString(),
    title,
    color: colors[Math.floor(Math.random() * colors.length)],
    tasks: []
  }
}