
// need to import css

if( typeof window.uiDefs == 'undefined')
    window.uiDefs = new Map();

window.initDef = require('./NodeScore_init.json');

// load defs

const Score = require('./lib/NodeScore/Score');
uiDefs.set('Score', new Score.ui_def() );

const Part = require('./lib/NodeScore/Part');
uiDefs.set('Part', new Part.ui_def() );

const Measure = require('./lib/NodeScore/Measure');
uiDefs.set('Measure', new Measure.ui_def() );

const StaffClef = require('./lib/NodeScore/StaffClef');
uiDefs.set('StaffClef', new StaffClef.ui_def() );

const RhythmGroup = require('./lib/NodeScore/RhythmGroup');
uiDefs.set('RhythmGroup', new RhythmGroup.ui_def() );

const Note = require('./lib/NodeScore/Note');
uiDefs.set('Note', new Note.ui_def() );

const Rest = require('./lib/NodeScore/Rest');
uiDefs.set('Rest', new Rest.ui_def() );

const Graphic = require('./lib/NodeScore/Graphic');
uiDefs.set('Graphic', new Graphic.ui_def() );

const NodeScoreAPI = require('./lib/NodeScore/NodeScoreAPI');
uiDefs.set('NodeScoreAPI', new NodeScoreAPI.ui_def() );


let cssFile = "./defs/css/NodeScore.css";
let head = document.getElementsByTagName("head");
if( !document.querySelector(`link[href="${cssFile}"]`) )
{
    var cssFileRef = document.createElement("link");
    cssFileRef.rel = "stylesheet";
    cssFileRef.type = "text/css";
    cssFileRef.href = cssFile;
    head[0].appendChild(cssFileRef);
}
