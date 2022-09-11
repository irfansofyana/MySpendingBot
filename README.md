# MySpendingBot

My personal telegram bot assistant to record my spending. The bot is built using Telegram API, Google sheets, and Google App Script.

## Current Features
- Record daily spending
- Get n-last spendings where `n` can be 5, 10, 15
- Get total spending, since today, 3 days ago, 7 days ago, 30 days ago
- Automated message to record daily spending every 6 hours
- Send the spreadsheet link to update/delete spending

## Demo

### Record Daily Spending


https://user-images.githubusercontent.com/33191443/188277121-3c96d818-79f7-4f3e-811e-d612a70d78aa.mp4


### Get n-last spendings (in this case n=5)
![get n-last spending](https://user-images.githubusercontent.com/33191443/188276689-40829e4e-8c2a-4be5-9589-5552f0386264.gif)


### Get total spendings (in this case today spending)
![get spending](https://user-images.githubusercontent.com/33191443/188276758-65115b60-2718-49ab-be92-2567cb71a38f.gif)


### Update spending response
![update spending (online-video-cutter com)](https://user-images.githubusercontent.com/33191443/188277384-94e95d9c-9ded-4a79-bc3c-b876e6beba22.gif)

### Delete spending response
![delete spending (online-video-cutter com)](https://user-images.githubusercontent.com/33191443/188277386-a4d161fb-4f5a-4529-8c6e-5c321ff8ff71.gif)


## Setup

### Clone Spending Tracker Spreadsheet
Here, I'm using this spreadsheet. Within this spreadsheet:
- `Spending Logs`: This is where your spending is stored
- `Recurrence Spending`: This is to store your recurrence spending. It will be automatically add a spending logs in a certain time as what you defined
- `Spending Categories`: This is to store the categories of your own spending
- `Chat History`: This is a history between you and the bot
- `Bot Config`: This is to store a configuration of your bot. One of the configuration is a telegram token. Please fill the token with the token that you will received after created the telegram bot
- `Raw Requests Logs`: This is to store a raw request logs that comes from telegram

### Setup Telegram Bot
#### Create Telegram Bot
You will need to create your own telegram bot to host the spending bot. You can do it by following the guides here. Please note the generated telegram token from the `BotFather` and fill in the `Bot Config` in the spreadsheet

#### Set telegram webhook
In order for your telegram bot can do the job, we need to set a webhook handler for the bot. To do that, you can check the `setTelegramWebhook()` function and run it via the app script

### Setup Triggers
This bot also has some features that can run automatically without your trigger. For examples:
- Automated reminder in form of chat from bot to your account to record spending

In order that features run well, we need to setup triggers within the app script.

TODO: Add more descriptions
