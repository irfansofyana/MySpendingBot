function getTelegramBotInfo() {
  const response = UrlFetchApp.fetch(`${telegramURLToken}/getMe`)
  console.log(response.getContentText())
}

function setTelegramWebhook() {
  const setWebhookURL = `${telegramURLToken}/setWebhook?url=${webAppURL}`
  const response = UrlFetchApp.fetch(setWebhookURL)
  console.log(response.getContentText())
}

function sendMessage(chat_id, text, keyboard) {
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