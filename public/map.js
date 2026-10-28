import {clinic} from './data.js';
// Exact-address result: OSM building way 271700703, number 593, postcode 89239-080.
// Verified through Nominatim on 2026-10-28. No client-side geocoding requests.
export const verifiedLocation={lat:-26.2068098,lng:-48.9083570,source:'https://www.openstreetmap.org/way/271700703'};
const host=document.querySelector('#map'),status=document.querySelector('#map-status');
async function initialize(){try{
 await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='/vendor/leaflet.js';script.onload=resolve;script.onerror=reject;document.head.append(script)});
 const L=window.L;const point=[verifiedLocation.lat,verifiedLocation.lng];const map=L.map(host,{scrollWheelZoom:false,keyboard:true}).setView(point,18);
 const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'}).addTo(map);
 const markerSvg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 58"><path d="M24 55C20 49 4 36 4 24a20 20 0 1 1 40 0c0 12-16 25-20 31Z" fill="#102D43" stroke="#86CDE8" stroke-width="2.5"/><path d="M14 25q10 14 20 0" fill="none" stroke="white" stroke-width="2.8" stroke-linecap="round"/><circle cx="16" cy="18" r="1.8" fill="white"/><circle cx="32" cy="18" r="1.8" fill="white"/></svg>';
 const marker=L.marker(point,{icon:L.divIcon({html:markerSvg,className:'smile-map-marker',iconSize:[48,58],iconAnchor:[24,55],popupAnchor:[0,-48]}),keyboard:true,title:clinic.name,alt:'Consultório da Dra. Denisi. Abrir endereço e trajeto.'}).addTo(map);
 const popup=document.createElement('div');popup.className='clinic-popup';const name=document.createElement('strong');name.textContent=clinic.name;const address=document.createElement('p');address.textContent=clinic.address;const link=document.createElement('a');link.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(clinic.address);link.target='_blank';link.rel='noopener noreferrer';link.textContent='Como chegar';popup.append(name,address,link);marker.bindPopup(popup,{maxWidth:230});
 status.textContent='Selecione o sorriso para ver o endereço e como chegar.';
 let hadError=false;tiles.on('tileerror',()=>{hadError=true;status.textContent='Não foi possível carregar parte do mapa. O endereço e o link “Como chegar” continuam disponíveis.'});tiles.on('load',()=>{if(!hadError)status.textContent='Selecione o sorriso para ver o endereço e como chegar.'});
 new ResizeObserver(()=>map.invalidateSize()).observe(host);
 }catch{status.textContent='Mapa indisponível no momento. Use “Como chegar” para abrir o endereço.'}}
const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();initialize()}},{rootMargin:'250px'});observer.observe(host);
