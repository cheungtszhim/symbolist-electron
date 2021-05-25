(()=>{var t={254:t=>{"use strict";t.exports=JSON.parse('{"about":"symbolist will read a json file to configure the palette setup, this can be used to dynamically change also (eventually)","id":"Score","tools":[],"palette":["SubdivisionTool","BasicSymbolGL"],"class":"RootSymbol","contents":{"id":"trio","class":"SystemContainer","x":200,"y":100,"duration":20,"time":0,"contents":[{"id":"oboe","class":"FiveLineStave","height":100,"lineSpacing":10,"duration":20,"time":0,"contents":[]},{"id":"bassoon","class":"PartStave","height":100,"time":0,"duration":20,"contents":[]},{"id":"synth","class":"PartStave","height":200,"time":0,"duration":20,"contents":[]}]}}')},934:(t,e,s)=>{const i=s(20);class a extends i.SymbolBase{constructor(){super(),this.class="AzimNote",this.default_dist=10}get structs(){return{data:{class:this.class,id:`${this.class}-0`,time:0,pitch:55,azim:3.14,duration:.1},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,r:2,azim:3.14}}}display(t){return ui_api.hasParam(t,Object.keys(this.structs.view)),[{id:`${t.id}-notehead`,class:"notehead",new:"circle",cx:t.x,cy:t.y,r:t.r},{new:"line",id:`${t.id}-azim`,class:"azimLine",x1:t.x,y1:t.y,x2:t.x+Math.sin(t.azim)*this.default_dist,y2:t.y+Math.cos(t.azim)*this.default_dist}]}getElementViewParams(t){const e=t.querySelector(".notehead"),s=t.querySelector(".azimLine"),i=parseFloat(e.getAttribute("cx")),a=parseFloat(e.getAttribute("cy")),r=parseFloat(e.getAttribute("r")),o=parseFloat(s.getAttribute("x2")),n=parseFloat(s.getAttribute("y2")),l=Math.atan2(o-i,n-a);return{id:t.id,x:i,y:a,r,azim:l}}getPaletteIcon(){return{key:"svg",val:this.display({id:`${this.class}-icon`,class:this.class,x:10,y:10,r:2,azim:.15})}}editMode(t,e=!1){return super.editMode(t,e),e&&ui_api.createHandle(t,{selector:`#${t.id} .azimLine`,x:"x2",y:"y2"},((t,e)=>{const s=t.querySelector(".azimLine"),i=parseFloat(s.getAttribute("x1")),a=parseFloat(s.getAttribute("y1"));let r=ui_api.getSVGCoordsFromEvent(e),o=Math.atan2(r.x-i,r.y-a);t.dataset.azim=o,this.updateFromDataset(t)})),!0}}class r extends i.IO_SymbolBase{constructor(){super(),this.class="AzimNote"}}t.exports={ui_def:a,io_def:r}},270:(t,e,s)=>{const i=s(20);class a extends i.SymbolBase{constructor(){super(),this.class="BasicSymbol"}get structs(){return{data:{class:this.class,id:`${this.class}-0`,time:0,pitch:55,duration:.1},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,r:2}}}display(t){return ui_api.hasParam(t,Object.keys(this.structs.view)),{new:"circle",class:"notehead",id:`${t.id}-notehead`,cx:t.x,cy:t.y,r:t.r}}getElementViewParams(t){const e=t.querySelector(".notehead"),s=parseFloat(e.getAttribute("cx")),i=parseFloat(e.getAttribute("cy")),a=parseFloat(e.getAttribute("r"));return{id:t.id,x:s,y:i,r:a}}getPaletteIcon(){return{key:"svg",val:this.display({id:`${this.class}-palette-icon`,class:this.class,x:10,y:10,r:2})}}getDataTextView(t,e=null){let s={key:"svg",val:[]};return Object.keys(t).forEach((i=>{s.val.push({new:"text",class:"data_text sprite",container:"symbolist_overlay",relativeTo:e||`#${t.id}`,id:`${t.id}-${i}-data_text`,x:0,y:-20,text:i+String(t[i])})})),console.log(s),s}svgPreviewFromViewAndData(t,e,s=null){let i=ui_api.svgFromViewAndData(t,{...e,class:`${e.class} sprite`,id:`${e.class}-sprite`,container:"symbolist_overlay"},!0);return s&&(s=`#${e.class}-sprite ${s}`),[i,this.getDataTextView({...e,id:`${e.class}-sprite`},s)]}fromData(t,e,s=!1){const i={...this.structs.data,...t},a=this.dataToViewParams(i,e),r=this.display(a),o=s?this.svgPreviewFromViewAndData(r,i):ui_api.svgFromViewAndData(r,i);ui_api.drawsocketInput(o)}}class r extends i.IO_SymbolBase{constructor(){super(),this.class="BasicSymbol"}}t.exports={ui_def:a,io_def:r}},755:(t,e,s)=>{const i=s(20);class a extends i.SymbolBase{constructor(){super(),this.class="BetaEnv",this.height=10}get structs(){return{data:{class:this.class,id:`${this.class}-0`,a:2,b:2,duration:.1,time:0,pitch:60},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,a:2,b:2,width:10}}}display(t){ui_api.hasParam(t,Object.keys(this.structs.view));let e=function(t,e){for(var s=function(t,e,s){var i=function(t,e){return Math.exp(n(t)+n(e)-n(t+e))}(t,e);return t>1&&e>1?1/(i*(c((t-1)/(t+e-2),t,e)/i)):t>1&&1==e?1/(i*(c(1,t,e)/i)):1==t&&e>1?1/(i*(c(0,t,e)/i)):t>=1&&e<1?1/(i*(c(1-s,t,e)/i)):t<1&&e>=1?1/(i*(c(s,t,e)/i)):t<1&&e<1?t>e?1/(i*(c(1-s,t,e)/i)):1/(i*(c(s,t,e)/i)):1==t&&1==e?1:(post("unknown situation",t,e,"\n"),0)}(t=t<=u?u:t,e=e<=u?u:e,d),i=[],a=0;a<l;++a){var r=c(a*d,t,e)*s;r<1e-6&&(r=0),r>1&&(r=1),i.push(r)}return i}(t.a,t.b);const s=e.length,i=t.width/s;let a=[{x:t.x,y:t.y+this.height}],r=0;for(;r<s;r++)a.push({x:t.x+r*i,y:t.y+(1-e[r])*this.height});for(;--r>0;)a.push({x:t.x+r*i,y:t.y+this.height+e[r]*this.height});return a.push(a[0]),[{new:"path",class:"beta_env",id:`${t.id}-path`,d:SVGPoints.toPath(a)},{new:"line",x1:t.x,x2:t.x,y1:t.y-2*this.height,y2:t.y+2*this.height,class:"beta_env_start",id:`${t.id}-start`}]}getElementViewParams(t){const e=t.querySelector(".display .beta_env").getAttribute("d"),s=SVGPoints.toPoints({type:"path",d:e});let i=s[0].x,a=s[0].y,r=s[s.length-1].x-i,o=parseFloat(t.dataset.a),n=parseFloat(t.dataset.b);return{id:t.id,x:i,y:a,a:o,b:n,width:r}}getPaletteIcon(){return{key:"svg",val:this.display({...this.structs.view,id:"newPartStave-palette-icon",class:this.class,a:2,b:2,duration:.2})}}}class r extends i.IO_SymbolBase{constructor(){super(),this.class="BetaEnv"}getFormattedLookup(t,e){return{pitch:e.pitch,duration:e.duration,time:e.time,a:e.a,b:e.b}}}t.exports={ui_def:a,io_def:r};var o=[.9999999999999971,57.15623566586292,-59.59796035547549,14.136097974741746,-.4919138160976202,3399464998481189e-20,4652362892704858e-20,-9837447530487956e-20,.0001580887032249125,-.00021026444172410488,.00021743961811521265,-.0001643181065367639,8441822398385275e-20,-26190838401581408e-21,36899182659531625e-22];function n(t){if(t<0)return Number("0/0");for(var e=o[0],s=o.length-1;s>0;--s)e+=o[s]/(t+s);var i=t+4.7421875+.5;return.5*Math.log(2*Math.PI)+(t+.5)*Math.log(i)-i+Math.log(e)-Math.log(t)}var l=100,d=.01;function c(t,e,s){var i=Math.pow(t,e-1)*Math.pow(1-t,s-1);return i==1/0?1:i}var u=1e-6},350:(t,e,s)=>{const i=s(20);class a extends i.SymbolBase{constructor(){super(),this.class="CartesianPlot",this.palette=["DataPoint"],this.margin=20,this.half_margin=this.margin/2}get structs(){return{data:{class:this.class,id:`${this.class}-0`,x_param:"centroid",y_param:"spread",x:100,y:100,width:800,height:600},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,height:20,width:20},children:{data:{centroid:0,spread:0,amplitude:0},view:{x:0,y:0}}}}drag(t,e){}display(t){return ui_api.hasParam(t,Object.keys(this.structs.view)),{new:"rect",id:`${t.id}-rect`,class:"CartesianPlot-rect",x:t.x,y:t.y,height:t.height,width:t.width}}getElementViewParams(t){const e=t.querySelector(".display .CartesianPlot-rect");return{id:t.id,x:parseFloat(e.getAttribute("x")),y:parseFloat(e.getAttribute("y")),width:parseFloat(e.getAttribute("width")),height:parseFloat(e.getAttribute("height"))}}dataToViewParams(t,e){let s=ui_api.filterByKeys(t,Object.keys(this.structs.view));return{...this.structs.view,...s,id:t.id}}getPaletteIcon(){return{key:"svg",val:this.display({...this.structs.view,id:"CartesianPlot-palette-icon",class:this.class})}}childDataToViewParams(t,e){const s=t.dataset.x_param,i=t.dataset.y_param;if(ui_api.hasParam(e,[s,i])){const a=ui_api.getBBoxAdjusted(t);return{x:a.x+e[s]*a.width,y:a.y+a.height-e[i]*a.height}}}childViewParamsToData(t,e,s=null){const i=t.dataset.x_param,a=t.dataset.y_param;if(ui_api.hasParam(e,["x","y"])){const s=ui_api.getBBoxAdjusted(t);let r={};return r[i]=(e.x-s.x)/s.width,r[a]=1-(e.y-s.y)/s.height,r}}updateAfterContents(t){}updateFromDataset(t){}}class r extends i.IO_SymbolBase{constructor(){super(),this.class="CartesianPlot"}}t.exports={ui_def:a,io_def:r}},564:(t,e,s)=>{const i=s(20);class a extends i.SymbolBase{constructor(){super(),this.class="ColorPitch"}get structs(){return{data:{class:this.class,id:`${this.class}-0`,time:0,pitch:55,duration:.1},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,r:4,color:"rgba(255,0,255,1)"}}}display(t){return ui_api.hasParam(t,Object.keys(this.structs.view)),console.log("test",t),{new:"circle",class:"notehead",id:`${t.id}-notehead`,cx:t.x,cy:t.y,r:t.r,style:{fill:t.color}}}getElementViewParams(t){const e=t.querySelector(".notehead"),s=parseFloat(e.getAttribute("cx")),i=parseFloat(e.getAttribute("cy")),a=parseFloat(e.getAttribute("r")),r=e.style.fill;return{id:t.id,x:s,y:i,r:a,color:r}}getPaletteIcon(){return{key:"svg",val:this.display({id:`${this.class}-palette-icon`,class:this.class,x:10,y:10,r:2,color:"rbga(255, 0, 255, 1)"})}}dataToViewParams(t,e){const s=ui_api.getDefForElement(e);let i=`rgba( ${t.pitch/127*255}, 0, 255, 1)`;return{...this.structs.view,...ui_api.filterByKeys(t,Object.keys(this.structs.view)),...s.childDataToViewParams(e,t),color:i,id:t.id,container:t.container}}drag(t,e){if("edit"==this.m_mode);else{ui_api.translate(t,e.delta_pos);let s=this.getElementViewParams(t);s.x+=e.delta_pos.x,s.y+=e.delta_pos.y;let i=ui_api.getContainerForElement(t),a=this.viewParamsToData(s,i),r=this.dataToViewParams(a,i),o={key:"svg",val:{id:`${a.id}-notehead`,style:{fill:r.color}}};console.log("updating color",o),ui_api.drawsocketInput([o,ui_api.getDataTextView(a)])}return!0}}class r extends i.IO_SymbolBase{constructor(){super(),this.class="ColorPitch"}}t.exports={ui_def:a,io_def:r}},558:(t,e,s)=>{const i=s(20);class a extends i.SymbolBase{constructor(){super(),this.class="DataPoint"}get structs(){return{data:{class:this.class,id:`${this.class}-0`,centroid:0,spread:0,amplitude:0},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,r:2}}}display(t){return ui_api.hasParam(t,Object.keys(this.structs.view)),{new:"circle",class:"notehead",id:`${t.id}-notehead`,cx:t.x,cy:t.y,r:t.r}}getElementViewParams(t){const e=t.querySelector(".notehead"),s=parseFloat(e.getAttribute("cx")),i=parseFloat(e.getAttribute("cy")),a=parseFloat(e.getAttribute("r"));return{id:t.id,x:s,y:i,r:a}}getPaletteIcon(){return{key:"svg",val:this.display({id:`${this.class}-palette-icon`,class:this.class,x:10,y:10,r:2})}}}class r extends i.IO_SymbolBase{constructor(){super(),this.class="DataPoint"}}t.exports={ui_def:a,io_def:r}},783:(t,e,s)=>{const i=s(20),a=[0,1,1,2,2,3,4,4,5,5,6,6],r=[0,1,2,2,3,3,4,5,5,6,6,7],o=[0,0,1,0,1,0,0,1,0,1,0,1];class n extends i.SymbolBase{constructor(){super(),this.class="FiveLineStave",this.palette=["FiveLineStaveEvent"],this.left_margin=20,this.x2time=.001,this.time2x=1e3,this.midiMiddleLine=71}get structs(){return{data:{class:this.class,id:`${this.class}-0`,time:0,duration:1,height:100,lineSpacing:10},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,height:100,width:100,lineSpacing:10},children:{data:{time:0,midi:60,duration:1},view:{x:0,y:0,width:100}}}}display(t){ui_api.hasParam(t,Object.keys(this.structs.view));let e=t.y+t.height/2;return[{new:"rect",id:`${t.id}-rect`,class:"staveBox",x:t.x,y:t.y,width:t.width,height:t.height},{new:"text",id:`${t.id}-label`,class:"staveLabel",x:t.x-this.left_margin,y:e,text:t.id},{new:"image",id:`${t.id}-clef`,href:"defs/assets/g_clef.svg",x:t.x,y:t.y},{new:"g",id:`${t.id}-staffline-group`,children:[{new:"line",id:`${t.id}-line-1`,class:"staffline",x1:t.x,y1:e-2*t.lineSpacing,x2:t.x+t.width,y2:e-2*t.lineSpacing},{new:"line",id:`${t.id}-line-2`,class:"staffline",x1:t.x,y1:e-t.lineSpacing,x2:t.x+t.width,y2:e-t.lineSpacing},{new:"line",id:`${t.id}-line-3`,class:"staffline",x1:t.x,y1:e,x2:t.x+t.width,y2:e},{new:"line",id:`${t.id}-line-4`,class:"staffline",x1:t.x,y1:e+t.lineSpacing,x2:t.x+t.width,y2:e+t.lineSpacing},{new:"line",id:`${t.id}-line-5`,class:"staffline",x1:t.x,y1:e+2*t.lineSpacing,x2:t.x+t.width,y2:e+2*t.lineSpacing}]}]}getElementViewParams(t){const e=t.querySelector(".staveBox");return{id:t.id,x:parseFloat(e.getAttribute("x")),y:parseFloat(e.getAttribute("y")),width:parseFloat(e.getAttribute("width")),height:parseFloat(e.getAttribute("height")),lineSpacing:parseFloat(t.dataset.lineSpacing)}}getPaletteIcon(){return{key:"svg",val:this.display({...this.structs.view,id:"fiveLine-palette-icon",class:this.class})}}midi2y(t,e,s="sharp"){const i=t-this.midiMiddleLine;let n=Math.floor(i)%12;return n<0&&(n+=12),Number(i<0),{yOffset:Math.floor(i/12)*(7*e)+("sharp"==s?a:r)[n]*e,accidental:o[n]?s:null}}y2midi(t,e,s="sharp"){const i=document.getElementById(`${e.id}-line-3`),a=.25*e.dataset.lineSpacing,r=parseFloat(i.getAttribute("y1"))-t,o=Math.floor(r/a);return this.midiMiddleLine+o}childDataToViewParams(t,e){if("Measure"==e.class||"SnapPoint"==e.class){let s={};if("Measure"==e.class){const i=document.getElementById(`${t.id}-line-1`),a=document.getElementById(`${t.id}-line-5`);s.y=parseFloat(i.getAttribute("y1"));let r=parseFloat(a.getAttribute("y1"));s.height=r-s.y,s.x=parseFloat(i.getAttribute("x1"))+(e.time-parseFloat(t.dataset.time))*this.time2x,s.width=e.duration*this.time2x}else{const i=document.getElementById(`${t.id}-rect`);s.y=parseFloat(i.getAttribute("y")),s.x=parseFloat(i.getAttribute("x"))+(e.time-parseFloat(t.dataset.time))*this.time2x}return s}if(ui_api.hasParam(e,["time","duration","midi"])){const s=document.getElementById(`${t.id}-rect`),i=parseFloat(s.getAttribute("x")),a=document.getElementById(`${t.id}-line-3`),r=parseFloat(t.dataset.lineSpacing),o=.5*r,n=this.midi2y(Math.round(e.midi),o,"sharp"),l=parseFloat(a.getAttribute("y1"))-n.yOffset,d=Math.floor(Math.abs(n.yOffset)/r)-2;let c=n.yOffset<0?-1:1,u=parseFloat(a.getAttribute("y1"))-3*r*c,h=[];for(let t=0;t<d;t++)h.push(u-t*r*c);return{y:l,x:i+(e.time-parseFloat(t.dataset.time))*this.time2x,width:e.duration*this.time2x,r:o-2,ledgerLine_y:h,accidental:n.accidental}}}childViewParamsToData(t,e,s=null){if(ui_api.hasParam(e,["x","y","width"])){let i=e.x;if(s&&s.shiftKey){const e=t.querySelectorAll(".contents .snapline");if(e){let t=1e5;e.forEach((e=>{let s=parseFloat(e.getAttribute("x1"));Math.abs(i-s)<Math.abs(i-t)&&(t=s)})),i=t}}const a=.5*parseFloat(t.dataset.lineSpacing);let r=Math.floor(e.y/a)*a;const o=this.y2midi(r,t),n=document.getElementById(`${t.id}-rect`),l=parseFloat(n.getAttribute("x"));return{midi:o,time:(i-l)*this.x2time+parseFloat(t.dataset.time),duration:e.width*this.x2time}}}playbar(t){if(void 0!==t.id&&void 0!==t.time){let e=document.getElementById(`${t.id}-rect`),s=ui_api.getBBoxAdjusted(e);ui_api.drawsocketInput({key:"svg",val:{id:`${t.id}-playbar`,class:"playbar",parent:t.id,new:"line",x1:s.x+t.time*this.time2x,x2:s.x+t.time*this.time2x,y1:s.top,y2:s.bottom}})}}drag(t,e){}}class l extends i.IO_SymbolBase{constructor(){super(),this.class="FiveLineStave",this.lookup=super.default_container_lookup}getFormattedLookup(t,e){let s={time:[],duration:[],midi:[]};void 0!==e.contents?e.contents.forEach((e=>{const i=io_api.defGet(e.class).getFormattedLookup(t,e);i&&(s.time.push(i.time),s.duration.push(i.duration),s.midi.push(i.midi))})):s={lookup_error:`no contents element with id "${e.contents}" found`};let i={};return i[e.id]=s,i}}t.exports={ui_def:n,io_def:l}},670:(t,e,s)=>{const i=s(20);class a extends i.SymbolBase{constructor(){super(),this.class="Measure",this.palette=["AzimNote","BasicSymbol","ColorPitch","BetaEnv"]}get structs(){return{data:{class:this.class,id:`${this.class}-0`,time:0,duration:1,barlineType:"barline"},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,height:20,width:20,barlineType:"barline"},children:{data:{time:0,duration:1},view:{x:0,width:100}}}}drag(t,e){}display(t){return console.log(t),ui_api.hasParam(t,Object.keys(this.structs.view)),[{new:"rect",id:`${t.id}-meterbox`,class:"meterbox",x:t.x,width:t.width,y:t.y,height:t.height},{new:"line",id:`${t.id}-barline`,class:t.barlineType,x1:t.x,x2:t.x,y1:t.y,y2:t.y+t.height}]}getElementViewParams(t){const e=t.getElementById(`${params.id}-meterbox`),s=t.getElementById(`${params.id}-barline`);return{id:t.id,barlineType:s.dataset.barlineType,x:parseFloat(e.getAttribute("x")),y:parseFloat(e.getAttribute("y")),height:parseFloat(e.getAttribute("height")),width:parseFloat(e.getAttribute("width"))}}getPaletteIcon(){return{key:"svg",val:this.display({...this.structs.view,id:"newMeasure-palette-icon",class:this.class})}}}class r extends i.IO_SymbolBase{constructor(){super(),this.class="Measure",this.lookup=super.default_container_lookup}getFormattedLookup(t,e){let s={time:[],duration:[],pitch:[]};void 0!==e.contents?e.contents.forEach((e=>{const i=io_api.defGet(e.class).getFormattedLookup(t,e);i&&(s.time.push(i.time),s.duration.push(i.duration),s.pitch.push(i.pitch))})):s={lookup_error:`no contents element with id "${e.contents}" found`};let i={};return i[e.id]=s,i}}t.exports={ui_def:a,io_def:r}},472:(t,e,s)=>{const i=s(20);class a extends i.SymbolBase{constructor(){super(),this.class="PartStave",this.palette=["AzimNote","BasicSymbol","ColorPitch","BetaEnv"],this.left_margin=20,this.x2time=.001,this.time2x=1e3,this.y2pitch=127,this.pitch2y=1/127}get structs(){return{data:{class:this.class,id:`${this.class}-0`,time:0,duration:1,height:100},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,height:20,width:20},children:{data:{time:0,pitch:60,duration:1},view:{x:0,y:0,width:100}}}}drag(t,e){}display(t){return ui_api.hasParam(t,Object.keys(this.structs.view)),[{new:"rect",class:"partStave-rect",id:`${t.id}-rect`,x:t.x,y:t.y,width:t.width,height:t.height},{new:"text",class:"staveLabel",id:`${t.id}-label`,x:t.x-this.left_margin,y:t.y+t.height/2,text:t.id}]}getElementViewParams(t){const e=t.querySelector(".notehead"),s=parseFloat(e.getAttribute("cx")),i=parseFloat(e.getAttribute("cy")),a=parseFloat(e.getAttribute("r"));return{id:t.id,x:s,y:i,r:a}}getPaletteIcon(){return{key:"svg",val:this.display({...this.structs.view,id:"newPartStave-palette-icon",class:this.class})}}childDataToViewParams(t,e){let s={};const i=t.querySelector(".partStave-rect");if(ui_api.hasParam(e,"pitch",!0)){const t=parseFloat(i.getAttribute("y")),a=parseFloat(i.getAttribute("height"));s.y=t+(1-e.pitch*this.pitch2y)*a}if(ui_api.hasParam(e,"time",!0)){const a=parseFloat(i.getAttribute("x"));s.x=a+(e.time-parseFloat(t.dataset.time))*this.time2x}return ui_api.hasParam(e,"duration")&&(s.width=e.duration*this.time2x),"Measure"!=e.class&&"SnapPoint"!=e.class||(s.y=parseFloat(i.getAttribute("y")),s.height=parseFloat(i.getAttribute("height"))),s}childViewParamsToData(t,e,s=null){if(ui_api.hasParam(e,["x","y"])){let i=e.x;if(s&&s.shiftKey){const e=t.querySelectorAll(".contents .snapline");if(e){let t=1e5;e.forEach((e=>{let s=parseFloat(e.getAttribute("x1"));Math.abs(i-s)<Math.abs(i-t)&&(t=s)})),i=t}}const a=document.getElementById(`${t.id}-rect`),r=parseFloat(a.getAttribute("x")),o=parseFloat(a.getAttribute("y")),n=parseFloat(a.getAttribute("height"));let l={pitch:(1-(e.y-o)/n)*this.y2pitch,time:(i-r)*this.x2time+parseFloat(t.dataset.time)};return ui_api.hasParam(e,"width")&&(l.duration=e.width*this.x2time),l}}playbar(t){if(void 0!==t.id&&void 0!==t.time){let e=document.getElementById(`${t.id}-rect`),s=ui_api.getBBoxAdjusted(e);ui_api.drawsocketInput({key:"svg",val:{id:`${t.id}-playbar`,parent:t.id,new:"line",x1:s.x+t.time*this.time2x,x2:s.x+t.time*this.time2x,y1:s.top,y2:s.bottom,class:"playbar"}})}}fooFN(t){console.log("hi I have your ",t)}}class r extends i.IO_SymbolBase{constructor(){super(),this.class="PartStave",this.lookup=super.default_container_lookup}getFormattedLookup(t,e){let s={};void 0!==e.contents?e.contents.forEach((e=>{const i=io_api.defGet(e.class);void 0===s[e.class]&&(s[e.class]={});const a=i.getFormattedLookup(t,e);a&&Object.keys(a).forEach((t=>{void 0===s[e.class][t]&&(s[e.class][t]=[]),s[e.class][t].push(a[t])}))})):s={lookup_error:`no contents element with id "${e.contents}" found`};let i={};return i[e.id]=s,i}}t.exports={ui_def:a,io_def:r}},169:(t,e,s)=>{const i=s(20);class a extends i.SymbolBase{constructor(){super(),this.class="RootSymbol"}get structs(){return{data:{class:this.class,id:`${this.class}-0`,about:"",name:"",tools:[],palette:[]},view:{class:this.class,id:`${this.class}-0`}}}display(t){return{new:"g",id:`${t.id}`,class:"RootSymbol"}}drag(t,e){}dataToViewParams(t,e){return{...this.structs.view,id:t.id}}fromData(t,e,s=!1){const i=this.dataToViewParams(t,e),a=this.display(i),r=s?ui_api.svgPreviewFromViewAndData(a,t):ui_api.svgFromViewAndData(a,t);ui_api.drawsocketInput(r)}getElementViewParams(t){}getPaletteIcon(){}getInfoDisplay(t){ui_api.drawsocketInput(ui_api.makeDefaultInfoDisplay(t))}getElementViewParams(t){}childDataToViewParams(t,e){return e}childViewParamsToData(t,e,s){return e}}class r extends i.IO_SymbolBase{constructor(){super(),this.class="RootSymbol"}comparator(t,e){}lookup(t,e){}}t.exports={ui_def:a,io_def:r}},260:(t,e,s)=>{const i=s(20);class a extends i.SymbolBase{constructor(){super(),this.class="SnapPoint",this.palette=[],this.height=5}get structs(){return{data:{class:this.class,id:`${this.class}-0`,time:0},view:{class:this.class,id:`${this.class}-0`,x:0,y:0}}}drag(t,e){}display(t){return console.log(t),ui_api.hasParam(t,Object.keys(this.structs.view)),{new:"line",id:`${t.id}-snapline`,class:"snapline",x1:t.x,x2:t.x,y1:t.y,y2:t.y+this.height}}getPaletteIcon(){return{key:"svg",val:this.display({...this.structs.view,id:"newSnapPoint-palette-icon",class:this.class})}}}t.exports={ui_def:a,io_def:null}},55:(t,e,s)=>{const i=s(20);class a extends i.SymbolBase{constructor(){super(),this.class="SubdivisionTool",this.dividerTypes=["Measure","SnapPoint"]}get structs(){return{data:{class:this.class,id:`${this.class}-1`,target:"select element",element_time:"select element",element_duration:"select element",division_tree:"1x100",marker_type:"Measure"},view:{}}}display(t){ui_api.hasParam(t,Object.keys(this.structs.view));let e=[];return t.x.forEach((s=>{e.push({new:"line",id:`${this.class}-marker`,class:t.marker_type,x1:s,x2:s,y1:t.y-height/2,y2:t.y+height/2})})),e}fromData(t,e,s=!1){}getPaletteIcon(){return{key:"svg",val:{new:"image",href:"defs/assets/subdivideIcon.svg",width:"100%",height:"100%"}}}drag(t,e){ui_api.translate(t,e.delta_pos)}createSubdivisions(t){console.log("createSubdivisions",t);let e,s=document.getElementById(t.target),i=t.division_tree;if(-1!=i.indexOf("x")){let t=i.split("x"),s=parseFloat(t[1]),a=parseFloat(t[0]);e=[];for(let t=0;t<s;t++)e.push(a)}else e=JSON.parse(`[${t.division_tree}]`);let a=parseFloat(t.element_duration),r=parseFloat(t.element_time),o=a/e.length,n=ui_api.getDef(t.marker_type);for(let t=0;t<e.length;t++)n.fromData({id:`${n.class}_u_${ui_api.fairlyUniqueString()}`,container:s.id,time:r+o*t,duration:o},s)}makePanel(t){ui_api.drawsocketInput({key:"html",val:{...ui_api.dataToHTML(t),parent:"forms",new:"div",id:`${this.class}-toolitem`,class:"toolitem",children:[...Object.keys(t).map((e=>{if("id"!=e&&"class"!=e&&"parent"!=e)return"target"==e||"element_duration"==e||"element_time"==e?[{new:"span",class:"infoparam",text:e},{new:"span",id:`${this.class}-${e}`,class:"infovalue-noedit",text:t[e]}]:"marker_type"==e?[{new:"span",class:"infoparam",text:e},{new:"select",name:"marker_type",class:"infovalue",id:`${this.class}-${e}`,children:this.dividerTypes.map((t=>({new:"option",value:t,text:t}))),onchange:s=>{document.getElementById(`${t.class}-toolitem`).dataset[e]=s.target.value}}]:[{new:"label",class:"infoparam",for:e,text:e},{new:"input",class:"infovalue",type:"text",id:`${this.class}-${e}`,value:t[e],oninput:s=>{document.getElementById(`${t.class}-toolitem`).dataset[e]=s.target.value},onblur:"symbolist.startDefaultEventHandlers()",onfocus:"symbolist.stopDefaultEventHandlers()"}]})).flat(),{new:"button",class:"panelbutton",text:"apply",onclick:()=>{let e=document.getElementById(`${t.class}-toolitem`);this.createSubdivisions(e.dataset)}}]}})}paletteSelected(t=!1){t?(this.m_mode="palette",this.mouseListeners(!0),this.makePanel(this.structs.data)):(this.m_mode="exited palette",this.mouseListeners(!1),ui_api.drawsocketInput({key:"remove",val:`${this.class}-toolitem`}))}updateFromDataset(t){document.getElementById(`${this.class}-target`).innerHTML=t.dataset.target,document.getElementById(`${this.class}-element_duration`).innerHTML=t.dataset.element_duration,document.getElementById(`${this.class}-element_time`).innerHTML=t.dataset.element_time}handleEvent(t){switch(t.type){case"mousedown":{let e=ui_api.getSymbolFromElement(t.target);if(e&&void 0!==e.dataset.duration){let t=document.getElementById(`${this.class}-toolitem`);t.dataset.target=e.id,t.dataset.element_duration=e.dataset.duration,t.dataset.element_time=e.dataset.time,this.updateFromDataset(t)}}}}}t.exports={ui_def:a,io_def:null}},20:t=>{"use strict";t.exports={SymbolBase:class{constructor(){this.class="template",this.palette=[],this.m_mode="",this.mouseListening=!1}get structs(){return{data:{class:this.class,id:`${this.class}-0`,time:0},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,text:"undefined"}}}display(t){return console.error(`${this.class} display is undefined`),ui_api.hasParam(t,Object.keys(this.structs.view)),{new:"text",id:`${t.id}-undefined`,class:"template",x:t.x,y:t.y,text:"undefined symbol"}}getElementViewParams(t){console.error(`${this.class} getElementViewParams is undefined`);const e=t.querySelector("text");return{id:t.id,x:parseFloat(e.getAttribute("x")),y:parseFloat(e.getAttribute("y")),text:e.innerHTML}}getPaletteIcon(){return console.error(`${this.class} getPaletteIcon is undefined`),{key:"svg",val:this.display({id:"template-palette-icon",class:this.class,x:10,y:10,text:"template"})}}fromData(t,e,s=!1){const i={...this.structs.data,...t},a=this.dataToViewParams(i,e),r=this.display(a),o=s?ui_api.svgPreviewFromViewAndData(r,i):ui_api.svgFromViewAndData(r,i);ui_api.drawsocketInput(o)}dataToViewParams(t,e){const s=ui_api.getDefForElement(e);return{...this.structs.view,...ui_api.filterByKeys(t,Object.keys(this.structs.view)),...s.childDataToViewParams(e,t),id:t.id,container:t.container}}viewParamsToData(t,e,s=null){const i=ui_api.getDefForElement(e);return{...this.structs.data,...ui_api.filterByKeys(t,Object.keys(this.structs.data)),...i.childViewParamsToData(e,t,s),class:this.class,container:e.id}}childViewParamsToData(t,e,s=null){const i=ui_api.getContainerForElement(t);return ui_api.getDefForElement(i).childViewParamsToData(i,e,s)}childDataToViewParams(t,e){const s=ui_api.getContainerForElement(t);return ui_api.getDefForElement(s).childDataToViewParams(s,e)}updateAfterContents(t){}getContainerForData(t){return document.getElementById(t.container)}getInfoDisplay(t){ui_api.drawsocketInput(ui_api.makeDefaultInfoDisplay(t))}updateFromDataset(t){const e=ui_api.getContainerForElement(t);let s=ui_api.getElementData(t,e);this.fromData(s,e),ui_api.sendToServer({key:"data",val:s});let i=t.querySelector(".contents").children;for(let t=0;t<i.length;t++)ui_api.getDefForElement(i[t]).updateFromDataset(i[t])}mouseToData(t,e){const s=ui_api.getSVGCoordsFromEvent(t),i=ui_api.getDefForElement(e);return i||console.error(`could not find def for container ${e}`),{...this.structs.data,...i.childViewParamsToData(e,{...this.structs.view,...s},t),id:`${this.class}_u_${ui_api.fairlyUniqueString()}`,container:e.id}}creatNewFromMouseEvent(t){ui_api.drawsocketInput({key:"remove",val:`${this.class}-sprite`});const e=ui_api.getCurrentContext();let s=this.mouseToData(t,e);return this.fromData(s,e),ui_api.sendToServer({key:"data",val:s}),s}mousemove(t){if(t.metaKey&&"palette"==this.m_mode){const e=ui_api.getCurrentContext();let s=this.mouseToData(t,e);this.fromData(s,e,!0)}}drag(t,e={delta_pos:{x:0,y:0}}){if("edit"==this.m_mode);else{ui_api.translate(t,e.delta_pos);let s=this.getElementViewParams(t);s.x+=e.delta_pos.x,s.y+=e.delta_pos.y;let i=ui_api.getContainerForElement(t),a=this.viewParamsToData(s,i,e);ui_api.drawsocketInput(ui_api.getDataTextView(a))}return!0}applyTransformToData(t){ui_api.applyTransform(t);let e=this.getElementViewParams(t),s=ui_api.getContainerForElement(t),i=this.viewParamsToData(e,s);return ui_api.drawsocketInput({key:"svg",val:ui_api.dataToHTML(i)}),ui_api.sendToServer({key:"data",val:i}),!0}selected(t,e){console.log("select state",e)}mouseListeners(t=!1){t&&!this.mouseListening?(window.addEventListener("mousedown",this),window.addEventListener("mousemove",this),window.addEventListener("mouseup",this),window.addEventListener("keydown",this),window.addEventListener("keyup",this),this.mouseListening=!0):(ui_api.removeSprites(),window.removeEventListener("mousedown",this),window.removeEventListener("mousemove",this),window.removeEventListener("mouseup",this),window.removeEventListener("keydown",this),window.removeEventListener("keyup",this),this.mouseListening=!1)}paletteSelected(t=!1){t?(this.m_mode="palette",this.mouseListeners(t)):(this.m_mode="exited palette",this.mouseListeners(t))}handleEvent(t){switch(t.type){case"keyup":"Meta"==t.key&&(ui_api.removeSprites(),console.log("na?"));break;case"mousedown":t.metaKey&&this.creatNewFromMouseEvent(t);break;case"mousemove":this.mousemove(t)}}editMode(t,e=!1){return e?(this.m_mode="edit",this.mouseListeners(e)):(this.m_mode="exited edit",this.mouseListeners(e)),!0}currentContext(t,e=!1){console.log(this.class," is context ",e),this.m_mode=e?"context":"exited context"}},IO_SymbolBase:class{constructor(){this.class="template"}comparator(t,e){return t.time<e.time?-1:t.time==e.time?0:1}lookup(t,e){const s=e.time,i=s+e.duration;if(s<=t.time&&i>=t.time){t.phase=(t.time-s)/e.duration;let i=[{...e,phase:t.phase}];return void 0!==e.contents&&e.contents.forEach((e=>{const s=io_api.defGet(e.class).lookup(t,e);s&&i.push(s)})),i}return null}default_container_lookup(t,e){let s=[];void 0!==e.contents?e.contents.forEach((e=>{const i=io_api.defGet(e.class).lookup(t,e);i&&s.push(i)})):s={lookup_error:`no contents element with id "${e.contents}" found`};let i={};return i[e.id]=s,i}getFormattedLookup(t,e){return console.error("getFormattedLookup not defined for class",this.class,"using default"),e}default_container_getFormattedLookup(t,e){let s={};void 0!==e.contents?e.contents.forEach((e=>{const i=io_api.defGet(e.class);void 0===s[e.class]&&(s[e.class]={});const a=i.getFormattedLookup(t,e);a&&Object.keys(a).forEach((t=>{void 0===s[e.class][t]&&(s[e.class][t]=[]),s[e.class][t].push(a[t])}))})):s={lookup_error:`no contents element with id "${e.contents}" found`};let i={};return i[e.id]=s,i}}}},102:(t,e,s)=>{const i=s(20);class a extends i.SymbolBase{constructor(){super(),this.class="SystemContainer",this.palette=["TextSymbol"],this.margin=20,this.half_margin=this.margin/2,this.x2time=.001,this.time2x=1e3}get structs(){return{data:{class:this.class,id:`${this.class}-0`,time:0,duration:1,height:100,x:100,y:100,x_offset:2*this.margin},view:{class:this.class,id:`${this.class}-0`,x:0,y:0,height:20,width:20},children:{data:{time:0,height:100,duration:1},view:{x:0,y:0,height:100}}}}drag(t,e){}display(t){return ui_api.hasParam(t,Object.keys(this.structs.view)),[{new:"rect",id:`${t.id}-rect`,class:"systemContainer-rect",x:t.x,y:t.y,height:t.height,width:t.width},{new:"path",id:`${t.id}-bracket`,class:"systemContainer-bracket",d:`M ${t.x+this.margin} ${t.y+this.half_margin} h -${this.half_margin} v ${t.height-this.margin} h ${this.half_margin}`}]}getElementViewParams(t){const e=t.querySelector(".systemContainer-rect");return{id:t.id,x:parseFloat(e.getAttribute("x")),y:parseFloat(e.getAttribute("y")),width:parseFloat(e.getAttribute("width")),height:parseFloat(e.getAttribute("height"))}}dataToViewParams(t,e){let s=ui_api.filterByKeys(t,Object.keys(this.structs.view));const i=this.margin+(void 0!==t.height?parseFloat(t.height):this.structs.data.height),a=2*this.margin+parseFloat(t.duration)*this.time2x;return{...this.structs.view,...s,width:a,height:i,id:t.id}}getPaletteIcon(){return{key:"svg",val:this.display({...this.structs.view,id:"SystemContainer-palette-icon",class:this.class})}}childDataToViewParams(t,e){if(ui_api.hasParam(e,Object.keys(this.structs.children.data))){const s=ui_api.getContainerForElement(t),i=ui_api.getElementData(t),a=this.dataToViewParams(i,s),r=t.querySelector(".contents"),o=r.children.length;let n=0;if(o>0){n=this.margin+ui_api.getBBoxAdjusted(r.children[o-1]).bottom-a.y;const t=document.getElementById(e.id);t&&(n-=ui_api.getBBoxAdjusted(t).height+this.margin)}return{y:a.y+n,x:a.x+this.margin,width:a.width-2*this.margin,height:e.height}}}childViewParamsToData(t,e,s){}updateAfterContents(t){const e=t.querySelector(".contents"),s=ui_api.getBBoxAdjusted(e);let i={id:t.id,duration:t.dataset.duration,x:t.dataset.x,y:parseFloat(t.dataset.y)-20,height:s.height+40,x_offset:t.dataset.x_offset};const a=ui_api.getContainerForElement(t);this.fromData(i,a)}updateFromDataset(t){}playbar(t){if(void 0!==t.id&&void 0!==t.time){let e=document.getElementById(`${t.id}-rect`),s=ui_api.getBBoxAdjusted(e);ui_api.drawsocketInput({key:"svg",val:{id:`${t.id}-playbar`,parent:t.id,new:"line",x1:s.x+t.time*this.time2x,x2:s.x+t.time*this.time2x,y1:s.top,y2:s.bottom,class:"playbar"}})}}}class r extends i.IO_SymbolBase{constructor(){super(),this.class="SystemContainer",this.lookup=super.default_container_lookup,this.getFormattedLookup=super.default_container_getFormattedLookup}}t.exports={ui_def:a,io_def:r}}},e={};function s(i){var a=e[i];if(void 0!==a)return a.exports;var r=e[i]={exports:{}};return t[i](r,r.exports,s),r.exports}(()=>{void 0===window.uiDefs&&(window.uiDefs=new Map),window.initDef=s(254);const t=s(934),e=s(270),i=s(755),a=s(350),r=s(564),o=s(783),n=s(670),l=s(472),d=s(169),c=s(260),u=s(55),h=s(558),m=s(102);uiDefs.set("AzimNote",new t.ui_def),uiDefs.set("BasicSymbol",new e.ui_def),uiDefs.set("BetaEnv",new i.ui_def),uiDefs.set("CartesianPlot",new a.ui_def),uiDefs.set("ColorPitch",new r.ui_def),uiDefs.set("FiveLineStave",new o.ui_def),uiDefs.set("Measure",new n.ui_def),uiDefs.set("PartStave",new l.ui_def),uiDefs.set("RootSymbol",new d.ui_def),uiDefs.set("SnapPoint",new c.ui_def),uiDefs.set("SubdivisionTool",new u.ui_def),uiDefs.set("DataPoint",new h.ui_def),uiDefs.set("SystemContainer",new m.ui_def);let p="./defs/css/stylie.css",y=document.getElementsByTagName("head");if(!document.querySelector(`link[href="${p}"]`)){var g=document.createElement("link");g.rel="stylesheet",g.type="text/css",g.href=p,y[0].appendChild(g)}})()})();