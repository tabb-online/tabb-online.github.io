
const state = window.TABB_SPIELPLAN || {date:new Date().toISOString().slice(0,10),courtCount:12,matches:[]};
const settings = window.TABB_DISPLAY_SETTINGS || {pageSeconds:10,courtsPerPage:6};
const sponsorFiles = Array.from({length:20},(_,i)=>`sponsor${String(i+1).padStart(2,"0")}.jpg`).concat(["yonex.jpg"]);

function escapeHtml(v){return String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
function formatDate(v){if(!v)return"";const d=new Date(v+"T12:00:00");return new Intl.DateTimeFormat("de-DE",{weekday:"long",day:"2-digit",month:"long",year:"numeric"}).format(d)}
function sponsorTile(f){const d=document.createElement("div");d.className="sponsor-tile";d.innerHTML=`<img src="${f}" alt="Sponsor">`;return d}

function buildSponsors(){
 const track=document.getElementById("marqueeTrack");
 [...sponsorFiles,...sponsorFiles].forEach(f=>track.appendChild(sponsorTile(f)));
 sponsorFiles.forEach(f=>document.getElementById("sponsorWall").appendChild(sponsorTile(f)));
}

function buildCourtCard(no,matches){
 const card=document.createElement("article");card.className="court-card";
 const head=document.createElement("div");head.className="court-head";
 head.innerHTML=`<div class="court-number">Platz ${no}</div><div class="court-status">${matches.length?`${matches.length} Begegnung${matches.length>1?"en":""}`:"frei"}</div>`;
 card.appendChild(head);
 if(!matches.length){
   const free=document.createElement("div");free.className="free-court";
   free.innerHTML="<div><strong>Heute frei</strong><div>Keine Mannschaftsbegegnung</div></div>";
   card.appendChild(free);return card;
 }
 const list=document.createElement("div");list.className="match-list";
 matches.forEach(m=>{
   const item=document.createElement("div");item.className="match";
   item.innerHTML=`<div class="match-time">${escapeHtml(m.start)}${m.end?" – "+escapeHtml(m.end):""} Uhr</div>
   <div class="team-row"><div class="team-label">Heim</div><div class="team">${escapeHtml(m.home)}</div></div>
   <div class="team-row"><div class="team-label">Gast</div><div class="team">${escapeHtml(m.away)}</div></div>`;
   list.appendChild(item);
 });
 card.appendChild(list);return card;
}

function buildPages(){
 document.getElementById("displayDate").textContent=formatDate(state.date);
 const wrap=document.getElementById("courtPages");
 const fill=document.getElementById("sponsorFill");
 const matches=Array.isArray(state.matches)?state.matches:[];
 const highestMatchCourt=matches.reduce((m,x)=>Math.max(m,Number(x.court)||0),0);
 const courtCount=Math.max(Number(state.courtCount)||0,highestMatchCourt);

 if(!matches.length){
   wrap.classList.add("hidden");
   fill.classList.remove("hidden");
   return;
 }
 fill.classList.add("hidden");

 const per=6;
 const pageCount=Math.max(1,Math.ceil(courtCount/per));

 for(let p=0;p<pageCount;p++){
   const page=document.createElement("div");
   page.className="court-page"+(p?" hidden":"");
   for(let slot=1;slot<=per;slot++){
     const no=p*per+slot;
     if(no<=courtCount){
       const ms=matches.filter(m=>Number(m.court)===no).sort((a,b)=>String(a.start).localeCompare(String(b.start)));
       page.appendChild(buildCourtCard(no,ms));
     }else{
       const blank=document.createElement("div");blank.className="empty-slot";page.appendChild(blank);
     }
   }
   wrap.appendChild(page);
 }

 let current=0;
 const indicator=document.getElementById("pageIndicator");
 const pageSeconds=Math.max(3,+settings.pageSeconds||10);
 const dotCount=4;
 let elapsed=0;

 function renderIndicator(){
   if(pageCount<=1){indicator.innerHTML="";return;}
   const filled=Math.min(dotCount,Math.floor(elapsed/(pageSeconds/(dotCount+1))));
   indicator.innerHTML=
     `<div class="switch-countdown" aria-label="Zeit bis zum Seitenwechsel">`+
     Array.from({length:dotCount},(_,i)=>`<span class="switch-dot ${i<filled?"active":""}"></span>`).join("")+
     `</div><span class="page-number">${current+1} / ${pageCount}</span>`;
 }

 function show(){
   [...wrap.children].forEach((p,i)=>p.classList.toggle("hidden",i!==current));
   renderIndicator();
 }
 show();

 if(pageCount>1){
   setInterval(()=>{
     elapsed++;
     if(elapsed>=pageSeconds){
       current=(current+1)%pageCount;
       elapsed=0;
       show();
     }else{
       renderIndicator();
     }
   },1000);
 }
}
function clock(){document.getElementById("clock").textContent=new Date().toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"})}
buildSponsors();buildPages();clock();setInterval(clock,30000);
