serialPort.on("open", function () {
        receivedData ="";
        serialPort.on('data',function(data)
        {
                receivedData =data.toString();
a = receivedData.length;
                myApp.emit('sensor','', receivedData.substring(2,a));
        });
});
