const capitalize = (string: string) => {
  const first = string.substring(0, 1).toUpperCase()
  const rest = string.substring(1, string.length)
  return `${first}${rest}`
}
export default capitalize
