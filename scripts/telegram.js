const telegramBaseURL = "https://api.telegram.org/bot"

function getTelegramURLToken() {
  const telegramToken = getTelegramTokenFromSheet()
  return `${telegramBaseURL}${telegramToken}`
}

function getTelegramTokenFromSheet() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("Bot Config")
  return sheet.getRange(2, 2, 1, 1).getValues()[0][0]
}

function getTelegramBotInfo() {
  const telegramURLToken = getTelegramURLToken()
  const response = UrlFetchApp.fetch(`${telegramURLToken}/getMe`)
  console.log(response.getContentText())
}

function setTelegramWebhook() {
  const telegramURLToken = getTelegramURLToken()
  const setWebhookURL = `${telegramURLToken}/setWebhook?url=${webAppURL}`
  const response = UrlFetchApp.fetch(setWebhookURL)
  console.log(response.getContentText())
}

function sendMessage(chat_id, text, keyboard) {
  const telegramURLToken = getTelegramURLToken()
  const request = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chat_id),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(keyboard)
    }
  }

  UrlFetchApp.fetch(`${telegramURLToken}/`, request)
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
