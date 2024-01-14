/* eslint-disable array-callback-return */
interface RequestChekerAtributes {
  requireList: string[]
  requestData: any
}

export const RequestCheker = (data: RequestChekerAtributes): string => {
  const emptyList: string[] = []

  data.requireList.map((value: string): void => {
    if (data.requestData[value] === undefined) {
      emptyList.push(value)
    }
  })

  return emptyList.toString()
}
