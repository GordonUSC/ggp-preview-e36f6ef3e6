
(function(){
var d=document,root=d.documentElement;root.classList.remove('no-js');root.classList.add('js');
var calm=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
function all(s,c){return [].slice.call((c||d).querySelectorAll(s))}
// team view or public launch view
var sw=d.getElementById('viewsw');
function setView(p){root.classList.toggle('pubview',p);if(sw){sw.setAttribute('aria-pressed',p);sw.textContent=p?'Back to team view':'Show as public launch'}}
try{setView(localStorage.getItem('ggp_view')==='pub')}catch(e){}
if(sw)sw.addEventListener('click',function(){var p=!root.classList.contains('pubview');setView(p);try{localStorage.setItem('ggp_view',p?'pub':'team')}catch(e){}});
// the open seat sends you to the doors
var seat=d.getElementById('seat');
if(seat)seat.addEventListener('click',function(){setTimeout(function(){all('.door').forEach(function(x,i){setTimeout(function(){x.classList.remove('pulse');void x.offsetWidth;x.classList.add('pulse')},i*120)})},calm?0:450)});
// class map: tap a line to light it
all('.lens').forEach(function(L){var m=L.querySelector('.xmap');if(!m)return;var bs=all('.lnb',L);
 function pick(i){var on=m.getAttribute('data-on')===String(i);m.setAttribute('data-on',on?'':i);m.classList.toggle('pick',!on);all('[data-i]',m).forEach(function(x){x.classList.toggle('on',!on&&x.getAttribute('data-i')===String(i))});bs.forEach(function(b){b.setAttribute('aria-pressed',!on&&b.getAttribute('data-i')===String(i))})}
 bs.forEach(function(b){b.setAttribute('aria-pressed','false');b.addEventListener('click',function(){pick(b.getAttribute('data-i'))})});
 all('.ln',m).forEach(function(p){p.addEventListener('click',function(){pick(p.getAttribute('data-i'))})})});
// year
all('[data-year]').forEach(function(e){e.textContent=new Date().getFullYear()});
// menu
var m=d.getElementById('menu'),dr=d.getElementById('drawer');
if(m){m.addEventListener('click',function(){var o=dr.classList.toggle('open');m.setAttribute('aria-expanded',o);m.textContent=o?'Close':'Menu'})}
// reveal
var rv=all('.rv');
if('IntersectionObserver' in window&&!calm){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{rootMargin:'0px 0px -6% 0px'});rv.forEach(function(x){io.observe(x)})}
else rv.forEach(function(x){x.classList.add('in')});
// route stations draw in as they arrive
var st=all('.route.draw li');
if('IntersectionObserver' in window&&!calm){var io2=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io2.unobserve(x.target)}})},{rootMargin:'0px 0px -12% 0px'});st.forEach(function(x){io2.observe(x)})}
else st.forEach(function(x){x.classList.add('in')});
// numbers count up once
function countUp(b){var t=b.textContent,m=t.match(/[\d,]+/);if(!m)return;var end=parseInt(m[0].replace(/,/g,''),10),pre=t.slice(0,m.index),post=t.slice(m.index+m[0].length),t0=null;
 function f(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/900),v=Math.round(end*(1-Math.pow(1-p,3)));b.textContent=pre+v.toLocaleString('en-US')+post;if(p<1)requestAnimationFrame(f);else b.textContent=t}requestAnimationFrame(f)}
var nums=all('.stat b');
if('IntersectionObserver' in window&&!calm){var io3=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){countUp(x.target);io3.unobserve(x.target)}})},{threshold:.6});nums.forEach(function(x){io3.observe(x)})}
// the scroll rail fills as you travel
var rail=d.querySelector('.rail i');
if(rail){var tick=false;function upd(){tick=false;var h=d.documentElement.scrollHeight-innerHeight;rail.style.setProperty('--p',(h>0?Math.min(100,100*scrollY/h):0)+'%')}window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});upd()}
// hero loop: muted, short, pausable
var v=d.getElementById('loop'),pb=d.getElementById('pause');
if(v&&pb){if(calm){v.removeAttribute('autoplay');v.pause();pb.textContent='Play'}
 pb.addEventListener('click',function(){if(v.paused){v.play();pb.textContent='Pause'}else{v.pause();pb.textContent='Play'}})}
// audio welcome: off until asked
var aw=d.getElementById('welcome'),ab=d.getElementById('listen');
if(aw&&ab){ab.addEventListener('click',function(){if(aw.paused){aw.play();ab.textContent='Pause the welcome'}else{aw.pause();ab.textContent='Listen to a short welcome'}});aw.addEventListener('ended',function(){ab.textContent='Listen again'})}
// tabs (line map)
all('[role=tablist]').forEach(function(tl){var tabs=all('[role=tab]',tl);
 function pick(t){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;d.getElementById(x.getAttribute('aria-controls')).hidden=!on})}
 tabs.forEach(function(t,i){t.addEventListener('click',function(){pick(t)});t.addEventListener('keydown',function(e){var k=e.key,n=null;if(k==='ArrowRight')n=tabs[(i+1)%tabs.length];if(k==='ArrowLeft')n=tabs[(i+tabs.length-1)%tabs.length];if(n){e.preventDefault();pick(n);n.focus()}})})});
// gift levels
var gs=all('.gift'),go=d.getElementById('giftout');
gs.forEach(function(g){g.addEventListener('click',function(){gs.forEach(function(x){x.setAttribute('aria-pressed',x===g)});if(go){go.querySelector('b').textContent=g.getAttribute('data-amt');go.querySelector('span').textContent=g.getAttribute('data-what');go.classList.add('pop');setTimeout(function(){go.classList.remove('pop')},200)}})});
// filters (directory)
var fs=all('[data-filter]'),pc=all('[data-kind]');
fs.forEach(function(f){f.addEventListener('click',function(){var k=f.getAttribute('data-filter');fs.forEach(function(x){x.setAttribute('aria-pressed',x===f)});var n=0;pc.forEach(function(c){var on=k==='all'||c.getAttribute('data-kind').split(' ').indexOf(k)>-1;c.hidden=!on;if(on)n++});var o=d.getElementById('fcount');if(o)o.textContent=n+' shown'})});
// prototype forms: say plainly that nothing is sent
all('form[data-proto]').forEach(function(f){[].forEach.call(f.querySelectorAll('button[type=submit]'),function(b){b.disabled=false});f.addEventListener('submit',function(e){e.preventDefault();var o=f.querySelector('.msg');if(!o){o=d.createElement('p');o.className='msg';o.setAttribute('role','status');f.appendChild(o)}o.textContent='This is a prototype, so nothing was sent. On the real site this form reaches the GGP team.'})});
})();
