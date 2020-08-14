import React, { useEffect, useRef, useState, Fragment } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";

const Map = (props) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  const { center, zoom } = props;

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiamVmZnRlYmFuZzAxMTgiLCJhIjoiY2tkbGp0bTJvMG83ZjJycGZuaXNod3JrYSJ9.cCOBm77H7fIlkMDRU9_EqQ";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [center.Longitude, center.Latitude],
        zoom: zoom,
      });

      // eslint-disable-next-line
      const marker = new mapboxgl.Marker()
        .setLngLat([center.Longitude, center.Latitude])
        .addTo(map);

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
      let layerList = document.getElementById("menu");
      let inputs = layerList.getElementsByTagName("input");

      function switchLayer(layer) {
        let layerId = layer.target.id;
        map.setStyle("mapbox://styles/mapbox/" + layerId);
      }
      map.addControl(new mapboxgl.NavigationControl());

      for (let i = 0; i < inputs.length; i++) {
        inputs[i].onclick = switchLayer;
      }
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [center, zoom, map]);

  return (
    <Fragment>
      <div ref={(el) => (mapContainer.current = el)} className="map"></div>
      <div id="menu">
        <input
          id="streets-v11"
          type="radio"
          name="rtoggle"
          value="streets"
          defaultChecked="checked"
        />{" "}
        <label for="streets-v11" className="spacer">
          Streets
        </label>
        <input id="light-v10" type="radio" name="rtoggle" value="light" />{" "}
        <label for="light-v10" className="spacer">
          Light
        </label>
        <input id="dark-v10" type="radio" name="rtoggle" value="dark" />{" "}
        <label for="dark-v10" className="spacer">
          Dark
        </label>
        <input id="outdoors-v11" type="radio" name="rtoggle" value="outdoors" />{" "}
        <label for="outdoors-v11" className="spacer">
          Outdoors
        </label>
        <input
          id="satellite-v9"
          type="radio"
          name="rtoggle"
          value="satellite"
        />{" "}
        <label for="satellite-v9" className="spacer">
          Satellite
        </label>
      </div>
    </Fragment>
  );
};

export default Map;
