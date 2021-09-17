
// need to import css

const ioDefs = new Map();

const initDef = require('./NodeScore_init.json');

// load defs

const Score = require('./lib/NodeScore/Score');
ioDefs.set('Score', new Score.io_def() );

const Part = require('./lib/NodeScore/Part');
ioDefs.set('Part', new Part.io_def() );

const Measure = require('./lib/NodeScore/Measure');
ioDefs.set('Measure', new Measure.io_def() );

const StaffClef = require('./lib/NodeScore/StaffClef');
ioDefs.set('StaffClef', new StaffClef.io_def() );

const Note = require('./lib/NodeScore/Note');
ioDefs.set('Note', new Note.io_def() );

const Rest = require('./lib/NodeScore/Rest');
ioDefs.set('Rest', new Rest.io_def() );

const NodeScoreAPI = require('./lib/NodeScore/NodeScoreAPI');
ioDefs.set('NodeScoreAPI', new NodeScoreAPI.io_def() );


module.exports = {
    ioDefs,
    initDef
}
