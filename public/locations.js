import {locations,directionsUrl} from './data.js';
let selected='pirabeiraba';
export const getSelectedLocation=()=>selected;
export function initLocations(){
 document.querySelectorAll('[data-address]').forEach(el=>el.textContent=locations[el.dataset.address].address);
 const update=id=>{if(!Object.hasOwn(locations,id))return;selected=id;const location=locations[id];document.querySelector('#location-name').textContent=location.name;document.querySelector('#location-address').textContent=location.address;document.querySelector('#directions').href=directionsUrl(id);document.querySelector('#location-book').dataset.location=id;document.querySelector('#map').setAttribute('aria-label',`Mapa do endereço de atendimento em ${location.name}`);document.dispatchEvent(new CustomEvent('locationchange',{detail:id}))};
 document.querySelectorAll('[name="visit-location"]').forEach(input=>input.addEventListener('change',()=>{if(input.checked)update(input.value)}));update(selected);
}
