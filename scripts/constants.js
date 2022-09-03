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
        "text": "🧾 Get spending",
        "callback_data":mainSpendingCommand.GetSpending,
      },
    ],
    [
      {
        "text": "✏️ Update spending",
        "callback_data":mainSpendingCommand.UpdateSpending,
      },
    ],
    [  
      {
        "text": "❌ Delete spending",
        "callback_data":mainSpendingCommand.DeleteSpending,
      },
    ],
  ],
};

const addSpendingCommand = {
  DailySpending: "addDailySpending",
  RecurringSpending: "addRecurringSpending",
}

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

const getSpendingCommand = {
  GetNLastSpending: 'getNLastSpending',
  GetTotalSpending: 'getTotalSpending',
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
        "callback_data": getSpendingCommand.GetTotalSpending,
      }
    ]
  ]
}

const getNLastSpendingCommand = {
  Last5Spending: 'lastSpending5',
  Last10Spending: 'lastSpending10',
  Last15Spending: 'lastSpending15'
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

const getTotalSpendingCommand = {
  SinceToday: 'totalSpending0',
  Since3DaysAgo: 'totalSpending3',
  Since7DaysAgo: 'totalSpending7',
  Since14DaysAgo: 'totalSpending14',
  Since30DaysAgo: 'totalSpending30'
}

const getTotalSpendingKeyboard = {
"inline_keyboard": [
    [
      {
        "text": "Since today",
        "callback_data": getTotalSpendingCommand.SinceToday,
      }
    ],
    [
      {
        "text": "Since 3 days ago",
        "callback_data":  getTotalSpendingCommand.Since3DaysAgo,
      }
    ],
    [
      {
        "text": "Since 7 days ago",
        "callback_data":  getTotalSpendingCommand.Since7DaysAgo,
      }
    ],
    [
      {
        "text": "Since 30 days ago",
        "callback_data":  getTotalSpendingCommand.Since30DaysAgo,
      }
    ]
  ]
}