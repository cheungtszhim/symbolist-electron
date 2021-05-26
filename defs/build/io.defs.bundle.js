(()=>{var t={489:(t,e,i)=>{const s=new Map,a=i(254),r=i(934),o=i(270),n=i(755),l=i(350),d=i(564),c=i(783),u=i(16),h=i(670),p=i(472),m=i(169),y=i(558),g=i(102),x=i(890);s.set("AzimNote",new r.io_def),s.set("BasicSymbol",new o.io_def),s.set("BetaEnv",new n.io_def),s.set("CartesianPlot",new l.io_def),s.set("ColorPitch",new d.io_def),s.set("FiveLineStave",new c.io_def),s.set("FiveLineStaveEvent",new u.io_def),s.set("Measure",new h.io_def),s.set("PartStave",new p.io_def),s.set("RootSymbol",new m.io_def),s.set("DataPoint",new y.io_def),s.set("SystemContainer",new g.io_def),s.set("NodescoreAPI",new x.io_def),t.exports={ioDefs:s,initDef:a}},254:t=>{"use strict";t.exports=JSON.parse('{"about":"symbolist will read a json file to configure the palette setup, this can be used to dynamically change also (eventually)","id":"Score","tools":[],"palette":["SubdivisionTool","BasicSymbolGL"],"class":"RootSymbol","contents":{"id":"trio","class":"SystemContainer","x":200,"y":100,"duration":20,"time":0,"contents":[{"id":"oboe","class":"FiveLineStave","height":100,"lineSpacing":10,"duration":20,"time":0,"contents":[]},{"id":"bassoon","class":"PartStave","height":100,"time":0,"duration":20,"contents":[]},{"id":"synth","class":"PartStave","height":200,"time":0,"duration":20,"contents":[]}]}}')},934:(t,e,i)=>{const s=i(20);class a extends s.SymbolBase{constructor(){super(),this.class="AzimNote",this.default_dist=10}get structs(){return{data:{class:this.class,id:`${this.class}-0`,time:0,pitch:55,azim:3.14,duration:.1},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,r:2,azim:3.14}}}display(t){return ui_api.hasParam(t,Object.keys(this.structs.view)),[{id:`${t.id}-notehead`,class:"notehead",new:"circle",cx:t.x,cy:t.y,r:t.r},{new:"line",id:`${t.id}-azim`,class:"azimLine",x1:t.x,y1:t.y,x2:t.x+Math.sin(t.azim)*this.default_dist,y2:t.y+Math.cos(t.azim)*this.default_dist}]}getElementViewParams(t){const e=t.querySelector(".notehead"),i=t.querySelector(".azimLine"),s=parseFloat(e.getAttribute("cx")),a=parseFloat(e.getAttribute("cy")),r=parseFloat(e.getAttribute("r")),o=parseFloat(i.getAttribute("x2")),n=parseFloat(i.getAttribute("y2")),l=Math.atan2(o-s,n-a);return{id:t.id,x:s,y:a,r,azim:l}}getPaletteIcon(){return{key:"svg",val:this.display({id:`${this.class}-icon`,class:this.class,x:10,y:10,r:2,azim:.15})}}editMode(t,e=!1){return super.editMode(t,e),e&&ui_api.createHandle(t,{selector:`#${t.id} .azimLine`,x:"x2",y:"y2"},((t,e)=>{const i=t.querySelector(".azimLine"),s=parseFloat(i.getAttribute("x1")),a=parseFloat(i.getAttribute("y1"));let r=ui_api.getSVGCoordsFromEvent(e),o=Math.atan2(r.x-s,r.y-a);t.dataset.azim=o,this.updateFromDataset(t)})),!0}}class r extends s.IO_SymbolBase{constructor(){super(),this.class="AzimNote"}}t.exports={ui_def:a,io_def:r}},270:(t,e,i)=>{const s=i(20);class a extends s.SymbolBase{constructor(){super(),this.class="BasicSymbol"}get structs(){return{data:{class:this.class,id:`${this.class}-0`,time:0,pitch:55,duration:.1},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,r:2}}}display(t){return ui_api.hasParam(t,Object.keys(this.structs.view)),{new:"circle",class:"notehead",id:`${t.id}-notehead`,cx:t.x,cy:t.y,r:t.r}}getElementViewParams(t){const e=t.querySelector(".notehead"),i=parseFloat(e.getAttribute("cx")),s=parseFloat(e.getAttribute("cy")),a=parseFloat(e.getAttribute("r"));return{id:t.id,x:i,y:s,r:a}}getPaletteIcon(){return{key:"svg",val:this.display({id:`${this.class}-palette-icon`,class:this.class,x:10,y:10,r:2})}}getDataTextView(t,e=null){let i={key:"svg",val:[]};return Object.keys(t).forEach((s=>{i.val.push({new:"text",class:"data_text sprite",container:"symbolist_overlay",relativeTo:e||`#${t.id}`,id:`${t.id}-${s}-data_text`,x:0,y:-20,text:s+String(t[s])})})),console.log(i),i}svgPreviewFromViewAndData(t,e,i=null){let s=ui_api.svgFromViewAndData(t,{...e,class:`${e.class} sprite`,id:`${e.class}-sprite`,container:"symbolist_overlay"},!0);return i&&(i=`#${e.class}-sprite ${i}`),[s,this.getDataTextView({...e,id:`${e.class}-sprite`},i)]}fromData(t,e,i=!1){const s={...this.structs.data,...t},a=this.dataToViewParams(s,e),r=this.display(a),o=i?this.svgPreviewFromViewAndData(r,s):ui_api.svgFromViewAndData(r,s);if(ui_api.drawsocketInput(o),!i){let e={};e[t.id]=a,ui_api.outlet({viewParams:e})}}}class r extends s.IO_SymbolBase{constructor(){super(),this.class="BasicSymbol"}}t.exports={ui_def:a,io_def:r}},755:(t,e,i)=>{const s=i(20);class a extends s.SymbolBase{constructor(){super(),this.class="BetaEnv",this.height=10}get structs(){return{data:{class:this.class,id:`${this.class}-0`,a:2,b:2,duration:.1,time:0,pitch:60},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,a:2,b:2,width:10}}}display(t){ui_api.hasParam(t,Object.keys(this.structs.view));let e=function(t,e){for(var i=function(t,e,i){var s=function(t,e){return Math.exp(n(t)+n(e)-n(t+e))}(t,e);return t>1&&e>1?1/(s*(c((t-1)/(t+e-2),t,e)/s)):t>1&&1==e?1/(s*(c(1,t,e)/s)):1==t&&e>1?1/(s*(c(0,t,e)/s)):t>=1&&e<1?1/(s*(c(1-i,t,e)/s)):t<1&&e>=1?1/(s*(c(i,t,e)/s)):t<1&&e<1?t>e?1/(s*(c(1-i,t,e)/s)):1/(s*(c(i,t,e)/s)):1==t&&1==e?1:(post("unknown situation",t,e,"\n"),0)}(t=t<=u?u:t,e=e<=u?u:e,d),s=[],a=0;a<l;++a){var r=c(a*d,t,e)*i;r<1e-6&&(r=0),r>1&&(r=1),s.push(r)}return s}(t.a,t.b);const i=e.length,s=t.width/i;let a=[{x:t.x,y:t.y+this.height}],r=0;for(;r<i;r++)a.push({x:t.x+r*s,y:t.y+(1-e[r])*this.height});for(;--r>0;)a.push({x:t.x+r*s,y:t.y+this.height+e[r]*this.height});return a.push(a[0]),[{new:"path",class:"beta_env",id:`${t.id}-path`,d:SVGPoints.toPath(a)},{new:"line",x1:t.x,x2:t.x,y1:t.y-2*this.height,y2:t.y+2*this.height,class:"beta_env_start",id:`${t.id}-start`}]}getElementViewParams(t){const e=t.querySelector(".display .beta_env").getAttribute("d"),i=SVGPoints.toPoints({type:"path",d:e});let s=i[0].x,a=i[0].y,r=i[i.length-1].x-s,o=parseFloat(t.dataset.a),n=parseFloat(t.dataset.b);return{id:t.id,x:s,y:a,a:o,b:n,width:r}}getPaletteIcon(){return{key:"svg",val:this.display({...this.structs.view,id:"newPartStave-palette-icon",class:this.class,a:2,b:2,duration:.2})}}}class r extends s.IO_SymbolBase{constructor(){super(),this.class="BetaEnv"}getFormattedLookup(t,e){return{pitch:e.pitch,duration:e.duration,time:e.time,a:e.a,b:e.b}}}t.exports={ui_def:a,io_def:r};var o=[.9999999999999971,57.15623566586292,-59.59796035547549,14.136097974741746,-.4919138160976202,3399464998481189e-20,4652362892704858e-20,-9837447530487956e-20,.0001580887032249125,-.00021026444172410488,.00021743961811521265,-.0001643181065367639,8441822398385275e-20,-26190838401581408e-21,36899182659531625e-22];function n(t){if(t<0)return Number("0/0");for(var e=o[0],i=o.length-1;i>0;--i)e+=o[i]/(t+i);var s=t+4.7421875+.5;return.5*Math.log(2*Math.PI)+(t+.5)*Math.log(s)-s+Math.log(e)-Math.log(t)}var l=100,d=.01;function c(t,e,i){var s=Math.pow(t,e-1)*Math.pow(1-t,i-1);return s==1/0?1:s}var u=1e-6},350:(t,e,i)=>{const s=i(20);class a extends s.SymbolBase{constructor(){super(),this.class="CartesianPlot",this.palette=["DataPoint"],this.margin=20,this.half_margin=this.margin/2}get structs(){return{data:{class:this.class,id:`${this.class}-0`,x_param:"centroid",y_param:"spread",x:100,y:100,width:800,height:600},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,height:20,width:20},children:{data:{centroid:0,spread:0,amplitude:0},view:{x:0,y:0}}}}drag(t,e){}display(t){return ui_api.hasParam(t,Object.keys(this.structs.view)),{new:"rect",id:`${t.id}-rect`,class:"CartesianPlot-rect",x:t.x,y:t.y,height:t.height,width:t.width}}getElementViewParams(t){const e=t.querySelector(".display .CartesianPlot-rect");return{id:t.id,x:parseFloat(e.getAttribute("x")),y:parseFloat(e.getAttribute("y")),width:parseFloat(e.getAttribute("width")),height:parseFloat(e.getAttribute("height"))}}dataToViewParams(t,e){let i=ui_api.filterByKeys(t,Object.keys(this.structs.view));return{...this.structs.view,...i,id:t.id}}getPaletteIcon(){return{key:"svg",val:this.display({...this.structs.view,id:"CartesianPlot-palette-icon",class:this.class})}}childDataToViewParams(t,e){const i=t.dataset.x_param,s=t.dataset.y_param;if(ui_api.hasParam(e,[i,s])){const a=ui_api.getBBoxAdjusted(t);return{x:a.x+e[i]*a.width,y:a.y+a.height-e[s]*a.height}}}childViewParamsToData(t,e,i=null){const s=t.dataset.x_param,a=t.dataset.y_param;if(ui_api.hasParam(e,["x","y"])){const i=ui_api.getBBoxAdjusted(t);let r={};return r[s]=(e.x-i.x)/i.width,r[a]=1-(e.y-i.y)/i.height,r}}updateAfterContents(t){}updateFromDataset(t){}}class r extends s.IO_SymbolBase{constructor(){super(),this.class="CartesianPlot"}}t.exports={ui_def:a,io_def:r}},564:(t,e,i)=>{const s=i(20);class a extends s.SymbolBase{constructor(){super(),this.class="ColorPitch"}get structs(){return{data:{class:this.class,id:`${this.class}-0`,time:0,pitch:55,duration:.1},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,r:4,color:"rgba(255,0,255,1)"}}}display(t){return ui_api.hasParam(t,Object.keys(this.structs.view)),console.log("test",t),{new:"circle",class:"notehead",id:`${t.id}-notehead`,cx:t.x,cy:t.y,r:t.r,style:{fill:t.color}}}getElementViewParams(t){const e=t.querySelector(".notehead"),i=parseFloat(e.getAttribute("cx")),s=parseFloat(e.getAttribute("cy")),a=parseFloat(e.getAttribute("r")),r=e.style.fill;return{id:t.id,x:i,y:s,r:a,color:r}}getPaletteIcon(){return{key:"svg",val:this.display({id:`${this.class}-palette-icon`,class:this.class,x:10,y:10,r:2,color:"rbga(255, 0, 255, 1)"})}}dataToViewParams(t,e){const i=ui_api.getDefForElement(e);let s=`rgba( ${t.pitch/127*255}, 0, 255, 1)`;return{...this.structs.view,...ui_api.filterByKeys(t,Object.keys(this.structs.view)),...i.childDataToViewParams(e,t),color:s,id:t.id,container:t.container}}drag(t,e){if("edit"==this.m_mode);else{ui_api.translate(t,e.delta_pos);let i=this.getElementViewParams(t);i.x+=e.delta_pos.x,i.y+=e.delta_pos.y;let s=ui_api.getContainerForElement(t),a=this.viewParamsToData(i,s),r=this.dataToViewParams(a,s),o={key:"svg",val:{id:`${a.id}-notehead`,style:{fill:r.color}}};console.log("updating color",o),ui_api.drawsocketInput([o,ui_api.getDataTextView(a)])}return!0}}class r extends s.IO_SymbolBase{constructor(){super(),this.class="ColorPitch"}}t.exports={ui_def:a,io_def:r}},558:(t,e,i)=>{const s=i(20);class a extends s.SymbolBase{constructor(){super(),this.class="DataPoint"}get structs(){return{data:{class:this.class,id:`${this.class}-0`,centroid:0,spread:0,amplitude:0},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,r:2}}}display(t){return ui_api.hasParam(t,Object.keys(this.structs.view)),{new:"circle",class:"notehead",id:`${t.id}-notehead`,cx:t.x,cy:t.y,r:t.r}}getElementViewParams(t){const e=t.querySelector(".notehead"),i=parseFloat(e.getAttribute("cx")),s=parseFloat(e.getAttribute("cy")),a=parseFloat(e.getAttribute("r"));return{id:t.id,x:i,y:s,r:a}}getPaletteIcon(){return{key:"svg",val:this.display({id:`${this.class}-palette-icon`,class:this.class,x:10,y:10,r:2})}}}class r extends s.IO_SymbolBase{constructor(){super(),this.class="DataPoint"}}t.exports={ui_def:a,io_def:r}},783:(t,e,i)=>{const s=i(20),a=[0,1,1,2,2,3,4,4,5,5,6,6],r=[0,1,2,2,3,3,4,5,5,6,6,7],o=[0,0,1,0,1,0,0,1,0,1,0,1];class n extends s.SymbolBase{constructor(){super(),this.class="FiveLineStave",this.palette=["FiveLineStaveEvent"],this.left_margin=20,this.x2time=.001,this.time2x=1e3,this.midiMiddleLine=71}get structs(){return{data:{class:this.class,id:`${this.class}-0`,time:0,duration:1,height:100,lineSpacing:10},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,height:100,width:100,lineSpacing:10},children:{data:{time:0,midi:60,duration:1},view:{x:0,y:0,width:100}}}}display(t){ui_api.hasParam(t,Object.keys(this.structs.view));let e=t.y+t.height/2;return[{new:"rect",id:`${t.id}-rect`,class:"staveBox",x:t.x,y:t.y,width:t.width,height:t.height},{new:"text",id:`${t.id}-label`,class:"staveLabel",x:t.x-this.left_margin,y:e,text:t.id},{new:"image",id:`${t.id}-clef`,href:"defs/assets/g_clef.svg",x:t.x,y:t.y},{new:"g",id:`${t.id}-staffline-group`,children:[{new:"line",id:`${t.id}-line-1`,class:"staffline",x1:t.x,y1:e-2*t.lineSpacing,x2:t.x+t.width,y2:e-2*t.lineSpacing},{new:"line",id:`${t.id}-line-2`,class:"staffline",x1:t.x,y1:e-t.lineSpacing,x2:t.x+t.width,y2:e-t.lineSpacing},{new:"line",id:`${t.id}-line-3`,class:"staffline",x1:t.x,y1:e,x2:t.x+t.width,y2:e},{new:"line",id:`${t.id}-line-4`,class:"staffline",x1:t.x,y1:e+t.lineSpacing,x2:t.x+t.width,y2:e+t.lineSpacing},{new:"line",id:`${t.id}-line-5`,class:"staffline",x1:t.x,y1:e+2*t.lineSpacing,x2:t.x+t.width,y2:e+2*t.lineSpacing}]}]}getElementViewParams(t){const e=t.querySelector(".staveBox");return{id:t.id,x:parseFloat(e.getAttribute("x")),y:parseFloat(e.getAttribute("y")),width:parseFloat(e.getAttribute("width")),height:parseFloat(e.getAttribute("height")),lineSpacing:parseFloat(t.dataset.lineSpacing)}}getPaletteIcon(){return{key:"svg",val:this.display({...this.structs.view,id:"fiveLine-palette-icon",class:this.class})}}midi2y(t,e,i="sharp"){const s=t-this.midiMiddleLine;let n=Math.floor(s)%12;return n<0&&(n+=12),Number(s<0),{yOffset:Math.floor(s/12)*(7*e)+("sharp"==i?a:r)[n]*e,accidental:o[n]?i:null}}y2midi(t,e,i="sharp"){const s=document.getElementById(`${e.id}-line-3`),a=.25*e.dataset.lineSpacing,r=parseFloat(s.getAttribute("y1"))-t,o=Math.floor(r/a);return this.midiMiddleLine+o}childDataToViewParams(t,e){if("Measure"==e.class||"SnapPoint"==e.class){let i={};if("Measure"==e.class){const s=document.getElementById(`${t.id}-line-1`),a=document.getElementById(`${t.id}-line-5`);i.y=parseFloat(s.getAttribute("y1"));let r=parseFloat(a.getAttribute("y1"));i.height=r-i.y,i.x=parseFloat(s.getAttribute("x1"))+(e.time-parseFloat(t.dataset.time))*this.time2x,i.width=e.duration*this.time2x}else{const s=document.getElementById(`${t.id}-rect`);i.y=parseFloat(s.getAttribute("y")),i.x=parseFloat(s.getAttribute("x"))+(e.time-parseFloat(t.dataset.time))*this.time2x}return i}if(ui_api.hasParam(e,["time","duration","midi"])){const i=document.getElementById(`${t.id}-rect`),s=parseFloat(i.getAttribute("x")),a=document.getElementById(`${t.id}-line-3`),r=parseFloat(t.dataset.lineSpacing),o=.5*r,n=this.midi2y(Math.round(e.midi),o,"sharp"),l=parseFloat(a.getAttribute("y1"))-n.yOffset,d=Math.floor(Math.abs(n.yOffset)/r)-2;let c=n.yOffset<0?-1:1,u=parseFloat(a.getAttribute("y1"))-3*r*c,h=[];for(let t=0;t<d;t++)h.push(u-t*r*c);return{y:l,x:s+(e.time-parseFloat(t.dataset.time))*this.time2x,width:e.duration*this.time2x,r:o-2,ledgerLine_y:h,accidental:n.accidental}}}childViewParamsToData(t,e,i=null){if(ui_api.hasParam(e,["x","y","width"])){let s=e.x;if(i&&i.shiftKey){const e=t.querySelectorAll(".contents .snapline");if(e){let t=1e5;e.forEach((e=>{let i=parseFloat(e.getAttribute("x1"));Math.abs(s-i)<Math.abs(s-t)&&(t=i)})),s=t}}const a=.5*parseFloat(t.dataset.lineSpacing);let r=Math.floor(e.y/a)*a;const o=this.y2midi(r,t),n=document.getElementById(`${t.id}-rect`),l=parseFloat(n.getAttribute("x"));return{midi:o,time:(s-l)*this.x2time+parseFloat(t.dataset.time),duration:e.width*this.x2time}}}playbar(t){if(void 0!==t.id&&void 0!==t.time){let e=document.getElementById(`${t.id}-rect`),i=ui_api.getBBoxAdjusted(e);ui_api.drawsocketInput({key:"svg",val:{id:`${t.id}-playbar`,class:"playbar",parent:t.id,new:"line",x1:i.x+t.time*this.time2x,x2:i.x+t.time*this.time2x,y1:i.top,y2:i.bottom}})}}drag(t,e){}}class l extends s.IO_SymbolBase{constructor(){super(),this.class="FiveLineStave",this.lookup=super.default_container_lookup}getFormattedLookup(t,e){let i={time:[],duration:[],midi:[]};void 0!==e.contents?e.contents.forEach((e=>{const s=io_api.defGet(e.class).getFormattedLookup(t,e);s&&(i.time.push(s.time),i.duration.push(s.duration),i.midi.push(s.midi))})):i={lookup_error:`no contents element with id "${e.contents}" found`};let s={};return s[e.id]=i,s}}t.exports={ui_def:n,io_def:l}},16:(t,e,i)=>{const s=i(20),a={flat:"&#xE260",natural:"&#xE261",sharp:"&#xE262","flat-5^1o":"&#xE2C2","natural-5^1o":"&#xE2C1","sharp-5^1o":"&#xE2C3","flat-5^2o":"&#xE2CB","natural-5^2o":"&#xE2CC","sharp-5^2o":"&#xE2CD","flat-5^3o":"&#xE2CB","natural-5^3o":"&#xE2CC","sharp-5^3o":"&#xE2CD","flat-5^1u":"&#xE2C6","natural-5^1u":"&#xE2C7","sharp-5^1u":"&#xE2C8","flat-5^2u":"&#xE2D0","natural-5^2u":"&#xE2D1","sharp-5^2u":"&#xE2D2","flat-5^3u":"&#xE2DA","natural-5^3u":"&#xE2DB","sharp-5^3u":"&#xE2DC","7^1o":"&#xE2DE","7^2o":"&#xE2E0","7^2u":"&#xE2DF","7^2u":"&#xE2E1","11^1u":"&#xE2E2","11^1o":"&#xE2E3","13^1o":"&#xE2E4","13^1u":"&#xE2E5"};class r extends s.SymbolBase{constructor(){super(),this.class="FiveLineStaveEvent",this.default_dist=10,this.palette=["PathSymbol"]}get structs(){return{data:{class:this.class,id:`${this.class}-0`,time:0,midi:55,duration:.1,accid:"natural"},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,r:2,width:100,ledgerLine_y:0,accidental:!1}}}display(t){ui_api.hasParam(t,Object.keys(this.structs.view));let e=[{id:`${t.id}-notehead`,new:"circle",class:"notehead",cx:t.x,cy:t.y,r:t.r},{new:"line",id:`${t.id}-duration`,class:"duration-line",x1:t.x,y1:t.y,x2:t.x+t.width,y2:t.y}];if(t.accidental)document.getElementById(`${t.id}-accidental`),e.push({new:"text",id:`${t.id}-accidental`,text:a[t.accidental],class:"accidental",x:t.x-15,y:t.y});else{let e=document.getElementById(`${t.id}-accidental`);e&&e.remove()}if(document.getElementById(`${t.id}-ledgerLines`)&&ui_api.drawsocketInput({key:"clear",val:`${t.id}-ledgerLines`}),t.ledgerLine_y.length>0){let i={new:"g",id:`${t.id}-ledgerLines`,children:[]};t.ledgerLine_y.forEach((e=>{i.children.push({new:"line",class:"staffline",x1:t.x-15,x2:t.x+15,y1:e,y2:e})})),e.unshift(i)}return e}getElementViewParams(t){const e=t.querySelector(".notehead"),i=t.querySelector(".duration-line"),s=parseFloat(e.getAttribute("cx")),a=parseFloat(e.getAttribute("cy")),r=parseFloat(i.getAttribute("x2"))-s;return{id:t.id,x:s,y:a,width:r}}childViewParamsToData(t,e,i=null){if(ui_api.hasParam(e,["points"],!0)){const i=t.querySelector(".display .notehead"),s=parseFloat(i.getAttribute("cx")),a=parseFloat(i.getAttribute("cy"));return console.log("childViewParamsToData",Points.offset(e.points,-s,-a)),{points:Points.offset(e.points,-s,-a)}}if(ui_api.hasParam(e,["x","y"],!0)){const i=t.querySelector(".display .notehead"),s=parseFloat(i.getAttribute("cx")),a=parseFloat(i.getAttribute("cy"));return{x:e.x-s,y:e.y-a}}}fromData(t,e,i=!1){const s={...this.structs.data,...t},a=this.dataToViewParams(s,e),r=this.display(a),o=i?ui_api.svgPreviewFromViewAndData(r,s,".notehead"):ui_api.svgFromViewAndData(r,s);if(ui_api.drawsocketInput(o),!i){let e={};e[t.id]=a,ui_api.outlet({viewParams:e})}}childDataToViewParams(t,e){if(ui_api.hasParam(e,"points")){const i=t.querySelector(".display .notehead"),s=parseFloat(i.getAttribute("cx")),a=parseFloat(i.getAttribute("cy"));return{points:Points.offset(e.points,s,a)}}if(ui_api.hasParam(e,["x","y"],!0)){const i=t.querySelector(".display .notehead"),s=parseFloat(i.getAttribute("cx")),a=parseFloat(i.getAttribute("cy"));return{x:e.x+s,y:e.y+a}}}getPaletteIcon(){return{key:"svg",val:this.display({id:`${this.class}-icon`,class:this.class,x:25,y:25,r:2,width:35,ledgerLine_y:[],accidental:!1})}}paletteSelected(t=!1){console.log("FiveLineStaveEvent paletteSelected",t),super.paletteSelected(t)}editMode(t,e=!1){return super.editMode(t,e),e&&ui_api.createHandle(t,{selector:`#${t.id} .duration-line`,x:"x2",y:"y2"},((t,e)=>{let i=ui_api.getContainerForElement(t);ui_api.getDefForElement(i);const s=t.querySelector(".duration-line"),a=parseFloat(s.getAttribute("x1")),r=parseFloat(s.getAttribute("y1"));let o=ui_api.getSVGCoordsFromEvent(e).x-a,n=this.viewParamsToData({x:a,y:r,width:o},i);t.dataset.duration=n.duration,this.updateFromDataset(t)})),!0}}class o extends s.IO_SymbolBase{constructor(){super(),this.class="FiveLineStaveEvent"}getFormattedLookup(t,e){return{time:e.time,duration:e.duration,midi:e.midi}}}t.exports={ui_def:r,io_def:o}},670:(t,e,i)=>{const s=i(20);class a extends s.SymbolBase{constructor(){super(),this.class="Measure",this.palette=["AzimNote","BasicSymbol","ColorPitch","BetaEnv"]}get structs(){return{data:{class:this.class,id:`${this.class}-0`,time:0,duration:1,barlineType:"barline"},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,height:20,width:20,barlineType:"barline"},children:{data:{time:0,duration:1},view:{x:0,width:100}}}}drag(t,e){}display(t){return console.log(t),ui_api.hasParam(t,Object.keys(this.structs.view)),[{new:"rect",id:`${t.id}-meterbox`,class:"meterbox",x:t.x,width:t.width,y:t.y,height:t.height},{new:"line",id:`${t.id}-barline`,class:t.barlineType,x1:t.x,x2:t.x,y1:t.y,y2:t.y+t.height}]}getElementViewParams(t){const e=t.getElementById(`${params.id}-meterbox`),i=t.getElementById(`${params.id}-barline`);return{id:t.id,barlineType:i.dataset.barlineType,x:parseFloat(e.getAttribute("x")),y:parseFloat(e.getAttribute("y")),height:parseFloat(e.getAttribute("height")),width:parseFloat(e.getAttribute("width"))}}getPaletteIcon(){return{key:"svg",val:this.display({...this.structs.view,id:"newMeasure-palette-icon",class:this.class})}}}class r extends s.IO_SymbolBase{constructor(){super(),this.class="Measure",this.lookup=super.default_container_lookup}getFormattedLookup(t,e){let i={time:[],duration:[],pitch:[]};void 0!==e.contents?e.contents.forEach((e=>{const s=io_api.defGet(e.class).getFormattedLookup(t,e);s&&(i.time.push(s.time),i.duration.push(s.duration),i.pitch.push(s.pitch))})):i={lookup_error:`no contents element with id "${e.contents}" found`};let s={};return s[e.id]=i,s}}t.exports={ui_def:a,io_def:r}},890:t=>{t.exports={ui_def:class{constructor(){this.class="NodescoreAPI"}exampleUICallAPI(t){document.querySelectorAll(".symbol.FiveLineStaveEvent").forEach((e=>{ui_api.sendToServer({key:"data",val:{id:e.id,midi:Number(e.dataset.midi)+t.interval}})}))}},io_def:class{constructor(){this.class="NodescoreAPI"}exampleCallAPI(t){io_api.getModel().forEach((e=>{if("FiveLineStaveEvent"==e.class){let i={...e,midi:e.midi+t.interval};io_api.addToModel(i),io_api.sendDataToUI(i)}}))}}}},472:(t,e,i)=>{const s=i(20);class a extends s.SymbolBase{constructor(){super(),this.class="PartStave",this.palette=["AzimNote","BasicSymbol","ColorPitch","BetaEnv"],this.left_margin=20,this.x2time=.001,this.time2x=1e3,this.y2pitch=127,this.pitch2y=1/127}get structs(){return{data:{class:this.class,id:`${this.class}-0`,time:0,duration:1,height:100},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,height:20,width:20},children:{data:{time:0,pitch:60,duration:1},view:{x:0,y:0,width:100}}}}drag(t,e){}display(t){return ui_api.hasParam(t,Object.keys(this.structs.view)),[{new:"rect",class:"partStave-rect",id:`${t.id}-rect`,x:t.x,y:t.y,width:t.width,height:t.height},{new:"text",class:"staveLabel",id:`${t.id}-label`,x:t.x-this.left_margin,y:t.y+t.height/2,text:t.id}]}getElementViewParams(t){const e=t.querySelector(".notehead"),i=parseFloat(e.getAttribute("cx")),s=parseFloat(e.getAttribute("cy")),a=parseFloat(e.getAttribute("r"));return{id:t.id,x:i,y:s,r:a}}getPaletteIcon(){return{key:"svg",val:this.display({...this.structs.view,id:"newPartStave-palette-icon",class:this.class})}}childDataToViewParams(t,e){let i={};const s=t.querySelector(".partStave-rect");if(ui_api.hasParam(e,"pitch",!0)){const t=parseFloat(s.getAttribute("y")),a=parseFloat(s.getAttribute("height"));i.y=t+(1-e.pitch*this.pitch2y)*a}if(ui_api.hasParam(e,"time",!0)){const a=parseFloat(s.getAttribute("x"));i.x=a+(e.time-parseFloat(t.dataset.time))*this.time2x}return ui_api.hasParam(e,"duration")&&(i.width=e.duration*this.time2x),"Measure"!=e.class&&"SnapPoint"!=e.class||(i.y=parseFloat(s.getAttribute("y")),i.height=parseFloat(s.getAttribute("height"))),i}childViewParamsToData(t,e,i=null){if(ui_api.hasParam(e,["x","y"])){let s=e.x;if(i&&i.shiftKey){const e=t.querySelectorAll(".contents .snapline");if(e){let t=1e5;e.forEach((e=>{let i=parseFloat(e.getAttribute("x1"));Math.abs(s-i)<Math.abs(s-t)&&(t=i)})),s=t}}const a=document.getElementById(`${t.id}-rect`),r=parseFloat(a.getAttribute("x")),o=parseFloat(a.getAttribute("y")),n=parseFloat(a.getAttribute("height"));let l={pitch:(1-(e.y-o)/n)*this.y2pitch,time:(s-r)*this.x2time+parseFloat(t.dataset.time)};return ui_api.hasParam(e,"width")&&(l.duration=e.width*this.x2time),l}}playbar(t){if(void 0!==t.id&&void 0!==t.time){let e=document.getElementById(`${t.id}-rect`),i=ui_api.getBBoxAdjusted(e);ui_api.drawsocketInput({key:"svg",val:{id:`${t.id}-playbar`,parent:t.id,new:"line",x1:i.x+t.time*this.time2x,x2:i.x+t.time*this.time2x,y1:i.top,y2:i.bottom,class:"playbar"}})}}fooFN(t){console.log("hi I have your ",t)}}class r extends s.IO_SymbolBase{constructor(){super(),this.class="PartStave",this.lookup=super.default_container_lookup}getFormattedLookup(t,e){let i={};void 0!==e.contents?e.contents.forEach((e=>{const s=io_api.defGet(e.class);void 0===i[e.class]&&(i[e.class]={});const a=s.getFormattedLookup(t,e);a&&Object.keys(a).forEach((t=>{void 0===i[e.class][t]&&(i[e.class][t]=[]),i[e.class][t].push(a[t])}))})):i={lookup_error:`no contents element with id "${e.contents}" found`};let s={};return s[e.id]=i,s}}t.exports={ui_def:a,io_def:r}},169:(t,e,i)=>{const s=i(20);class a extends s.SymbolBase{constructor(){super(),this.class="RootSymbol"}get structs(){return{data:{class:this.class,id:`${this.class}-0`,about:"",name:"",tools:[],palette:[]},view:{class:this.class,id:`${this.class}-0`}}}display(t){return{new:"g",id:`${t.id}`,class:"RootSymbol"}}drag(t,e){}dataToViewParams(t,e){return{...this.structs.view,id:t.id}}fromData(t,e,i=!1){const s=this.dataToViewParams(t,e),a=this.display(s),r=i?ui_api.svgPreviewFromViewAndData(a,t):ui_api.svgFromViewAndData(a,t);ui_api.drawsocketInput(r)}getElementViewParams(t){}getPaletteIcon(){}getInfoDisplay(t){ui_api.drawsocketInput(ui_api.makeDefaultInfoDisplay(t))}getElementViewParams(t){}childDataToViewParams(t,e){return e}childViewParamsToData(t,e,i){return e}}class r extends s.IO_SymbolBase{constructor(){super(),this.class="RootSymbol"}comparator(t,e){}lookup(t,e){}}t.exports={ui_def:a,io_def:r}},20:t=>{"use strict";t.exports={SymbolBase:class{constructor(){this.class="template",this.palette=[],this.m_mode="",this.mouseListening=!1}get structs(){return{data:{class:this.class,id:`${this.class}-0`,time:0},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,text:"undefined"}}}display(t){return console.error(`${this.class} display is undefined`),ui_api.hasParam(t,Object.keys(this.structs.view)),{new:"text",id:`${t.id}-undefined`,class:"template",x:t.x,y:t.y,text:"undefined symbol"}}getElementViewParams(t){console.error(`${this.class} getElementViewParams is undefined`);const e=t.querySelector("text");return{id:t.id,x:parseFloat(e.getAttribute("x")),y:parseFloat(e.getAttribute("y")),text:e.innerHTML}}getPaletteIcon(){return console.error(`${this.class} getPaletteIcon is undefined`),{key:"svg",val:this.display({id:"template-palette-icon",class:this.class,x:10,y:10,text:"template"})}}fromData(t,e,i=!1){const s={...this.structs.data,...t},a=this.dataToViewParams(s,e),r=this.display(a),o=i?ui_api.svgPreviewFromViewAndData(r,s):ui_api.svgFromViewAndData(r,s);if(ui_api.drawsocketInput(o),!i){let e={};e[t.id]=a,ui_api.outlet({viewParams:e})}}dataToViewParams(t,e){const i=ui_api.getDefForElement(e);return{...this.structs.view,...ui_api.filterByKeys(t,Object.keys(this.structs.view)),...i.childDataToViewParams(e,t),id:t.id,container:t.container}}viewParamsToData(t,e,i=null){const s=ui_api.getDefForElement(e);return{...this.structs.data,...ui_api.filterByKeys(t,Object.keys(this.structs.data)),...s.childViewParamsToData(e,t,i),class:this.class,container:e.id}}childViewParamsToData(t,e,i=null){const s=ui_api.getContainerForElement(t);return ui_api.getDefForElement(s).childViewParamsToData(s,e,i)}childDataToViewParams(t,e){const i=ui_api.getContainerForElement(t);return ui_api.getDefForElement(i).childDataToViewParams(i,e)}updateAfterContents(t){}getContainerForData(t){return document.getElementById(t.container)}getInfoDisplay(t){ui_api.drawsocketInput(ui_api.makeDefaultInfoDisplay(t))}updateFromDataset(t){const e=ui_api.getContainerForElement(t);let i=ui_api.getElementData(t,e);this.fromData(i,e),ui_api.sendToServer({key:"data",val:i});let s=t.querySelector(".contents").children;for(let t=0;t<s.length;t++)ui_api.getDefForElement(s[t]).updateFromDataset(s[t])}mouseToData(t,e){const i=ui_api.getSVGCoordsFromEvent(t),s=ui_api.getDefForElement(e);return s||console.error(`could not find def for container ${e}`),{...this.structs.data,...s.childViewParamsToData(e,{...this.structs.view,...i},t),id:`${this.class}_u_${ui_api.fairlyUniqueString()}`,container:e.id}}creatNewFromMouseEvent(t){ui_api.drawsocketInput({key:"remove",val:`${this.class}-sprite`});const e=ui_api.getCurrentContext();let i=this.mouseToData(t,e);return this.fromData(i,e),ui_api.sendToServer({key:"data",val:i}),i}mousemove(t){if(t.metaKey&&"palette"==this.m_mode){const e=ui_api.getCurrentContext();let i=this.mouseToData(t,e);this.fromData(i,e,!0)}}drag(t,e={delta_pos:{x:0,y:0}}){if("edit"==this.m_mode);else{ui_api.translate(t,e.delta_pos);let i=this.getElementViewParams(t);i.x+=e.delta_pos.x,i.y+=e.delta_pos.y;let s=ui_api.getContainerForElement(t),a=this.viewParamsToData(i,s,e);ui_api.drawsocketInput(ui_api.getDataTextView(a))}return!0}applyTransformToData(t){ui_api.applyTransform(t);let e=this.getElementViewParams(t),i=ui_api.getContainerForElement(t),s=this.viewParamsToData(e,i);return ui_api.drawsocketInput({key:"svg",val:ui_api.dataToHTML(s)}),ui_api.sendToServer({key:"data",val:s}),!0}selected(t,e){console.log("select state",e)}mouseListeners(t=!1){t&&!this.mouseListening?(window.addEventListener("mousedown",this,!1),window.addEventListener("mousemove",this,!1),window.addEventListener("mouseup",this,!1),window.addEventListener("keydown",this,!1),window.addEventListener("keyup",this,!1),this.mouseListening=!0):(ui_api.removeSprites(),window.removeEventListener("mousedown",this,!1),window.removeEventListener("mousemove",this,!1),window.removeEventListener("mouseup",this,!1),window.removeEventListener("keydown",this,!1),window.removeEventListener("keyup",this,!1),this.mouseListening=!1)}paletteSelected(t=!1){t?(this.m_mode="palette",this.mouseListeners(t)):(this.m_mode="exited palette",this.mouseListeners(t))}handleEvent(t){switch(t.type){case"keyup":"Meta"==t.key&&(ui_api.removeSprites(),console.log("na?"));break;case"mousedown":t.metaKey&&this.creatNewFromMouseEvent(t);break;case"mousemove":this.mousemove(t)}}editMode(t,e=!1){return e?(this.m_mode="edit",this.mouseListeners(e)):(this.m_mode="exited edit",this.mouseListeners(e)),!0}currentContext(t,e=!1){console.log(this.class," is context ",e),this.m_mode=e?"context":"exited context"}},IO_SymbolBase:class{constructor(){this.class="template"}comparator(t,e){return t.time<e.time?-1:t.time==e.time?0:1}lookup(t,e){const i=e.time,s=i+e.duration;if(i<=t.time&&s>=t.time){t.phase=(t.time-i)/e.duration;let s=[{...e,phase:t.phase}];return void 0!==e.contents&&e.contents.forEach((e=>{const i=io_api.defGet(e.class).lookup(t,e);i&&s.push(i)})),s}return null}default_container_lookup(t,e){let i=[];void 0!==e.contents?e.contents.forEach((e=>{const s=io_api.defGet(e.class).lookup(t,e);s&&i.push(s)})):i={lookup_error:`no contents element with id "${e.contents}" found`};let s={};return s[e.id]=i,s}getFormattedLookup(t,e){return console.error("getFormattedLookup not defined for class",this.class,"using default"),e}default_container_getFormattedLookup(t,e){let i={};void 0!==e.contents?e.contents.forEach((e=>{const s=io_api.defGet(e.class);void 0===i[e.class]&&(i[e.class]={});const a=s.getFormattedLookup(t,e);a&&Object.keys(a).forEach((t=>{void 0===i[e.class][t]&&(i[e.class][t]=[]),i[e.class][t].push(a[t])}))})):i={lookup_error:`no contents element with id "${e.contents}" found`};let s={};return s[e.id]=i,s}}}},102:(t,e,i)=>{const s=i(20);class a extends s.SymbolBase{constructor(){super(),this.class="SystemContainer",this.palette=["TextSymbol"],this.margin=20,this.half_margin=this.margin/2,this.x2time=.001,this.time2x=1e3}get structs(){return{data:{class:this.class,id:`${this.class}-0`,time:0,duration:1,height:100,x:100,y:100,x_offset:2*this.margin},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,height:20,width:20},children:{data:{time:0,height:100,duration:1},view:{x:0,y:0,height:100}}}}drag(t,e){}display(t){return ui_api.hasParam(t,Object.keys(this.structs.view)),[{new:"rect",id:`${t.id}-rect`,class:"systemContainer-rect",x:t.x,y:t.y,height:t.height,width:t.width},{new:"path",id:`${t.id}-bracket`,class:"systemContainer-bracket",d:`M ${t.x+this.margin} ${t.y+this.half_margin} h -${this.half_margin} v ${t.height-this.margin} h ${this.half_margin}`}]}getElementViewParams(t){const e=t.querySelector(".systemContainer-rect");return{id:t.id,x:parseFloat(e.getAttribute("x")),y:parseFloat(e.getAttribute("y")),width:parseFloat(e.getAttribute("width")),height:parseFloat(e.getAttribute("height"))}}dataToViewParams(t,e){let i=ui_api.filterByKeys(t,Object.keys(this.structs.view));const s=this.margin+(void 0!==t.height?parseFloat(t.height):this.structs.data.height),a=2*this.margin+parseFloat(t.duration)*this.time2x;return{...this.structs.view,...i,width:a,height:s,id:t.id}}getPaletteIcon(){return{key:"svg",val:this.display({...this.structs.view,id:"SystemContainer-palette-icon",class:this.class})}}childDataToViewParams(t,e){if(ui_api.hasParam(e,Object.keys(this.structs.children.data))){const i=ui_api.getContainerForElement(t),s=ui_api.getElementData(t),a=this.dataToViewParams(s,i),r=t.querySelector(".contents"),o=r.children.length;let n=0;if(o>0){n=this.margin+ui_api.getBBoxAdjusted(r.children[o-1]).bottom-a.y;const t=document.getElementById(e.id);t&&(n-=ui_api.getBBoxAdjusted(t).height+this.margin)}return{y:a.y+n,x:a.x+this.margin,width:a.width-2*this.margin,height:e.height}}}childViewParamsToData(t,e,i){}updateAfterContents(t){const e=t.querySelector(".contents"),i=ui_api.getBBoxAdjusted(e);let s={id:t.id,duration:t.dataset.duration,x:t.dataset.x,y:parseFloat(t.dataset.y)-20,height:i.height+40,x_offset:t.dataset.x_offset};const a=ui_api.getContainerForElement(t);this.fromData(s,a)}updateFromDataset(t){}playbar(t){if(void 0!==t.id&&void 0!==t.time){let e=document.getElementById(`${t.id}-rect`),i=ui_api.getBBoxAdjusted(e);ui_api.drawsocketInput({key:"svg",val:{id:`${t.id}-playbar`,parent:t.id,new:"line",x1:i.x+t.time*this.time2x,x2:i.x+t.time*this.time2x,y1:i.top,y2:i.bottom,class:"playbar"}})}}}class r extends s.IO_SymbolBase{constructor(){super(),this.class="SystemContainer",this.lookup=super.default_container_lookup,this.getFormattedLookup=super.default_container_getFormattedLookup}}t.exports={ui_def:a,io_def:r}}},e={},i=function i(s){var a=e[s];if(void 0!==a)return a.exports;var r=e[s]={exports:{}};return t[s](r,r.exports,i),r.exports}(489),s=exports;for(var a in i)s[a]=i[a];i.__esModule&&Object.defineProperty(s,"__esModule",{value:!0})})();