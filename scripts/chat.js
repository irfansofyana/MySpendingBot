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