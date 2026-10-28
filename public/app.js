import {initNavigation} from './navigation.js';
import {initMotion} from './motion.js';
import {serviceArt,renderIcons} from './icons.js';
import {clinic,services,serviceOptions,todayJoinville,dateError,whatsappUrl} from './data.js';
const $=s=>document.querySelector(s);
document.querySelectorAll('[data-whatsapp]').forEach(a=>a.href=clinic.whatsapp);
document.querySelectorAll('[data-address]').forEach(a=>a.textContent=clinic.address);
$('#instagram').href=clinic.instagram;$('#year').textContent=new Date().getFullYear();
const address=encodeURIComponent(clinic.address);$('#directions').href='https://www.google.com/maps/search/?api=1&query='+address;
initNavigation();
const menu=$('#navigation'),toggle=$('.menu-toggle');function closeMenu(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');menu.inert=matchMedia('(max-width:900px)').matches}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';menu.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');menu.inert=!open});
menu.addEventListener('click',e=>{if(e.target.closest('a,button'))closeMenu()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){closeMenu();toggle.focus()}});matchMedia('(min-width:901px)').addEventListener('change',closeMenu);
const art=serviceArt;
const track=$('#service-track');let selectedService='';
function selectService(card,service){selectedService=service;track.querySelectorAll('.service-card').forEach(el=>{const selected=el===card;el.classList.toggle('is-selected',selected);el.querySelector('.service-select').setAttribute('aria-pressed',String(selected));el.querySelector('.selection-indicator').textContent=selected?'✓ Selecionado':'Selecionar'});}
services.forEach(([title,description,service,icon])=>{const card=document.createElement('article');card.className='service-card';card.setAttribute('aria-label',title);card.innerHTML=`<button type="button" class="service-select" aria-pressed="false" aria-label="Selecionar serviço: ${title}"><span class="service-art" aria-hidden="true"><svg viewBox="0 0 64 64">${art[icon]}</svg></span><span class="service-name">${title}</span><span class="selection-indicator">Selecionar</span></button><div class="card-content"><p>${description}</p><button data-book data-service="${service}">Solicitar avaliação <span class="inline-icon" data-icon="chevron-right" aria-hidden="true"></span></button></div>`;card.addEventListener('click',e=>{if(!e.target.closest('[data-book]'))selectService(card,service)});track.append(card)});
const reduced=matchMedia('(prefers-reduced-motion:reduce)');function move(direction){const card=track.firstElementChild;track.scrollBy({left:direction*(card.getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap)),behavior:reduced.matches?'instant':'smooth'})}
$('#previous').onclick=()=>move(-1);$('#next').onclick=()=>move(1);track.addEventListener('keydown',e=>{if(e.target!==track)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}if(e.key==='Home'||e.key==='End'){e.preventDefault();track.scrollTo({left:e.key==='Home'?0:track.scrollWidth,behavior:reduced.matches?'instant':'smooth'})}});
function updateArrows(){$('#previous').disabled=track.scrollLeft<2;$('#next').disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-3}track.addEventListener('scroll',updateArrows,{passive:true});new ResizeObserver(updateArrows).observe(track);updateArrows();
const dialog=$('#booking'),form=$('#booking-form');let origin;let closing=false;
function closeBooking(){if(closing||!dialog.open)return;closing=true;const finish=()=>{if(dialog.open)dialog.close();closing=false};if(reduced.matches){finish();return}dialog.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(10px)'}],{duration:160,easing:'ease-in',fill:'none'}).finished.then(finish,finish)}
for(const service of serviceOptions){const opt=document.createElement('option');opt.value=opt.textContent=service;$('#service').append(opt)}
function error(field,message){const input=$('#'+field);input.setAttribute('aria-invalid',String(!!message));$('#'+field+'-error').textContent=message}
function validate(field){const value=$('#'+field).value;const message=field==='name'?(!value.trim()?'Informe seu nome.':''):field==='service'?(!serviceOptions.includes(value)?'Selecione um serviço de interesse.':''):dateError(value);error(field,message);return !message}
document.addEventListener('click',e=>{const button=e.target.closest('[data-book]');if(!button)return;origin=button;form.reset();['name','service','date'].forEach(field=>error(field,''));$('#form-status').textContent='';$('#service').value=button.dataset.service||'';$('#date').min=todayJoinville();dialog.showModal();if(!reduced.matches)dialog.animate([{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}],{duration:230,easing:'ease-out'});document.body.classList.add('modal-open');$('#name').focus()});
$('#close-modal').onclick=closeBooking;dialog.addEventListener('cancel',e=>{e.preventDefault();closeBooking()});dialog.addEventListener('close',()=>{form.reset();document.body.classList.remove('modal-open');origin?.focus()});dialog.addEventListener('click',e=>{if(e.target===dialog){const rect=dialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)closeBooking()}});
for(const field of ['name','service','date'])$('#'+field).addEventListener(field==='name'?'input':'change',()=>validate(field));
form.addEventListener('submit',e=>{e.preventDefault();const invalid=['name','service','date'].filter(field=>!validate(field));if(invalid.length){$('#'+invalid[0]).focus();return}const data=Object.fromEntries(new FormData(form));window.open(whatsappUrl(data),'_blank','noopener,noreferrer');$('#form-status').textContent='Revise e envie sua solicitação no WhatsApp. A disponibilidade será confirmada pela equipe.'});

renderIcons();
const reviews=$('.reviews-track');reviews.addEventListener('keydown',e=>{if(e.target!==reviews||!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();reviews.scrollBy({left:(e.key==='ArrowRight'?1:-1)*(reviews.firstElementChild.getBoundingClientRect().width+20),behavior:reduced.matches?'instant':'smooth'})});
$('#back-top').addEventListener('click',()=>{window.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'});$('.brand').focus({preventScroll:true})});
import('./map.js');

menu.inert=matchMedia('(max-width:900px)').matches;
initMotion(reduced);
