const express = require('express');
const { Client } = require('tplink-smarthome-api');


const startingBrightness = 10;
const endingBrightness = 100;

// Increment every 10 seconds with 10 brightness
const timeIncrement = 10;
const brightnessIncrement = 10;

//Alarm time
const startAlarm = 0;
const endAlarm = 50;

let currentAlarm = startAlarm;
let currentBrightness = startingBrightness;

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

updateTime();