import HMKit from 'hmkit';

const hmkit = new HMKit(
    "dGVzdMaQ3nfzz10zp3jsVy6mXDYy42vJJybtA8sbxkzke/svkc6XWKPf3aN0zomRfS/kSfewjT+/BT5wCTk6SofDYVEZtHaPjF+5Js5RPqwLbWCVEyxv0+zXJ5wclk2eYEit0ctnYYiIcTqVvhnZJjJm6K+VonnzPkgobYlhCRjKyoeKMz7hXGGYCsyWxVUnTHPTGYZVw2os",
    "zmPjjqi+yHoHPLc5QP6LTTPK+HDkikuw4YnW8nqCV5g="
);


async function app() {
  const accessCertificate = await hmkit.downloadAccessCertificate(
    "f2ccef64-eea6-49b3-8cfe-4a944b440a2a"
  );

  var vehicleSerial = accessCertificate.getVehicleSerial();


  // get car's capability list
  try {
    	const response = await hmkit.telematics.sendCommand(
      		vehicleSerial,
      		hmkit.commands.CapabilitiesCommand.get()
   	);
    	var carCapabilities = response.parse();
  } catch (e) { console.log(e); }


  // get engine state
  try {
	const response = await hmkit.telematics.sendCommand(
		vehicleSerial,
		hmkit.commands.EngineCommand.getIgnitionState()
	);
	var carEngineState = response.parse();
	if (carEngineState.ignition == 'engine_on')
		console.log('engine is ON');
	else
		console.log('engine is OFF');
  } catch (e) { console.log(e); }


  // get the charging info
  try {
	const response = await hmkit.telematics.sendCommand(
		vehicleSerial,
		hmkit.commands.ChargingCommand.getChargeState()
	);
	var carChargingState = response.parse();
	console.log('charging: ' + carChargingState.activeState);
	console.log('battery level: ' + carChargingState.batteryLevel);
	console.log('est. range: ' + carChargingState.estimatedRange + ' miles');
  } catch (e) { console.log(e); }


  // get state of all the doors
  try {
	const response = await hmkit.telematics.sendCommand(
		vehicleSerial,
		hmkit.commands.DoorLocksCommand.getState()
	);
	var carDoorLocks = response.parse();
	for (var x in carDoorLocks.locks) { console.log(carDoorLocks.locks[x]); }
  } catch (e) { console.log(e); }


  // rudimentary way of toggling the parking break
  try {
	console.log("toggling parking brake..");
	const response = await hmkit.telematics.sendCommand(
		vehicleSerial,
		hmkit.commands.ParkingBrakeCommand.getState()
	);
	var carParkingBrake = response.parse();
	console.log("current status: " + carParkingBrake.parkingBrake);
	if (carParkingBrake.parkingBrake == 'active')
		hmkit.commands.ParkingBrakeCommand.inactivate();
	else
		hmkit.commands.ParkingBrakeCommand.activate();
	console.log("parking brake status is now: " + carParkingBrake.parkingBrake);
  } catch (e) { console.log(e); }





}





// run the app
app();
