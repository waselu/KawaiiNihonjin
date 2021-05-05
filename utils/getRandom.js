
const json = require('../config.json');
const randomGenerator = require('../utils/randomNumber');

function getRandomAny(key) {
	if (!key in json || !(typeof json[key] === 'object' && json[key] !== null)) {
		return null;
	}

	choice = randomGenerator.random(0, Object.keys(json[key]).length - 1);

	return {'romanji': Object.values(json[key])[choice], 'kata': Object.keys(json[key])[choice]};
}

function get10HiraganasSameSource() {
	let chosenHiraganas = [];
	let hiraganaObject = '';

	let choosing = randomGenerator.random(0, Object.keys(json['hiragana']).length + Object.keys(json['tentenHiragana']).length + Object.keys(json['doubleHiragana']).length);
	if (choosing < Object.keys(json['hiragana']).length) {
		hiraganaObject = 'hiragana';
	} else if (choosing < Object.keys(json['hiragana']).length + Object.keys(json['tentenHiragana']).length) {
		hiraganaObject = 'tentenHiragana';
	} else {
		hiraganaObject = 'doubleHiragana';
	}

	while (chosenHiraganas.length != 10) {
		let randomHiragana = getRandomAny(hiraganaObject);
		let skip = false;
		chosenHiraganas.map(function(chosenHiragana) {
			if (chosenHiragana['kata'] === randomHiragana['kata']) {
				skip = true;
			}
		});
		if (!skip) {
			chosenHiraganas.push(randomHiragana);
		}
	}

	return chosenHiraganas;
}

exports.getRandomAny = getRandomAny;
exports.get10HiraganasSameSource = get10HiraganasSameSource;