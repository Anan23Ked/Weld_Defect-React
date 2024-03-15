
import React, { useState, useRef, useEffect } from 'react';


const temperatureScale = {
  min: 500,
  max: 1800,

};
const TempColMap = () => {  
  const [selectedTemperature, setSelectedTemperature] = useState((temperatureScale.max + temperatureScale.min)/2);
  const [isDragging, setIsDragging] = useState(false);
  const pointerRef = useRef(null);
  

  useEffect(() =>{
    const rect = pointerRef.current.parentElement.getBoundingClientRect()
    const percentage = ((selectedTemperature-temperatureScale.min)/(temperatureScale.max-temperatureScale.min)) *100
    pointerRef.current.style.top = `${percentage}%`
    
  }, [])

  const handleTemperatureChange = (event) => {
    if (!isDragging) return 
    const rect = event.target.getBoundingClientRect();
    const offsetY =  rect.bottom-event.clientY ;
    const percentage = (offsetY / rect.height)*100 ;
    const temperature = ((percentage / 100) * (temperatureScale.max - temperatureScale.min) + temperatureScale.min);
    setSelectedTemperature(temperature.toFixed(1));

    
  };
  

  const handlePointerMouseDown = () => {
    setIsDragging(true);
  };

  const handlePointerMouseUp = () => {
    setIsDragging(false);
  };

  const handlePointerMouseMove = (event) => {
    if (!isDragging) return;
    const rect = event.target.getBoundingClientRect();
    const offsetY =  rect.bottom-event.clientY ;
    const percentage = (offsetY / rect.height) * 100;
    const temperature =((percentage / 100) * (temperatureScale.max - temperatureScale.min) + temperatureScale.min);
    setSelectedTemperature(temperature.toFixed(1));
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleTemperatureChange);
      document.addEventListener('mouseup', handlePointerMouseUp);
    } else {
      document.removeEventListener('mousemove', handleTemperatureChange);
      document.removeEventListener('mouseup', handlePointerMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleTemperatureChange);
      document.removeEventListener('mouseup', handlePointerMouseUp);
    };
  }, [isDragging]);

  const gradientStyle = {
    width: '50px',
    height: '60vh', 
    cursor: 'pointer',
    background: `linear-gradient(to top, #14024d ${((temperatureScale.min - temperatureScale.min) / (temperatureScale.max - temperatureScale.min)) * 100}%, #99050c ${((1000 - 500) / (1800 - 500)) * 100}%,  #ffc400 ${((temperatureScale.max - 500) / (1800 - 500)) * 100}%)`,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  };

  return (
    <div style={{ position: 'relative', display:'flex', padding:"10px",  }}>
      <div
        style={gradientStyle}
        onMouseDown={handlePointerMouseDown}
        onMouseMove={handlePointerMouseMove}
        onMouseUp={handlePointerMouseUp}
      >
        <div
          ref={pointerRef}
          style={{
            
            position: 'absolute',
            cursor: 'pointer',
            top: `${(temperatureScale.max -selectedTemperature ) / (temperatureScale.max - temperatureScale.min) * 100}%`,
            right:'-30px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          }}
        >
          <div style={{ position: 'absolute', left: '100%', marginLeft:'10px', top:'0', transform: 'translate(-50%)' }}><b>←{selectedTemperature}°C</b> </div>
        </div>
      </div>
    </div>
  );
};

export default TempColMap
