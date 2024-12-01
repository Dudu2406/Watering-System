import React from 'react';

function App() {
  const arduinoIp = 'http://192.168.254.120'; // Replace with your Arduino's IP address

  const turnOnPump = () => {
    fetch(`${arduinoIp}/ON`)
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  const turnOffPump = () => {
    fetch(`${arduinoIp}/OFF`)
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };
  

    return (
        <div>
          <h1>Water Pump Control</h1>
          <button onClick={turnOnPump}>Turn On Pump</button>
          <button onClick={turnOffPump}>Turn Off Pump</button>
        </div>
      );
      
}

export default App;
