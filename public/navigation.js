// One canonical list: the same DOM is used by the desktop and mobile header.
// Footer links also derive from that list instead of maintaining another copy.
export function initNavigation(){
 const list=document.querySelector('#primary-links');const footer=document.querySelector('#footer-links');footer.append(list.cloneNode(true));footer.firstElementChild.removeAttribute('id');
 const header=document.querySelector('.header');const sections=[...list.querySelectorAll('a')].map(a=>document.querySelector(a.hash));const links=[...document.querySelectorAll('#primary-links a,#footer-links a')];let scheduled=false;
 function update(){scheduled=false;const offset=header.getBoundingClientRect().height;document.documentElement.style.setProperty('--header-offset',`${offset+16}px`);let active=sections[0];const line=offset+Math.min(140,innerHeight*.18);for(const section of sections){if(section.getBoundingClientRect().top<=line)active=section}
  for(const link of links){if(link.hash===`#${active.id}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')}
 }
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update)}}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);new ResizeObserver(schedule).observe(header);update();
}
