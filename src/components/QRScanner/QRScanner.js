import React, { useState, useEffect } from "react";
import jsQR from "jsqr";

export default function({ setData }) {

  const [isScanning, setScan] = useState(true);

  const prepareData = (message) => message.split('&').reduce((acc, item) => {
      const [ key, value ] = item.split('=');
      return { ...acc, [key]: value }
      }, 
      {});
  
  var intervalId;
  var webcam;

  useEffect(() => {
    if (isScanning) {
      navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => { 
        webcam = video;
        video.srcObject = stream;
      })
      setScan(true);
      var canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = 480;
      intervalId = setInterval(() => {
      let imageData = canvas.getContext('2d').getImageData(0, 0, 320, 240).data;
      let qrCode = jsQR(imageData, 320, 240);
      canvas.getContext('2d').drawImage(video, 0, 0, 320, 240);
      if (qrCode) {
        video.srcObject.getTracks()[0].stop();
        setScan(false);
        clearInterval(intervalId);
        setData(prepareData(qrCode.data))
      }
      }, 100);
      console.log('intervalId:', intervalId);
    }

    return () => {
      webcam && webcam.srcObject.getTracks()[0].stop();
      setScan(false);
      clearInterval(intervalId);
    }
  }, []);

  return isScanning ? (<video id="video" width="320" height="240" autoPlay></video>) : <>NEXT</>;
};
