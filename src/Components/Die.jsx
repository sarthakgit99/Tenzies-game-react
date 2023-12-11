import React from "react";
const Die = (props) => {
    const styles={
        backgroundColor : props.isHeld ? "#59E391" : "white"
    }
  return (
    <div className="die-face" style={styles} onClick={props.hold}>
      <h2 className="number">{props.value}</h2>
    </div>
  );
};
export default Die;
