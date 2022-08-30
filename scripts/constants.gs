const telegramBaseURL = "https://api.telegram.org/bot"
const telegramToken = "YOUR_TELEGRAM_TOKEN" // change this with your own telegram bot token
const telegramURLToken = `${telegramBaseURL}${telegramToken}`
const webAppURL = "https://script.google.com/macros/s/AKfycbwAeJP9EiOhs-QXj223laLhi7oDr43k9yYgi1GRqo27zTBhX8fDt6sMMeCdqzxo8vSO/exec"
const bossTelegramID = 750049804

const mainCommand = {
  Start:"/start",
  Help: "/help",
}

const mainSpendingCommand = {
  AddSpending: "addSpending",
  GetSpending: "getSpending",
  UpdateSpending: "updateSpending",
  DeleteSpending: "deleteSpending",
}

const addSpendingCommand = {
  DailySpending: "addDailySpending",
  RecurringSpending: "addRecurringSpending",
}

const getSpendingCommand = {
  GetNLastSpending: 'getNLastSpending',
  GetTotalSpending: 'getTotalSpending',
}

const getNLastSpendingCommand = {
  Last5Spending: 'lastSpending5',
  Last10Spending: 'lastSpending10',
  Last15Spending: 'lastSpending15'
}

const mainKeyboard = {
  "inline_keyboard": [
    [
      {
        "text": "💸 Add spending",
        "callback_data":mainSpendingCommand.AddSpending,
      },
    ],
    [
      {
        "text": "🧾 Get Spending",
        "callback_data":mainSpendingCommand.GetSpending,
      },
    ],
    [
      {
        "text": "✏️ Update Spending",
        "callback_data":mainSpendingCommand.UpdateSpending,
      },
    ],
    [  
      {
        "text": "❌ Delete Spending",
        "callback_data":mainSpendingCommand.DeleteSpending,
      },
    ],
  ],
};

const addSpendingKeyboard = {
  "inline_keyboard": [
    [
      {
        "text": "💵 Add daily spending",
        "callback_data": addSpendingCommand.DailySpending,
      }
    ],
    [
      {
        "text": "💳 Add recurring spending",
        "callback_data": addSpendingCommand.RecurringSpending,
      }
    ]
  ]
}

const getSpendingKeyboard = {
  "inline_keyboard": [
    [
      {
        "text": "📃 Get n-th last spending",
        "callback_data": getSpendingCommand.GetNLastSpending,
      }
    ],
    [
      {
        "text": "⌨️ Get total spending",
        "callback_data": getSpendingCommand.GetNLastSpending,
      }
    ]
  ]
}

const getNLastSpendingKeyboard = {
  "inline_keyboard": [
    [
      {
        "text": "5",
        "callback_data": getNLastSpendingCommand.Last5Spending,
      }
    ],
    [
      {
        "text": "10",
        "callback_data":  getNLastSpendingCommand.Last10Spending,
      }
    ],
    [
      {
        "text": "15",
        "callback_data":  getNLastSpendingCommand.Last15Spending,
      }
    ]
  ]
}
