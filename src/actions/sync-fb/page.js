export default function (message) {
  return new Promise((resolve, reject) => {
    resolve({ status: 'success', message })
  })
}
