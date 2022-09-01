function spendingLogsAsTable(spendingLogs) {
  const colsHeader = ["Date", "Name", "Amount"]

  let charsEachColumn = [colsHeader[0].length, colsHeader[1].length, colsHeader[2].length]

  for (let i = 0; i < spendingLogs.length; i++) {
    const {timestamp, name, amount} = spendingLogs[i]

    const year = timestamp.getFullYear();
    let month = timestamp.getMonth() + 1
    month = ('0' + month).slice(-2);
    let date = timestamp.getDate();
    date = ('0' + date).slice(-2);

    const spendingDate = `${year}-${month}-${date}`
    const amountStr = `${amount}`

    charsEachColumn[0] = Math.max(charsEachColumn[0], spendingDate.length)
    charsEachColumn[1] = Math.max(charsEachColumn[1], name.length)
    charsEachColumn[2] = Math.max(charsEachColumn[2], amountStr.length)
  }

  let tableStr = ''

  tableStr += '<pre>\n'
  for (let i = 0; i < spendingLogs.length + 2; i++) {
    for (let j = 0; j < colsHeader.length; j++) {
      let strToWrite = ''
      if (i == 0) {
        const tmp = ` | ${colsHeader[j]}`
        strToWrite = tmp
        for (let k = 0; k < charsEachColumn[j]-tmp.length+3; k++) {
          strToWrite += ' '
        }
        tableStr += strToWrite
      }
      if (i == 1) {
        const tmp = ` |-`
        strToWrite = tmp
        for (let k = 0; k < charsEachColumn[j]-tmp.length+3; k++) {
          strToWrite += '-'
        }
        tableStr += strToWrite
      }
      if (i >= 2) {
        const {timestamp, name, amount} = spendingLogs[i-2]
        
        const year = timestamp.getFullYear();
        let month = timestamp.getMonth() + 1
        month = ('0' + month).slice(-2);
        let date = timestamp.getDate();
        date = ('0' + date).slice(-2);

        const spendingDate = `${year}-${month}-${date}`
        const amountStr = `${amount}`
        const tmpArr = [spendingDate, name, amountStr]

        const tmp = ` | ${tmpArr[j]}`
        strToWrite = tmp
        for (let k = 0; k < charsEachColumn[j]-tmp.length+3; k++) {
          strToWrite += ' '
        }
        tableStr += strToWrite
      }
    }
    tableStr += '|\n'
  }
  tableStr += '</pre>'

  return tableStr
}