import capitalize from './capitalize'

const formatHeader = (key: string) => {
  const i = key.match(/[A-Z]/)
  if (i) {
    const a = key.split(i[0])
    console.log(a)
    console.log(`${capitalize(a[0])} ${i[0]}${a[1]}`)
    return `${capitalize(a[0])} ${i[0]}${a[1]}`
  }
  return capitalize(key)
}
export default formatHeader
