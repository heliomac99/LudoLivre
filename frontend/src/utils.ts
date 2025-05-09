export function base64ArrayToFiles(base64List: string[], prefix = 'imagem'): File[] {
  return base64List.map((base64, index) => {
    const arr = base64.split(',')
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png'
    const bstr = atob(arr[1])
    const u8arr = new Uint8Array(bstr.length)

    for (let i = 0; i < bstr.length; i++) {
      u8arr[i] = bstr.charCodeAt(i)
    }

    return new File([u8arr], `${prefix}-${index}.png`, { type: mime })
  })
}

export function base64ToFile(base64: string, filename: string): File {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png'
  const bstr = atob(arr[1])
  const u8arr = new Uint8Array(bstr.length)

  for (let i = 0; i < bstr.length; i++) {
    u8arr[i] = bstr.charCodeAt(i)
  }

  return new File([u8arr], filename, { type: mime })
}
