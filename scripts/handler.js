function doPost(e) {
  const contents = JSON.parse(e.postData.contents)
  savePostRequestToSheet(contents)

  if (contents.callback_query) {
    handleCallbackQuery(contents.callback_query)
    return
  }

  handleRegularMessage(contents)
}

function handleCallbackQuery(callback_query) {
  const data = callback_query.data
  const fromID = callback_query.from.id

  if (!isValidSender(fromID)) {
    sendUnauthorizedMessage(fromID)
    return
  }

  const handlers = [
    {sender: fromID, check: isAddSpendingCallback, responses: ["Please choose one", addSpendingKeyboard]},
    {sender: fromID, check: isAddDailySpendingCallback, responses: ["What do you want to call this spending?"]},
    {sender: fromID, check: isAddRecurringSpendingCallback, responses: ["Add recurring spending is not yet implemented!"]},
    {sender: fromID, check: isGetNLastSpendingCallback, responses: ["Choose how many last spending you want to see?", getNLastSpendingKeyboard]},
    {sender: fromID, check: isGetSpendingCallback, responses: ["Please choose one", getSpendingKeyboard]},
    {sender: fromID, check: isUpdateSpendingCallback, responses: ["Update spending feature not yet implemented!"]},
    {sender: fromID, check: isDeleteSpendingCallback, responses: ["Delete spending feature not yet implemented!"]},
    {sender: fromID, check: isSpendingCategoriesCallback, responses: ["How much this spending is?"]},
    {sender: fromID, check: isLastSpendingCallback, callback_handler: handleGetLastNSpending}
  ]

  handlers.forEach((handler) => {
    if (handler.check(data)) {
      sendCallbackResponse(handler, data)
      return
    }
  })

  addChatHistory(fromID, "callback_query", data)
}

function isAddSpendingCallback(data) {
  return data === mainSpendingCommand.AddSpending
}

function isAddDailySpendingCallback(data) {
  return data === addSpendingCommand.DailySpending
}

function isAddRecurringSpendingCallback(data) {
  return data === addSpendingCommand.RecurringSpending
}

function isGetNLastSpendingCallback(data) {
  return data === getSpendingCommand.GetNLastSpending
}

function isGetSpendingCallback(data) {
  return data === mainSpendingCommand.GetSpending
}

function isUpdateSpendingCallback(data) {
  return data === mainSpendingCommand.UpdateSpending
}

function isDeleteSpendingCallback(data) {
  return data === mainSpendingCommand.DeleteSpending
}

function isSpendingCategoriesCallback(data) {
  return data.includes("spendingCategory")
}

function isLastSpendingCallback(data) {
  return data.includes("lastSpending")
}

function sendCallbackResponse(handler, data) {
  if (handler.callback_handler) {
    handler.callback_handler(handler, data)
  }

  if (handler.responses.length === 1) {
    sendMessage(handler.sender, handler.responses[0])
  }

  if (handler.responses.length === 2) {
    sendMessage(handler.sender, handler.responses[0], handler.responses[1])
  }
}

function handleGetLastNSpending(handler, data){
  const nLastSpendingReq = parseInt(data.replace("lastSpending", ""))
  const lastNSpendings = getLastNSpendingLogs(nLastSpendingReq)
  const spendingsTable = spendingLogsAsTable(lastNSpendings)
  
  sendMessage(handler.sender, spendingsTable)
}

function handleRegularMessage(contents) {
  const chatID = contents.message.chat.id  
  const textMsg = contents.message.text

  if (!isValidSender(chatID)) {
    sendUnauthorizedMessage(chatID)
    return
  }

  const lastMsg = getLastChatHistory()
  
  addChatHistory(chatID, "message", textMsg)

  if (isStartCommand(textMsg)) {
    handleStartCommand(contents)
    return
  }

  if (isHelpCommand(textMsg)) {
    sendMessage(chatID, "To use this bot, you can try send message /start")
    return
  }
  
  if (isDailySpendingChat(lastMsg)) {
    sendSpendingCategoriesMessage(chatID)
    return
  }

  if (isAmountSpendingChat(lastMsg)) {
    sendMessage(chatID, `Do you want to add some description?`) 
    return
  }

  const last5Msg = getLastNChatHistory(5)

  if (isDescriptionSpendingChat(last5Msg)) {
    handleDescriptionSpendingChat(last5Msg)
    return
  }

  const defaultReply = "Sorry boss, I don't understand what you mean😅🙏"
  sendMessage(chatID, defaultReply)
}

function handleStartCommand(contents) {
  const chatID = contents.message.chat.id
  sendMessage(chatID, "🙇‍♂️ What do you want sir? 🙇‍♂️", mainKeyboard)
}

function isDailySpendingChat(chat_history) {
  return chat_history.type === "callback_query" && chat_history.data === addSpendingCommand.DailySpending
}

function isAmountSpendingChat(chat_history) {
  return chat_history.type === "callback_query" && chat_history.data.includes("spendingCategory")
}

function isDescriptionSpendingChat(chat_histories) {
  if (chat_histories.length < 5) {
    return false
  }

  return chat_histories[0].type === "callback_query" && chat_histories[0].data === addSpendingCommand.DailySpending
}

function isStartCommand(txtMsg) {
  return txtMsg === mainCommand.Start
}

function isHelpCommand(txtMsg) {
  return txtMsg === mainCommand.Help
}

function isValidSender(chatID) {
  return chatID === bossTelegramID
}

function handleDescriptionSpendingChat(last5Msg) {
  const data = {
    name: last5Msg[1].data,
    category: last5Msg[2].data.replace("spendingCategory", ""),
    amount: last5Msg[3].data,
    description: last5Msg[4].data,
  }
  
  addSpendingLogs(data)

  sendMessage(chatID, "✅ Your spending is recorded! ✅") 
}

function savePostRequestToSheet(request) {
  SpreadsheetApp.getActive().getSheetByName("Raw Requests Logs").appendRow([
    JSON.stringify(request, null, 5)
  ])
}