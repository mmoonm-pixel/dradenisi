// Progressive enhancement: all content is visible before and without JavaScript.
export function initMotion(preference){
 if(!('IntersectionObserver' in window)||!Element.prototype.animate)return;
 const nodes=[...document.querySelectorAll('.section-heading,.service-card,.photo-copy,.testimonials>h2,.review,.reviews-source,.location-heading,.location>div>h2,.map-frame,.footer-grid,.footer-top,.footer-bottom')];
 const visible=new WeakSet(),running=new WeakMap();
 nodes.forEach(el=>{if(el.matches('.service-card,.review'))el.dataset.motionDelay=String([...el.parentElement.children].indexOf(el)%3*65)});
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries){const el=entry.target;
   if(!entry.isIntersecting){if(running.get(el)?.playState!=='running')visible.delete(el);continue}
   if(visible.has(el))continue;visible.add(el);
   if(preference.matches||el.contains(document.activeElement))continue;
   running.get(el)?.cancel();const animation=el.animate([{opacity:.22,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:480,delay:Number(el.dataset.motionDelay||0),easing:'cubic-bezier(.2,.65,.3,1)',fill:'none'});running.set(el,animation);
   animation.finished.then(()=>{const r=el.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)visible.delete(el)}).catch(()=>{});
  }
 },{threshold:0,rootMargin:'0px 0px -20px 0px'});
 nodes.forEach(el=>observer.observe(el));
 preference.addEventListener('change',()=>{if(preference.matches)nodes.forEach(el=>running.get(el)?.cancel())});
}
