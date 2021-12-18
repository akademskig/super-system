const checkError = (res: any) => {
  if (res?.error || res?.statusCode === 401) {
    throw res
  }
  return res
}
export default checkError
