const express = require('express');
const { Client } = require('tplink-smarthome-api');
const _ = require('lodash');
const bodyParser = require('body-parser')


let endAlarmTime;
let startAlarmTime;
let nextIncrementTime;
let currentBrightness;

//temporary values
const brightnessIncrement = 10;
const timeIncrement = 5;
const startingBrightness = 10;

let app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});


// Input wake up time. 
// Start time will start 30 minutes prior to wake up time.
// Every 3 minutes, will increase by 10 for 30 minutes.
app.post('/set-alarm', (req, res) => {
	//test
	let body = _.pick(req.body, ['endAlarmTime']);

	endAlarmTime = body.endAlarmTime;
	startAlarmTime = endAlarmTime - 30;
	nextIncrementTime = startAlarmTime;
	currentBrightness = 10;

	updateTime();
	res.send('Alarm Set!');
});


app.post('/bulb-off', (req, res) => {
	bulbOff();
	res.send('Bulb Off!');
});

const client = new Client();

bulb = client.getBulb({host: '192.168.1.137'});

const updateTime = () => {
	let date = new Date();
	console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
	let timer = setTimeout(updateTime, 1000);


	console.log('currentBrightness: ' + currentBrightness);
	console.log('nextIncrementTime: ' + nextIncrementTime);

	if(date.getSeconds() == startAlarmTime){
		bulb.lighting.setLightState({on_off: true, brightness: currentBrightness}).then((state) => {
			console.log(state);
		});
		nextIncrementTime = nextIncrementTime + timeIncrement;
		currentBrightness = currentBrightness + brightnessIncrement;
	}
	if(date.getSeconds() == nextIncrementTime){
		bulb.lighting.setLightState({brightness: currentBrightness}).then((state) => {
			console.log('Current Brightness: ' + currentBrightness);
		});
		nextIncrementTime = nextIncrementTime + timeIncrement;
		currentBrightness = currentBrightness + brightnessIncrement;
	}

	if(date.getSeconds() == endAlarmTime){
		bulb.lighting.setLightState({on_off: false}).then((state) => {
			console.log(state);
		});
		nextIncrementTime = startAlarmTime;
		currentBrightness = startingBrightness;
		clearTimeout(timer);
	}
}

const bulbOff = () => {
	bulb.lighting.setLightState({on_off: false}).then((state) => {
		console.log(state);
	});
}

app.listen(3000, () => {
	console.log('Server started on port 3000.')
})