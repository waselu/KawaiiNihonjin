
const crypto = require('crypto');
const format = require('biguint-format');

function randomC (qty) {
    let x = crypto.randomBytes(qty);
    return format(x, 'dec');
}

//TODO: use function above
function random (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

exports.random = random