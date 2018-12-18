const express = require('express');
const { Client } = require('tplink-smarthome-api');


const startingBrightness = 0;
const endingBrightness = 100;

// Increment every 10 seconds with 10 brightness
const timeIncrement = 10;
const brightnessIncrement = 10;

//Alarm time
const startAlarm = 0;
const endAlarm = 50;

let currentAlarm = startAlarm;
let currentBrightness = startingBrightness;

let app = express();

app.get('/', (req, res) => {
	res.send('Hello World!');
});


// Input wake up time. 
// Start time will start 30 minutes prior to wake up time.
// Every 3 minutes, will increase by 10 for 30 minutes.
app.get('/set-alarm', (req, res) => {

	updateTime();
	res.send('Alarm Set!');
});


const client = new Client();

bulb = client.getBulb({host: '192.168.1.137'});

const updateTime = () => {
	let date = new Date();
	console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
	let timer = setTimeout(updateTime, 1000);

	if(date.getSeconds() == startAlarm){
		bulb.lighting.setLightState({on_off: true, brightness: currentBrightness}).then((state) => {
			console.log(state);
		});
		currentAlarm = currentAlarm + timeIncrement;
		currentBrightness = currentBrightness + brightnessIncrement;
	}
	if(date.getSeconds() == currentAlarm){
		bulb.lighting.setLightState({brightness: currentBrightness}).then((state) => {
			console.log('Current Brightness: ' + currentBrightness);
		});
		currentAlarm = currentAlarm + timeIncrement;
		currentBrightness = currentBrightness + brightnessIncrement;
	}

	if(date.getSeconds() == endAlarm){
		bulb.lighting.setLightState({on_off: false}).then((state) => {
			console.log(state);
		});
		currentAlarm = startAlarm;
		currentBrightness = startingBrightness;
		clearTimeout(timer);
	}
}

app.listen(3000, () => {
	console.log('Server started on port 3000.')
})