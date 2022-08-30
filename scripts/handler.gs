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
  
  if (data === mainSpendingCommand.AddSpending) {
    sendMessage(fromID, "Please choose one", addSpendingKeyboard)
  }

  if (data === addSpendingCommand.DailySpending) {
    sendMessage(fromID, "What do you want to call this spending?")
  }

  if (data === addSpendingCommand.RecurringSpending) {
    sendMessage(fromID, "Add recurring spending is not yet implemented!")
  }

  if (data === getSpendingCommand.GetNLastSpending) {
    sendMessage(fromID, "Choose how many last spending you want to see?", getNLastSpendingKeyboard)
  }
  
  if (data === mainSpendingCommand.GetSpending) {
    sendMessage(fromID, "Please choose one", getSpendingKeyboard)
  }

  if (data === mainSpendingCommand.UpdateSpending) {
    sendMessage(fromID, "Update spending feature not yet implemented!")
  }

  if (data === mainSpendingCommand.DeleteSpending) {
    sendMessage(fromID, "Delete spending feature not yet implemented!")
  }

  if (data.includes("spendingCategory")) {
    sendMessage(fromID, "How much this spending is?")
  }

  if (data.includes("lastSpending")) {
    const nLastSpendingReq = parseInt(data.replace("lastSpending", ""))
    const lastNSpendings = getLastNSpendingLogs(nLastSpendingReq)
    const spendingsTable = spendingLogsAsTable(lastNSpendings)
    sendMessage(bossTelegramID, spendingsTable)
  }

  addChatHistory(fromID, "callback_query", data)
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
  
  if (isDailySpendingChat(lastMsg)) {
    // textMsg is the answer for "What do you want to call this spending?" question
    sendSpendingCategoriesMessage(chatID)
    return
  }

  if (isAmountSpendingChat(lastMsg)) {
    // textMsg is the amount of spending
    sendMessage(chatID, `Do you want to add some description?`) 
    return
  }

  const last5Msg = getLastNChatHistory(5)

  if (isDescriptionSpendingChat(last5Msg)) {
    // textMsg is the description of the spending
    const data = {
      name: last5Msg[1].data,
      category: last5Msg[2].data.replace("spendingCategory", ""),
      amount: last5Msg[3].data,
      description: last5Msg[4].data,
    }
    
    addSpendingLogs(data)

    sendMessage(chatID, "✅ Your spending is recorded! ✅") 

    return
  }

  if (isStartCommand(textMsg)) {
    handleStartCommand(contents)
    return
  }

  if (isHelpCommand(textMsg)) {
    sendMessage(chatID, "To use this bot, you can try send message /start")
    return
  }

  const replyText = `This is default handler to reply for your message: "${textMsg}"`
  sendMessage(chatID, replyText)
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

function sendUnauthorizedMessage(chatID) {
  sendMessage(chatID, "❌🚫❌ You're unauthorized sender! I will not received order from you ❌🚫❌")
}

function sendSpendingCategoriesMessage(chatID) {
  const categories = getSpendingCategoriesList()
  const keyboard = categories.map((el) => [
    {
      "text": el,
      "callback_data": `spendingCategory${el}`
    }
  ])

  sendMessage(chatID, "choose the spending category please", {"inline_keyboard": keyboard})
}

function handleStartCommand(contents) {
  const chatID = contents.message.chat.id
  sendMessage(chatID, "🙇‍♂️ What do you want sir? 🙇‍♂️", mainKeyboard)
}

function savePostRequestToSheet(request) {
  SpreadsheetApp.getActive().getSheetByName("Raw Requests Logs").appendRow([
    JSON.stringify(request, null, 5)
  ])
}