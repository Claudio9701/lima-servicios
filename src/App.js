import React from 'react';
import styles from './App.module.css';
// import logo from './logo.svg';
import './App.css';
import Map from './Map.js';
import { scaleSequential, interpolateRdYlGn } from 'd3';

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

  // presure verde-> rojo
  let blocksPressureCm = scaleSequential(interpolateRdYlGn)
  .domain([1.5, 0]);

  let hexsPressureCm = scaleSequential(interpolateRdYlGn)
  .domain([84, -12]);

  // accesibility rojo -> verde
  let blocksAccesibilityCm = scaleSequential(interpolateRdYlGn)
  .domain([0, 0.0119]);

  const blocksPressureCmTicks = blocksPressureCm.ticks(5);
  const hexsPressureCmTicks = hexsPressureCm.ticks(5);
  const blocksAccesibilityCmTicks = blocksAccesibilityCm.ticks(5);

  console.log(hexsPressureCmTicks)
  console.log(blocksPressureCm(60))

  function ColorBar(props) {
    const colorMap = props.colorMap;
    const numbers = colorMap.ticks(props.numbers)
    const LegendItems = numbers.map((number) =>
        <div
            key={number.toString()}
            className={styles.legend}
            style={{backgroundColor: colorMap(number)}}
        >
            {number}
        </div>
    );
    return (
        <div className={styles.layout}>{LegendItems}</div>
    );
  }

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
          blocksPressureCm={blocksPressureCm}
          hexsPressureCm={hexsPressureCm}
          blocksAccesibilityCm={blocksAccesibilityCm}
        />
        <div className={styles.controls}>
          <button onClick={handleToggleHexsPressure} style={{backgroundColor: hexsPressureEnabled ? "#28a745" : "#333"}}>Pressure Indicator Agg. by Hexs</button>
          { hexsPressureEnabled && <ColorBar numbers={5} colorMap={hexsPressureCm} />}
          { hexsPressureEnabled && <br /> }
          <button onClick={handleToggleBlocksPressure}  style={{backgroundColor: blocksPressureEnabled ? "#28a745" : "#333"}}>Pressure Indicator Agg. by Blocks</button>
          { blocksPressureEnabled && <ColorBar numbers={5} colorMap={blocksPressureCm} />}
          { blocksPressureEnabled && <br /> }
          <button onClick={handleToggleBlocksAccesibility}  style={{backgroundColor: blocksAccesibilityEnabled ? "#28a745" : "#333"}}>Accesibility Indicator Agg. by Blocks</button>
          { blocksAccesibilityEnabled && <ColorBar numbers={5} colorMap={blocksAccesibilityCm} />}
        </div>
    </div>
  );
}

export default App;
