function addChatHistory(sender, type, data){
  const timestamp = getTimestampNowFormatted()
  SpreadsheetApp.getActive().getSheetByName("Chat History").appendRow([timestamp,sender, type, data])
}

function getLastChatHistory() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("Chat History")
  const lastRow = sheet.getLastRow()
  const rng = sheet.getRange(lastRow, 1, 1, 4).getValues()

  return {
    timestamp: rng[0][0],
    sender: rng[0][1],
    type: rng[0][2],
    data: rng[0][3],
  }
}

function getLastNChatHistory(n) {
  const sheet = SpreadsheetApp.getActive().getSheetByName("Chat History")
  const lastRow = sheet.getLastRow()

  let data = []
  if (lastRow-n <= 0) {
    return data
  }

  const rng = sheet.getRange(lastRow-n+1, 1, n, 4).getValues()
  for (let i = 0; i < rng.length; i++) {
    data.push({
      timestamp: rng[i][0],
      sender: rng[i][1],
      type: rng[i][2],
      data: rng[i][3],
    })
  }

  return data
}