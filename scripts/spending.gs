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

function getTimestampNowFormatted() {
  const dateObj = new Date()

  let year = dateObj.getFullYear();

  let month = dateObj.getMonth() + 1
  month = ('0' + month).slice(-2);

  let date = dateObj.getDate();
  date = ('0' + date).slice(-2);

  let hour = dateObj.getHours();
  hour = ('0' + hour).slice(-2);

  let minute = dateObj.getMinutes();
  minute = ('0' + minute).slice(-2);

  let second = dateObj.getSeconds();
  second = ('0' + second).slice(-2);

  const time = `${year}-${month}-${date} ${hour}:${minute}:${second}`;

  return time
}

function getSpendingCategoriesList() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("Spending Categories")
  const lastRow = sheet.getLastRow()
  
  return sheet.getSheetValues(2, 1, lastRow-1, 1).map((el) => el[0])
}

function addSpendingLogs(data) {
  const timestamp = getTimestampNowFormatted()
  SpreadsheetApp.getActive().getSheetByName("Spending Logs").appendRow([
    timestamp,
    data.name,
    data.category,
    data.amount,
    data.description,
  ])
}

function getLastNSpendingLogs(n) {
  const sheet = SpreadsheetApp.getActive().getSheetByName("Spending Logs")
  const lastRow = sheet.getLastRow()

  let data = []
  if (lastRow-n <= 0) {
    return data
  }

  const rng = sheet.getRange(lastRow-n+1, 1, n, 5).getValues()
  for (let i = 0; i < rng.length; i++) {
    data.push({
      timestamp: rng[i][0],
      name: rng[i][1],
      category: rng[i][2],
      amount: rng[i][3],
      description: rng[i][4]
    })
  }

  return data
}
