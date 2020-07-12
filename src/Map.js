import React from 'react';
import data from './data';

const helpers = data.helpers;
const airportsByName = data.airportsByName;

function Map(props) {
  let airportSrc;
  let airportDest;

  let mappedRoutes = props.routes.map(function(route) {
    airportSrc = helpers.getAirportByCode(airportsByName[route.src]);
    airportDest = helpers.getAirportByCode(airportsByName[route.dest]);

    return {
      srcX: airportSrc.lat,
      srcY: airportSrc.long,
      destX: airportDest.lat,
      destY: airportDest.long
    };
  });

  return (
    <svg className="map" viewBox="-180 -90 360 180">
      <g transform="scale(1 -1)">
        <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>
        
        {mappedRoutes.map(function(route, i) {
          return (
            <g key={i}>
              <circle className="source" cx={route.srcY} cy={route.srcX}>
                <title></title>
              </circle> 
              <circle className="destination" cx={route.destY} cy={route.destX}>
                <title></title>
              </circle>
              <path d={`M${route.srcY} ${route.srcX} L ${route.destY} ${route.destX}`} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export default Map;