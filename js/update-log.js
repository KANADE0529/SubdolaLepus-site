(function (root) {
  'use strict';
  function timestamp(entry) {
    const time = typeof entry.date === 'string' ? Date.parse(entry.date) : NaN;
    return Number.isFinite(time) ? time : -Infinity;
  }
  function select(entries, {category='all', scope='', limit=3}={}) {
    const categories = category.split(',');
    return (Array.isArray(entries) ? entries : [])
      .filter(entry => entry && typeof entry.file === 'string' && typeof entry.summary === 'string')
      .filter(entry => category === 'all' || categories.includes(entry.category))
      .filter(entry => !scope || !entry.scope || entry.scope === scope)
      .map((entry,index) => ({entry,index}))
      .sort((a,b) => timestamp(b.entry)-timestamp(a.entry) || a.index-b.index)
      .slice(0, Math.max(0, Number(limit) || 0)).map(item=>item.entry);
  }
  function render(host, options={}) {
    host.replaceChildren();
    host.classList.add('archive-updates');
    const heading=document.createElement('h3');
    heading.className='update-heading'; heading.textContent='更新紀錄';
    host.append(heading);
    const entries=select(root.ARCHIVE_UPDATE_LOGS, options);
    if(!entries.length) {
      const empty=document.createElement('p'); empty.className='update-empty';
      empty.textContent='EMPTY / NO RECENT LOG'; host.append(empty); return;
    }
    entries.forEach((entry,index)=>{
      const item=document.createElement('div'); item.className='log-item';
      const code=document.createElement('div'); code.className='log-code';
      code.textContent='LOG / '+String(index+1).padStart(3,'0');
      const main=document.createElement('div'); main.className='log-main';
      const title=document.createElement('strong'); title.textContent='更新檔案：'+entry.file;
      const summary=document.createElement('p'); summary.textContent=entry.summary;
      const time=document.createElement('time'); time.className='update-time';
      if(timestamp(entry)!==-Infinity) {
        time.dateTime=entry.date;
        time.textContent=new Intl.DateTimeFormat('zh-TW',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(entry.date));
      } else time.textContent='日期未記錄';
      main.append(title,summary,time); item.append(code,main); host.append(item);
    });
  }
  function mount(target, category, scope='', limit=3) {
    const parent=document.querySelector(target); if(!parent) return;
    const host=document.createElement('section'); host.setAttribute('aria-label','更新紀錄');
    parent.append(host); render(host,{category,scope,limit});
  }
  function init() {
    const page=document.body.dataset.updatePage;
    if(page==='dashboard') {
      for(const [id,category] of Object.entries({control:'all',characters:'characters',records:'records,areas,corridor',timeline:'timeline',gallery:'gallery',restricted:'restricted'})) mount('#'+id+' .content',category);
      const count=document.getElementById('recentUpdateCount');
      if(count)count.textContent=String(select(root.ARCHIVE_UPDATE_LOGS,{limit:3}).length).padStart(2,'0')+' ENTRIES';
      return;
    }
    if(page==='records') {
      for(const [category,label] of [['records','普通檔案紀錄'],['areas','區域額外紀錄'],['corridor','夜想的迴廊']]) {
        mount('.content',category);
        document.querySelector('.content').lastElementChild.querySelector('.update-heading').textContent=label+' / 更新紀錄';
      }
      return;
    }
    const destinations={
      gallery:['.content','gallery'],
      timeline:['.container','timeline'],
      areas:['.content','areas'],
      'default-records':['.log-sidebar','records'],
      restricted:['main.page','restricted'],
      'area-detail':['.log-sidebar','areas',document.body.dataset.updateScope],
      characters:['.file-window','characters',new URLSearchParams(location.search).get('id')||'']
    };
    if(destinations[page])mount(...destinations[page]);
  }
  root.ArchiveUpdates={select,render};
  if(typeof module!=='undefined')module.exports={select,timestamp};
  if(typeof document!=='undefined') {
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
    else init();
  }
})(globalThis);
