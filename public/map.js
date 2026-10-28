import {clinic,locations,directionsUrl} from './data.js';
import {getSelectedLocation} from './locations.js';
// Address points are confirmed OSM buildings. The room number is displayed,
// but no position inside the building is invented. See docs/*verification.json.
const host=document.querySelector('#map'),status=document.querySelector('#map-status');let map,marker;
function renderLocation(){if(!map||!marker)return;const id=getSelectedLocation(),location=locations[id],point=[location.lat,location.lng];marker.closePopup();marker.setLatLng(point);map.setView(point,18,{animate:false});host.dataset.location=id;
 const label=`${clinic.name} — ${location.name}. Abrir endereço e trajeto.`;marker.getElement()?.setAttribute('aria-label',label);marker.getElement()?.setAttribute('title',label);
 const popup=document.createElement('div');popup.className='clinic-popup';const name=document.createElement('strong');name.textContent=clinic.name+' — '+location.name;const address=document.createElement('p');address.textContent=location.address;const link=document.createElement('a');link.href=directionsUrl(id);link.target='_blank';link.rel='noopener noreferrer';link.textContent='Como chegar';popup.append(name,address,link);marker.bindPopup(popup,{maxWidth:230});status.textContent='Selecione o sorriso para ver o endereço e como chegar.';
}
document.addEventListener('locationchange',renderLocation);
async function initialize(){try{
 await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='/vendor/leaflet.js';script.onload=resolve;script.onerror=reject;document.head.append(script)});
 const L=window.L,location=locations[getSelectedLocation()],point=[location.lat,location.lng];map=L.map(host,{scrollWheelZoom:false,keyboard:true}).setView(point,18);
 const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'}).addTo(map);
 const markerSvg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 58"><path d="M24 55C20 49 4 36 4 24a20 20 0 1 1 40 0c0 12-16 25-20 31Z" fill="#102D43" stroke="#86CDE8" stroke-width="2.5"/><path d="M14 25q10 14 20 0" fill="none" stroke="white" stroke-width="2.8" stroke-linecap="round"/><circle cx="16" cy="18" r="1.8" fill="white"/><circle cx="32" cy="18" r="1.8" fill="white"/></svg>';
 marker=L.marker(point,{icon:L.divIcon({html:markerSvg,className:'smile-map-marker',iconSize:[48,58],iconAnchor:[24,55],popupAnchor:[0,-48]}),keyboard:true,title:clinic.name,alt:'Endereço de atendimento. Abrir endereço e trajeto.'}).addTo(map);renderLocation();
 tiles.on('tileerror',()=>status.textContent='Não foi possível carregar parte do mapa. O endereço e o link “Como chegar” continuam disponíveis.');
 new ResizeObserver(()=>map.invalidateSize()).observe(host);
 }catch{status.textContent='Mapa indisponível no momento. Use “Como chegar” para abrir o endereço.'}}
const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();initialize()}},{rootMargin:'250px'});observer.observe(host);
