import React from 'react';
import styles from './App.module.css';
// import logo from './logo.svg';
import './App.css';
import Map from './Map.js';

function App() {

  const [viewState, setViewState] = React.useState({
    longitude: -77,
    latitude: -12.05,
    zoom: 11,
    pitch: 50,
    bearing: -1.45,
  });
  const handleChangeViewState = ({ viewState }) => setViewState(viewState);

  const [brushEnabled, setBrush] = React.useState(true);
  const handleToggleBrush = () => setBrush(!brushEnabled)

  const [blocksPressureEnabled, setBlocksPressure] = React.useState(true);
  const handleToggleBlocksPressure = () => setBlocksPressure(!blocksPressureEnabled)

  const [hexsPressureEnabled, setHexsPressure] = React.useState(false);
  const handleToggleHexsPressure = () => setHexsPressure(!hexsPressureEnabled)

  const [blocksAccesibilityEnabled, setBlocksAccesibility] = React.useState(false);
  const handleToggleBlocksAccesibility = () => setBlocksAccesibility(!blocksAccesibilityEnabled)

  return (
    <div className="App">
    <Map
      width="100vw"
      height="100vh"
      viewState={viewState}
      onViewStateChange={handleChangeViewState}
      blocksPressureEnabled={blocksPressureEnabled}
      hexsPressureEnabled={hexsPressureEnabled}
      blocksAccesibilityEnabled={blocksAccesibilityEnabled}
      brushEnabled={brushEnabled}
    />
    <div className={styles.controls}>
      <button onClick={handleToggleHexsPressure} style={{backgroundColor: hexsPressureEnabled ? "#28a745" : "#333"}}>Pressure Indicator Agg. by Hexs</button>
      <button onClick={handleToggleBlocksPressure}  style={{backgroundColor: blocksPressureEnabled ? "#28a745" : "#333"}}>Pressure Indicator Agg. by Blocks</button>
      <button onClick={handleToggleBlocksAccesibility}  style={{backgroundColor: blocksAccesibilityEnabled ? "#28a745" : "#333"}}>Accesibility Indicator Agg. by Blocks</button>
    </div>
    </div>
  );
}

export default App;
