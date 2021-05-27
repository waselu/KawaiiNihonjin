
async function sendBotMessage(message, sending) {
    discordMessage = await message.lineReply(sending);
}

function checkArgNumberBetween(command, message, args, moreThan = -1, lessThan = -1) {
    expectedStr = 'expected number of argument';
    if (moreThan == -1 && lessThan == -1 ) { return true; };
    if (moreThan != -1 && lessThan == -1) { expectedStr += ' higher than ' + (moreThan - 1); }
    else if (moreThan == - 1 && lessThan != - 1) { expectedStr += ' lower than ' + (lessThan + 1); }
    else if (moreThan == lessThan) { expectedStr += ': ' + moreThan; }
    else { expectedStr += ' between ' + (moreThan - 1) + ' and ' + (lessThan + 1)};
    
    if (moreThan != -1 && args.length < moreThan) {
        sendBotMessage(message, 'Not enough arguments provided to command ``' + command.name + '``\n' + expectedStr)
        return false;
    }
    if (lessThan != -1 && args.length > lessThan) {
        sendBotMessage(message, 'Too many arguments provided to command ``' + command.name + '``\n' + expectedStr)
        return false;
    }
    return true
}

exports.sendBotMessage = sendBotMessage;
exports.checkArgNumberBetween = checkArgNumberBetween;