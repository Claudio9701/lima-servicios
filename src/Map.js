import React from 'react';
import StaticMap from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { PolygonLayer, GeoJsonLayer } from '@deck.gl/layers';
import { BrushingExtension } from '@deck.gl/extensions';
import { rgb } from 'd3';

export default function Map({
  width,
  height,
  viewState,
  onViewStateChange,
  blocksPressureEnabled,
  hexsPressureEnabled,
  blocksAccesibilityEnabled,
  brushEnabled,
  blocksPressureCm,
  hexsPressureCm,
  blocksAccesibilityCm,
}) {

  const [hoverInfo, setHoverInfo] = React.useState({});

  const layers = [
      new GeoJsonLayer({
        id: 'blocks-pressure',
        data: '/data/blocks_pressure.geojson',
        opacity: 0.5,
        getFillColor: f => Object.values(rgb(blocksPressureCm(f.properties.ds))).splice(0,3),
        stroked: false,
        pickable: true,
        onHover: info => setHoverInfo(info),
        visible: blocksPressureEnabled,
      }),
      new GeoJsonLayer({
        id: 'hexs-pressure',
        data: '/data/hexs_pressure.geojson',
        opacity: 0.5,
        getFillColor: f => Object.values(rgb(hexsPressureCm(f.properties.ds))).splice(0,3),
        stroked: false,
        pickable: true,
        onHover: info => setHoverInfo(info),
        visible: hexsPressureEnabled,
      }),
      new GeoJsonLayer({
        id: 'blocks-accesibility',
        data: '/data/hu_accesibility_blocks_1.geojson',
        opacity: 0.5,
        getFillColor: f => Object.values(rgb(blocksAccesibilityCm(f.properties.Ai))).splice(0,3),
        stroked: false,
        pickable: true,
        onHover: info => setHoverInfo(info),
        visible: blocksAccesibilityEnabled,
      }),

  ];

  const getTooltip = info => {
    let str = "";
    if (!info.object) {
      return null;
    } else if (info.object.properties.ds) {
      str += `ds: ${info.object.properties.ds.toFixed(2)}`
    } else if (info.object.properties.Ai) {
      str += `Ai: ${info.object.properties.Ai.toFixed(2)}`
    }
    return str
  }

  return (
    <DeckGL
      initialViewState={viewState}
      controller={true}
      layers={layers}
      getTooltip={getTooltip}
    >
      <StaticMap
        reuseMaps
        mapStyle={"https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"}
        preventStyleDiffing
      />
    </DeckGL>
  )
}
