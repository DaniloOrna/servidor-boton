//https://www.eclipse.org/paho/clients/js/

function LED1_On() {
	alert("led on");
	message = new Paho.MQTT.Message("encender");
   	message.destinationName = "danilo-orna@hotmail.es/dato_boton";
    	client.send(message);
	console.log("led on");
	//document.getElementById("sensor").innerHTML="led on";
  
}

function LED1_Off(){	
	alert("led off");
	message = new Paho.MQTT.Message("apagar");
  	message.destinationName = "danilo-orna@hotmail.es/dato_boton";
    	client.send(message);
	 console.log("led off");
	//document.getElementById("sensor").innerHTML="led off";
}






// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "danilo-orna@hotmail.es",
    password: "carguacundo16",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("danilo-orna@hotmail.es/dato_boton");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "danilo-orna@hotmail.es/dato_boton";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
	  document.getElementById("sensor").innerHTML=message.payloadString;   //El valor de la etiqueta sera el mensaje que recibe
  }
