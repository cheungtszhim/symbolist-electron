/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 489:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


// need to import css

const ioDefs = new Map();

const initDef = __webpack_require__(749);

// load defs

const Score = __webpack_require__(699);
ioDefs.set('Score', new Score.io_def() );

const Part = __webpack_require__(263);
ioDefs.set('Part', new Part.io_def() );

const Measure = __webpack_require__(589);
ioDefs.set('Measure', new Measure.io_def() );

const StaffClef = __webpack_require__(521);
ioDefs.set('StaffClef', new StaffClef.io_def() );

const Note = __webpack_require__(519);
ioDefs.set('Note', new Note.io_def() );

const Rest = __webpack_require__(742);
ioDefs.set('Rest', new Rest.io_def() );

const NodeScoreAPI = __webpack_require__(833);
ioDefs.set('NodeScoreAPI', new NodeScoreAPI.io_def() );


module.exports = {
    ioDefs,
    initDef
}


/***/ }),

/***/ 749:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"class":"Score","id":"Score","x":100,"y":40,"width":1000,"height":500,"indent":100,"title":"Example Score","subtitle":"","composer":"","copyright":"","contents":[{"class":"Part","id":"Part_0","part_name":"Example Part","contents":[{"class":"Measure","id":"Measure_0_0","index":0,"contents":[{"class":"StaffClef","id":"StaffClef_0_0","clef":"G","clef_anchor":-1,"key_signature":"A","contents":[]}]},{"class":"Measure","id":"Measure_0_1","index":1,"time_signature":[3,2],"contents":[{"class":"StaffClef","id":"StaffClef_0_1","clef":"C","clef_anchor":0,"key_signature":"Cb","contents":[]}]}]},{"class":"Part","id":"Part_1","part_name":"Example Part","contents":[{"class":"Measure","id":"Measure_1_0","index":0,"time_signature":[6,8],"contents":[{"class":"StaffClef","id":"StaffClef_1_0","clef":"G","clef_anchor":-1,"key_signature":"C#","contents":[]}]},{"class":"Measure","id":"Measure_1_1","index":1,"time_signature":[6,8],"contents":[{"class":"StaffClef","id":"StaffClef_1_1","clef":"C","clef_anchor":1,"key_signature":"A#m","contents":[]}]}]}]}');

/***/ }),

/***/ 589:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Template = __webpack_require__(20);
const lib = __webpack_require__(1);

class Measure extends Template.SymbolBase 
{
    constructor() {
        super();
        this.class = 'Measure';
        this.palette = ['StaffClef'];
        this.fontSize = 24;
        this.minBarlineHeight = this.fontSize / 2;
    }


    get structs () {
        return {

            data: {
                class: this.class,
                id : `${this.class}-0`,
                index : 0,
                time_signature : [4, 4],
                time_signature_visible : 'auto',
                barline_type: 'single',
                repeat_start: false,
                repeat_end: false,
                measure_number_offset: 1,
                measure_number_visible : 'auto'
            },
            
            view: {
                class: this.class,
                id: `${this.class}-0`,
                x: 0, // left
                y: 0, // middle
                clef_offset: 0, // space for clef + keysig in child
                width: 200,
                barline_height: 10,
                barline_type: 'single',
                time_signature : [4, 4],
                time_signature_visible : 'auto',
                repeat_start: false,
                repeat_end: false,
                measure_number_offset: 1,
                measure_number_visible : 'auto'
            },
            
            children: {
                data: {},
                view: {
                    x: 0,
                    y: 0
                }
            }
        }
    }
    
    selected(element, state) {
        ui_api.sendToServer({ 
            key:"call", 
            val: {
                class: "NodeScoreAPI", 
                method: "updateSelected",
                id: element.id,
                state: state
            }
        });
    }

    currentContext( element, enable = false ) 
    {
        console.log(this.class, " is context ", enable);
        if( enable )
        {
            this.m_mode = 'context';
        }
        else
        {
            this.m_mode = "exited context";
        }
        ui_api.sendToServer({ 
            key:"call", 
            val: {
                class: "NodeScoreAPI", 
                method: "updateContext",
                id: element.id,
                enable
            }
        });
    }

    drag(element, pos){}

    display(params) {

        ui_api.hasParam(params, Object.keys(this.structs.view) );
        let currentX = params.x;
        //console.log('currentX', currentX);
        let outputArray = [];


        outputArray.push({
            new: 'rect',
            class: 'Measure-ref',
            id: `${params.id}-ref`,
            x: params.x,
            y: params.y,
            width: params.width,
            height: params.barline_height
        })

        currentX += params.clef_offset;
        let timeSigVisible = params.time_signature_visible;
        if (timeSigVisible == 'auto') {
            console.error('Error: time_signature_visible is still auto in Measure display()');
            timeSigVisible = true;
        }
        if (timeSigVisible) {
            //if (typeof(params.time_signature) == 'string') params.time_signature = JSON.parse(params.time_signature);
            outputArray.push({
                new: 'g',
                id: `${params.id}-timeSig-group`,
                class: 'Measure-timeSig-group',
                child: [{
                    new: 'text',
                    id: `${params.id}-timeSig-top`,
                    class: 'Measure-timeSig-top Global-musicFont',
                    child: lib.smufl.timeSignature[params.time_signature[0]],
                    x: currentX,
                    y: params.y-this.fontSize/4
                },
                {
                    new: 'text',
                    id: `${params.id}-timeSig-bottom`,
                    class: 'Measure-timeSig-bottom Global-musicFont',
                    child: lib.smufl.timeSignature[params.time_signature[1]],
                    x: currentX,
                    y: params.y+this.fontSize/4
                }]
            });
        }
        
        switch(params.barline_type) {
            // Add codes for other barline types
            case 'hide' : 
                outputArray.push({
                    new: 'line',
                    class: 'Measure-barLine',
                    id: `${params.id}-barLine`,
                    x1: params.x + params.width,
                    x2: params.x + params.width,
                    y1: params.y - params.barline_height / 2,
                    y2: params.y + params.barline_height / 2,
                    style: {
                        'stroke-opacity': 0
                    }
                });
            break;
            default:
                outputArray.push({
                    new: 'line',
                    class: 'Measure-barLine',
                    id: `${params.id}-barLine`,
                    x1: params.x + params.width,
                    x2: params.x + params.width,
                    y1: params.y - params.barline_height / 2,
                    y2: params.y + params.barline_height / 2
                });
            break;
        }
        return outputArray;

        /**
         * note that we are returning the drawsocket def that will be
         * displayed in the 'view' group
         * the top level element of the symbol has the root id
         * so here we need to make sure that the id is different
         */

    }
    
    getElementViewParams(element) {

        const ref = element.querySelector(`.Measure-ref`);
        //window.max.outlet("post", 'ref', ref);
        const x = parseFloat(ref.getAttribute('x'));
        const y = parseFloat(ref.getAttribute('y'));
        const width = parseFloat(ref.getAttribute('width'));
        const barline_height = parseFloat(ref.getAttribute('height'));

        return {
            id: element.id,
            x,
            y,
            width,
            barline_height,
            barline_type: element.dataset.barline_type,
            time_signature: JSON.parse(element.dataset.time_signature),
            time_signature_visible: element.dataset.time_signature_visible,
            repeat_start: element.dataset.repeat_start,
            repeat_end: element.dataset.repeat_end,
            measure_number_visible: element.dataset.measure_number_visible
        }

    }


    getPaletteIcon() {
        return {
            key: 'svg',
            val: [{
                new: 'rect',
                id: `${this.class}-paletteIcon-rect`,
                class: `Measure-barLine`,
                x: 0,
                y: 5,
                width: 40,
                height: 30
            }, {
                new: 'text',
                id: `${this.class}-paletteIcon-text`,
                class: 'Measure-number Global-textFont',
                child: 'M',
                x: 20,
                y: 20,
                'text-anchor': 'middle',
                'dominant-baseline': 'middle'
            }]
        }
    }

    getPreviousMeasure(this_element) {
        const container = ui_api.getContainerForElement(this_element);
        const parentDef = ui_api.getDefForElement(container);
        if (parentDef.class == 'Part') {
            const this_data = ui_api.getElementData(this_element, container);
            return parentDef.childGetPreviousMeasure(container, this_data);
        }
    }

    childDataToViewParams(this_element, child_data) {
        if (child_data.class == 'StaffClef') {
            const x = this.getElementViewParams(this_element).x;
            const y = this.getElementViewParams(this_element).y;
            //window.max.outlet("post", child_data.id, 'x, y', x, y);
            const staff_line_width = this.getElementViewParams(this_element).width;
    
            let clef_visible = child_data.clef_visible;
            let key_signature_visible = child_data.key_signature_visible;
            if (this_element.dataset.index != 0) {
                const prevMeasure = this.getPreviousMeasure(this_element);
                const prevStaff = prevMeasure.querySelector('.StaffClef');
                if (clef_visible == 'auto') {
                    clef_visible = !(prevStaff.dataset.clef == child_data.clef && prevStaff.dataset.clef_anchor == child_data.clef_anchor);
                }
                if (key_signature_visible == 'auto') {
                    key_signature_visible = !(prevStaff.dataset.key_signature == child_data.key_signature && prevStaff.dataset.key_map == child_data.key_map);
                }
            }
            else {
                if (clef_visible == 'auto') clef_visible = true;
                if (key_signature_visible == 'auto') key_signature_visible = true;
            }
    
            let key_map = child_data.key_map;
            if (key_map == 'auto') {
                if (child_data.clef == 'perc') key_map = 'perc';
                else key_map = '24EDO';
            }
            const childKeyMap = __webpack_require__(629)("./"+key_map);
            
            // default behaviours for clefs
            let clef = child_data.clef;
            let clef_anchor = child_data.clef_anchor;

            if (clef == 'auto') clef = 'G';
            else if (clef in childKeyMap.clefAlternativeDef) {
                clef_anchor = clefAlternativeDef[clef].clef_anchor;
                clef = clefAlternativeDef[clef].clef;
            }
            
            if (clef_anchor == 'auto') {
                clef_anchor = childKeyMap.clefDef[clef].default_anchor;
            }
    
            return {
                x,
                y,
                staff_line_width,
                key_map,
                clef,
                clef_anchor,
                clef_visible,
                key_signature_visible
            }

        }
    }
    
    childViewParamsToData(this_element, child_viewParams) {}
    
    
    
    updateAfterContents( element ) {
        //console.log('Update measure', element.dataset.index);
        const staffLines = element.querySelector('.StaffClef-staff_line-group');
        const barline_height = Math.max(this.minBarlineHeight, ui_api.getBBoxAdjusted(staffLines).bottom - ui_api.getBBoxAdjusted(staffLines).top);
        
        const clefKeyGroup = element.querySelector('.StaffClef-clef_key-group');
        let clef_offset;
        if (clefKeyGroup.childNodes.length == 0) {
            //console.log('No clef keysig');
            clef_offset = 0;
        }
        else {
            clef_offset = ui_api.getBBoxAdjusted(clefKeyGroup).width;
        }

        let dataObj = {
            id: element.id,
            index: element.dataset.index,
            clef_offset,
            time_signature : JSON.parse(element.dataset.time_signature),
            time_signature_visible : element.dataset.time_signature_visible,
            barline_type: element.dataset.barline_type,
            barline_height,
            repeat_start: element.dataset.repeat_start,
            repeat_end: element.dataset.repeat_end,
            measure_number_visible : element.dataset.measure_number_visible
            
        }
        const container = ui_api.getContainerForElement(element);

        this.fromData(dataObj, container);
    }
    

}

class Measure_IO extends Template.IO_SymbolBase
{
    constructor()
    {
        super();
        this.class = 'Measure';
    }
    
}



module.exports = {
    ui_def: Measure,
    io_def: Measure_IO    
}



/***/ }),

/***/ 833:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const lib = __webpack_require__(1);
class NodeScoreAPI_UI 
{
    constructor()
    {
        this.class = "NodeScoreAPI";
    }
    /*
    changeNoteColor(params)
    {
        let notes = document.querySelectorAll('.symbol.FiveLineStaveEvent');


        notes.forEach( el => {
            ui_api.sendToServer({
                key: "data",
                val: {
                    id: el.id,
                    midi: Number(el.dataset.midi) + params.interval
                }
            })
        });


    }
    */
    /*
    setSelection() {
        const selectedArray = document.querySelectorAll('.symbolist-selected');
        let selectedID = [];
        selectedArray.forEach( el => {
            selectedID.push(el.id);
        });
        ui_api.sendToServer({
            key: 'data',
            val: {
                id: 'selected',
                name: selectedID
            }
        });
    }
    */


    
}

class NodeScoreAPI_IO
{
    constructor()
    {
        this.class = "NodeScoreAPI";
        this.selected = [];
        this.currentContext = [];
        this.copyBuffer = [];
    }
    
    // selection

    updateSelected(params) {
        let id, state;
        if (typeof params.args != 'undefined') {
            const args = Array.isArray(params.args) ? params.args : [params.args];
            if (args.length > 1) {
                id = args[0];
                state = params.state;
            }
        }
        else if (typeof params.id != 'undefined' && typeof params.state != 'undefined') {
            id = params.id;
            state = params.state;
        }
        if (state && !this.selected.includes(id)) this.selected.push(id);
        else if (!state && this.selected.includes(id)) this.selected.splice(this.selected.indexOf(id), 1);
        io_api.outlet({selected: this.selected});
    }

    getSelected() {
        io_api.outlet({selected: this.selected});
    }

    select(params) {
        let id;
        if (typeof params.args != 'undefined') {
            const args = Array.isArray(params.args) ? params.args : [params.args];
            id = args[0];
        }
        else if (typeof params.id != 'undefined') id = params.id;
        this.updateSelected({
            id,
            state: 1
        });
    }

    deselect(params) {
        let id;
        if (typeof params.args != 'undefined') {
            id = (params.args[0] || params.args);
        }
        else if (typeof params.id != 'undefined') id = params.id;
        this.updateSelected({
            id,
            state: 0
        });
    }

    // current context

    updateContext(params) {
        let id, enable;
        if (typeof params.args != 'undefined') {
            const args = Array.isArray(params.args) ? params.args : [params.args];
            if (args.length > 1) {
                id = args[0];
                enable = params.enable;
            }
        }
        else if (typeof params.id != 'undefined' && typeof params.enable != 'undefined') {
            id = params.id;
            enable = params.enable;
        }
        if (enable && !this.currentContext.includes(id)) {
            this.currentContext.push(id);
            io_api.outlet({ currentContext: this.currentContext});
        }
        else if (!enable && this.currentContext.includes(id)) this.currentContext.splice(this.currentContext.indexOf(id), 1);
    }

    getCurrentContext() {
        io_api.outlet({ currentContext: this.currentContext});
    }

    // get element

    getElement(params) {
        let id;
        if (typeof params.id != 'undefined') {
            id = Array.isArray(params.id) ? params.id : [params.id];
        }
        else if (typeof params.args != 'undefined') {
            id = Array.isArray(params.args) ? params.args : [params.args];
        }
        else if (id == '.') {
            id = this.selected;
        }
        const model = io_api.getModel();
        id.forEach(el => {
            if (model.has(el)) {
                io_api.outlet(model.get(el));
            }
            else {
                console.log(`getElement: element ${el} not found`);
            }
        });
    }

    // get / set attributes

    get(params) {
        let id, att;
        const msg = (params.msg || 'get');
        if (typeof params.id != 'undefined') {
            id = params.id;
            if (id == '.' && this.selected.length > 0) id = this.selected[0]; 
        }
        if (typeof params.attribute != 'undefined') att = isArray(params.attribute)? params.attribute : [params.attribute];
        if (typeof params.args != "undefined") {
            const args = Array.isArray(params.args) ? params.args : [params.args];
            if (args.length >= 1) {
                id = args[0];
                if (id == '.' && this.selected.length > 0) id = this.selected[0];
            }
            if (args.length >= 2) {
                att = args.slice(1);
            }
        }
        if (typeof id != 'undefined') {
            const model = io_api.getModel();
            if (model.has(id)) {
                const el = model.get(id);
                let output = {};
                output[msg] = {id}
                if (typeof att == 'undefined') {
                    output[msg] = el;
                }
                else {
                    att.forEach(a => {
                        if (a in el) {
                            output[msg][a] = el[a];
                        }
                        else {
                            console.log(`get: attribute ${a} not found in element ${id}`);
                        }
                    });
                }
                io_api.outlet(output);
            }
            else {
                console.log(`get: element ${id} not found`);
            }
        }
        else {
            console.log('get: id undefined');
        }
    }

    set(params) {
        let id, att, val;
        if (typeof params.args != "undefined") {
            let args = Array.isArray(params.args) ? params.args : [params.args];
            id = [args[0]];
            if (id[0] == '.' && this.selected.length > 0) id = this.selected; 
            args.shift();
            const model = io_api.getModel();
            id.forEach(i => {
                if (model.has(i)) {
                    let el = model.get(i);
                    att = args[0];
                    val = args.slice(1);
                    el[att] = val;
                    io_api.addToModel(el);
                    io_api.sendDataToUI(el);
                    /*
                    io_api.input({
                        key: 'data',
                        val: el
                    });
                    */
                }
                else {
                    console.log(`set: element ${i} not found`);
                }

            })

        }
        /*
        else if (typeof params.args != "undefined") {

        }
        if (typeof params.attribute != 'undefined') att = isArray(params.attribute)? params.attribute : [params.attribute];
        if (typeof params.args != "undefined") {
            const args = Array.isArray(params.args) ? params.args : [params.args];
            if (args.length >= 2) {
                id = args[0];
                att = args.slice(1);
            }
            else {
                console.log('getAttribute: not enough arguments');
            }
        }
        if (typeof id != 'undefined' && typeof att != 'undefined') {
            
            if (model.has(id)) {
                const el = model.get(id);
                let output = {getAttribute: {id: id}};
                att.forEach(a => {
                    if (a in el) {
                        output.getAttribute[a] = el[a];
                    }
                    else {
                        console.log(`getAttribute: attribute ${a} not found in element ${id}`);
                    }
                });
                io_api.outlet(output);
            }
            else {
                console.log(`getAttribute: element ${id} not found`);
            }
        }
        else {
            console.log('getAttribute: id or attribute undefined');
        }
        */
    }
    
    /*
    transpose(params)
    {

        if( typeof params.args != "undefined" )
        {
            let args = Array.isArray(params.args) ? params.args : [ params.args ];

            let interval = Number(args[0]);

            let model = io_api.getModel();

            let updates = [];
            model.forEach( el => {
                if( el.class == "Note" )
                {
                    let data = {
                        ...el,
                        pitch: el.pitch + interval
                    };
                    updates.push(data);
                }
            });
     
            io_api.addToModel(updates);
            io_api.sendDataToUI(updates);
        }

        
    }
    */
    
    // JMSL MaxScore messages

    // get info

    getSelectedNoteInfo() {
        const model = io_api.getModel();
        this.selected.forEach(el => {
            if (model.has(el) && model.get(el).class == 'Note') {
                io_api.outlet({
                    getSelectedNoteInfo: model.get(el)
                });
            }
        });
    }

    /**
     * 
     * @param {Object} params args: index
     */
    getInstrumentName(params) {
        if (typeof params.args != 'undefined') {
            const args = Array.isArray(params.args) ? params.args : [params.args];
            const index = args[0];
            const model = io_api.getModel();
            if (model.has('Score')) {
                const contents = model.get('Score').contents;
                if (contents.length > index) {
                    const id = contents[index].id;
                    this.get({
                        id,
                        attribute: 'part_name',
                        msg: 'getInstrumentName'
                    });
                }
                else {
                    console.log(`getInstrumentName: part number out of range`);
                }
            }
        }
        else {
            console.log('getInstrumentName: please enter part number as argument');
        }
    }

    getTitle() {
        this.get({
            id: 'Score',
            attribute: 'title',
            msg: 'getTitle'
        });
    }

    getSubtitle() {
        this.get({
            id: 'Score',
            attribute: 'subtitle',
            msg: 'getSubtitle'
        });
    }

    getComposer() {
        this.get({
            id: 'Score',
            attribute: 'composer',
            msg: 'getComposer'
        });
    }

    getCopyright() {
        this.get({
            id: 'Score',
            attribute: 'copyright',
            msg: 'getCopyright'
        });
    }

    // set attributes

    setComposer(params) {
        if (typeof params.args != 'undefined') {
            const args = Array.isArray(params.args) ? params.args : [params.args];
            const composer = args[0];
            const model = io_api.getModel();
            if (model.has('Score')) {
                const score = model.get('Score').contents;
                if (contents.length > index) {
                    const id = contents[index].id;
                    this.get({
                        id,
                        attribute: 'part_name',
                        msg: 'getInstrumentName'
                    });
                }
                else {
                    console.log(`getInstrumentName: part number out of range`);
                }
            }
        }
        else {
            console.log('getInstrumentName: please enter part number as argument');
        }
    }

    // select all notes
    selectAll() {
        this.selected = [];
        const model = io_api.getModel();
        model.forEach(el => {
            if (el.class == 'Note') this.selected.push(el.id);
        });
        io_api.outlet({selectAll: this.selected});
    }

    clearSelection() {
        this.selected = [];
        io_api.outlet({clearSelection: []});
    }

    // add data

    addNote(params) {
        const args = Array.isArray(params.args) ? params.args : [params.args];
        let note = {
            class: 'Note'
        };
        if (args.length < 2) {
            console.log('addNote: Not enough arguments');
        }
        else {
            const model = io_api.getModel();
            note.id = 'newNote';
            note.container = 'StaffClef_1_0';
            note.value = Number(args[0]);
            note.pitch = args[1];
            if (args.length > 2) note.amplitude = Number(args[2]);
            if (args.length > 3) note.hold = Number(args[3]);
            console.log(note);
            io_api.addToModel(note);
            io_api.sendDataToUI(note);
        }
    }

    // converters

    importJMSL(params) {
        let path;
        if (typeof params.args != 'undefined') {
            const args = Array.isArray(params.args) ? params.args : [params.args];
            path = args[0];
        }
        else if (typeof params.path != 'undefined') path = params.path;

        const converter = __webpack_require__(94);
        const scoreObj = converter.importJMSL(path);
    }
    
}


module.exports = {
    ui_def: NodeScoreAPI_UI,
    io_def: NodeScoreAPI_IO
}



/***/ }),

/***/ 1:
/***/ ((module) => {

function getComputedTextLength(text, cssClass) 
{
    const topSvg = document.getElementById('top-svg');
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.textContent = text;
    textElement.setAttribute('class', cssClass + ' test');
    topSvg.appendChild(textElement);
    const textLength = textElement.getComputedTextLength();
    topSvg.removeChild(textElement);
    //console.log('textLength', textLength);
    return textLength;
}

const fontSize = 24;

const smufl = {
    noteHead: {
        auto: {
            doubleWhole: '',
            whole: '',
            half: '',
            black: ''
        },
        x: {
            doubleWhole: '',
            whole: '',
            half: '',
            black: ''
        },
        plus: {
            doubleWhole: '',
            whole: '',
            half: '',
            black: ''
        },
        circleX: {
            doubleWhole: '',
            whole: '',
            half: '',
            black: ''
        },
        withX: {
            doubleWhole: '',
            whole: '',
            half: '',
            void: ''
        },
        triangleUp: {
            doubleWhole: '',
            whole: '',
            half: '',
            white: '',
            black: ''
        },
        triangleUDown: {
            doubleWhole: '',
            whole: '',
            half: '',
            white: '',
            black: ''
        },
        slashed: {
            doubleWhole: '',
            whole: '',
            half: '',
            black: ''
        },
        slashed2: {
            doubleWhole: '',
            whole: '',
            half: '',
            black: ''
        },
        diamond: {
            doubleWhole: '',
            whole: '',
            half: '',
            white: '',
            black: ''
        },
        circled: {
            doubleWhole: '',
            whole: '',
            half: '',
            black: ''
        },
        circledLarge: {
            doubleWhole: '',
            whole: '',
            half: '',
            black: ''
        },
        arrowUpLarge: {
            doubleWhole: '',
            whole: '',
            half: '',
            black: ''
        },
        arrowDownLarge: {
            doubleWhole: '',
            whole: '',
            half: '',
            black: ''
        }
    },
    rest: {
        '32': '',
        '16': '',
        '8': '',
        '4': '',
        '2': '',
        '1': '',
        '0.5': '',
        '0.25': '',
        '0.125': '',
        '0.0625': '',
        '0.03125': '',
        '0.015625': '',
        '0.0078125': '',
        '0.00390625': ''
    },
    accidental: {
        '0': '',
        '0.5': '',
        '1': '',
        '1.5': '',
        '2': '',
        '3': '',
        '-0.5': '',
        '-1': '',
        '-1.5': '',
        '-2': '',
        '-3': ''
    },
    clef: {
        G: '&#xE050',
        C: '&#xE05C',
        F: '&#xE062',
        'G-8': '&#xE052',
        'G+8': '&#xE053',
        'G-15': '&#xE051',
        'G+15': '&#xE054',
        'C-8': '&#xE05D',
        'F-8': '&#xE064',
        'F+8': '&#xE065',
        'F-15': '&#xE063',
        'F+15': '&#xE066',
        tab: '&#xE06D'
    },
    dot: '',
    flag: {
        '1': {
            up: '&#xE240',
            down: '&#xE241'
        },
        '2': {
            up: '&#xE242',
            down: '&#xE243'
        },
        '3': {
            up: '&#xE244',
            down: '&#xE245'
        },
        '4': {
            up: '&#xE246',
            down: '&#xE247'
        },
        '5': {
            up: '&#xE248',
            down: '&#xE249'
        },
        '6': {
            up: '&#xE24A',
            down: '&#xE24B'
        },
        '7': {
            up: '&#xE24C',
            down: '&#xE24D'
        },
        '8': {
            up: '&#xE24E',
            down: '&#xE24F'
        },
        internal: {
            up: '&#xE250',
            down: '&#xE251'
        }
    },
    timeSignature: {
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': '',
        '8': '',
        '9': '',
        plus: '+'
    }
}

module.exports = {
    getComputedTextLength,
    smufl,
    fontSize
}

/***/ }),

/***/ 519:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Template = __webpack_require__(20);
const lib = __webpack_require__(1);


class Note extends Template.SymbolBase 
{
    constructor() {
        super();
        this.class = 'Note';
        this.palette = ['Graphic'];
        this.fontSize = 24;
    }


    get structs () {
        return {
 
            data: {
                // clean up needed
                class: this.class,
                id : `${this.class}-0`,
                pitch: 60,
                value: 1,
                amplitude: 1,
                hold: 1,
                note_head_family: 'auto',
                stem_direction: 'auto',
                stem_visible: 'auto',
                accidental_visible: 'auto'
            },
            
            view: {
                // clean up needed
                class: this.class,
                id: `${this.class}-0`, 
                x: 100,
                y: 100,
                accidental_glyph: [],
                accidental_visible: 'auto',
                ledger_line: [],
                note_head_glyph: 'auto',
                stem_visible: 'auto',
                stem_height: 4,
                stem_direction: 'auto',
                beams: 0,
                beam_flag: 'auto',
                dots: 0,
                dots_displace: false
            },
            
            children: {
                data: {},
                view: {}
            }
        }
    }

    drag(element, pos){}

    selected(element, state) {
        ui_api.sendToServer({ 
            key:"call", 
            val: {
                class: "NodeScoreAPI", 
                method: "updateSelected",
                id: element.id,
                state: state
            }
        });
    }

    currentContext( element, enable = false ) 
    {
        console.log(this.class, " is context ", enable);
        if( enable )
        {
            this.m_mode = 'context';
        }
        else
        {
            this.m_mode = "exited context";
        }
        ui_api.sendToServer({ 
            key:"call", 
            val: {
                class: "NodeScoreAPI", 
                method: "updateContext",
                id: element.id,
                enable
            }
        });
    }
    
    display(params) {
        const staffLineSpacing = this.fontSize / 4;

        //console.log('params', params);
        ui_api.hasParam(params, Object.keys(this.structs.view) );
        let returnArray = [];
        let currentX = params.x;
        
        // accidentals
        let accidentalGroup = {
            new: 'g',
            class: 'Note-accidental-group Global-musicFont',
            id: `${params.id}-accidental-group`,
            child: []
        };
        if (params.accidental_visible == true) {
            params.accidental_glyph.forEach((val, i) => {
                accidentalGroup.child.push({
                    new: 'text',
                    class: 'Note-accidental',
                    id: `${params.id}-accidental-${i}`,
                    x: currentX,
                    y: params.y,
                    child: val
                });
                currentX += lib.getComputedTextLength(val, 'Note-accidental Global-musicFont');
            });
        }
        returnArray.push(accidentalGroup);
        
        // note head
        let noteHeadGroup = {
            new: 'g',
            class: 'Note-note_head-group Global-musicFont',
            id: `${params.id}-note_head-group`,
            child: []
        };
        noteHeadGroup.child.push({
            new: 'text',
            class: 'Note-note_head',
            id: `${params.id}-note_head-0`,
            x: currentX,
            y: params.y,
            child: params.note_head_glyph
        });
        const xBeforeNoteHead = currentX;
        console.log('computed text length', lib.getComputedTextLength(params.note_head_glyph, 'Global-musicFont'));
        currentX += lib.getComputedTextLength(params.note_head_glyph, 'Note-note_head Global-musicFont');
        
        returnArray.push(noteHeadGroup);

        // ledger lines -> drawn in parent
        let ledgerLineGroup = {
            new: 'g',
            class: 'Note-ledger_line-group',
            id: `${params.id}-ledger_line-group`,
            child: []
        };
        params.ledger_line.forEach((val, i) => {
            ledgerLineGroup.child.push({
                new: 'line',
                class: 'Note-ledger_line',
                id: `${params.id}-ledger_line-${i}`,
                x1: xBeforeNoteHead - staffLineSpacing * 0.5,
                y1: params.y - val * staffLineSpacing / 2,
                x2: currentX + staffLineSpacing * 0.5,
                y2: params.y - val * staffLineSpacing / 2
            });
        });
        returnArray.push(ledgerLineGroup);
        /*
        // stem -> drawn in parent
        let stemDirectionFactor = -1;
        let stemX = currentX;
        let stemEndY = params.y;
        const stemWidth = 1.5;
        if (params.stem_height != 0 && params.stem_visible != false) {
            if (params.stem_direction == 'down') {
                stemDirectionFactor = 1;
                stemX = xBeforeNoteHead;
            }
            stemEndY = params.y + staffLineSpacing * stemDirectionFactor * params.stem_height;
            returnArray.push({
                new: 'rect',
                class: 'Note-stem',
                id: `${params.id}-stem`,
                x: Math.min(stemX, stemX + stemDirectionFactor * stemWidth),
                y: Math.min(params.y, stemEndY),
                width: stemWidth,
                height: Math.abs(params.y - stemEndY),
                'data-stem_end_y': stemEndY
            });
        }
        else {
            returnArray.push({
                new: 'g',
                class: 'Note-stem',
                id: `${params.id}-stem`
            });
        }
        */

        // flags -> drawn in parent
        let flagGroup = {
            new: 'g',
            class: 'Note-flag-group',
            id: `${params.id}-flag-group`,
            'data-num_beams': params.beams,
            child: []
        };
        returnArray.push(flagGroup);

        // dots
        let dotGroup = {
            new: 'g',
            class: 'Note-dot-group',
            id: `${params.id}-dot-group`,
            'data-num-dots': params.dots,
            child: []
        };
        for (let i = 0; i < params.dots; i++) {
            dotGroup.child.push({
                new: 'text',
                class: 'Note-dot Global-musicFont',
                id: `${params.id}-dot-${i}`,
                x: currentX,
                y: params.y - (params.dots_displace ? staffLineSpacing / 2 : 0),
                child: lib.smufl.dot
            });
            currentX += lib.getComputedTextLength(lib.smufl.dot, 'Note-dot Global-musicFont');
        }
        returnArray.push(dotGroup);
        
        return returnArray;
    }
    
    getElementViewParams(element) {
        const noteHead = element.querySelector(`.Note-note_head`);
        
        const x = parseFloat(noteHead.getAttribute('x'));
        const y = parseFloat(noteHead.getAttribute('y'));
        const note_head = noteHead.innerText;

        return {
            id: element.id,
            x,
            y,
            grace: element.dataset.grace,
            note_head,
            accidental: 0, // to be defined
            accidental_map: '', // to be defined
            stem_height: 1, // to be defined
            stem_direction: 'auto' // to be defined
        }
    }

    getPaletteIcon() {
        return {
            key: 'svg',
            val: {
                new: 'text',
                id: `Note-palette-icon`,
                class: 'Note-note_head Global-musicFont',
                x: 20,
                y: 20,
                child: ''
            }
        }
    }

    childDataToViewParams(this_element, child_data) {
        if (child_data.class == 'Graphic') {
            const x = this.getElementViewParams(this_element).x;
            const y = this.getElementViewParams(this_element).y - 50;
            return {x, y}
        }
    }

    childViewParamsToData(this_element, child_viewParams) {

    }

    // update parent when new note is added
    creatNewFromMouseEvent(event)
    {
        // remove preview sprite
        ui_api.drawsocketInput({
            key: "remove", 
            val: `${this.class}-sprite`
        })

        // generate objectData from Mouse Event
        const container = ui_api.getCurrentContext();
        let data =  this.mouseToData(event, container);
        
        this.fromData(data, container);

        // send new object to server
        ui_api.sendToServer({
            key: "data",
            val: data
        })

        // call parent updateAfterContents function
        const parentDef = ui_api.getDefForElement(container);
        parentDef.updateAfterContents(container);

        return data;
    }

    // update parent when note is changed from inspector
    updateFromDataset(element)
    {
        const container = ui_api.getContainerForElement(element);        
        let data = ui_api.getElementData(element, container);
     
        //console.log(element.id, 'updateFromDataset', data);

        this.fromData(data, container);

        // update data 
        ui_api.sendToServer({
            key: "data",
            val: data
        })

        let contents = element.querySelector('.contents');
        let children = contents.children;
        //console.log(element.id, 'contents', children);

        for( let i = 0; i < children.length; i++)
        {
            const child_def = ui_api.getDefForElement(children[i]);
            child_def.updateFromDataset(children[i]);
        }
        const parentDef = ui_api.getDefForElement(container);
        parentDef.updateAfterContents(container);

    }

}

class Note_IO extends Template.IO_SymbolBase
{
    constructor()
    {
        super();
        this.class = 'Note';
    }
    
}



module.exports = {
    ui_def: Note,
    io_def: Note_IO    
}



/***/ }),

/***/ 263:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Template = __webpack_require__(20);
const lib = __webpack_require__(1);

class Part extends Template.SymbolBase 
{
    constructor() {
        super();
        this.class = 'Part';
        this.palette = ['Measure'];
        this.cornerSize = 5;
    }


    get structs () {
        return {

            data: {
                class: this.class,
                id : `${this.class}-0`,
                part_name : 'Part'
            },
            
            view: {
                class: this.class,
                id: `${this.class}-0`, 
                x: 0, // left
                y: 0, // top
                height: 100,
                part_name: ''
            }
        }
    }

    drag(element, pos){}

    selected(element, state) {
        ui_api.sendToServer({ 
            key:"call", 
            val: {
                class: "NodeScoreAPI", 
                method: "updateSelected",
                id: element.id,
                state: state
            }
        });
    }
    
    currentContext( element, enable = false ) 
    {
        console.log(this.class, " is context ", enable);
        if( enable )
        {
            this.m_mode = 'context';
        }
        else
        {
            this.m_mode = "exited context";
        }
        ui_api.sendToServer({ 
            key:"call", 
            val: {
                class: "NodeScoreAPI", 
                method: "updateContext",
                id: element.id,
                enable
            }
        });
    }

    display(params) {

        ui_api.hasParam(params, Object.keys(this.structs.view) );
        return [
            {
                new: 'text',
                class: 'Part-name Global-textFont',
                id: `${params.id}-name`,
                x: params.x-5,
                y: params.y + params.height / 2,
                text: params.part_name
            },
            {
                new: 'line',
                class: 'Part-corner',
                id: `${params.id}-cornerHorizontalTop`,
                x1: params.x,
                x2: params.x + this.cornerSize,
                y1: params.y,
                y2: params.y
            },
            {
                new: 'line',
                class: 'Part-corner',
                id: `${params.id}-cornerHorizontalBottom`,
                x1: params.x,
                x2: params.x + this.cornerSize,
                y1: params.y + params.height,
                y2: params.y + params.height
            },
            {
                new: 'line',
                class: 'Part-corner',
                id: `${params.id}-cornerVertical`,
                x1: params.x,
                x2: params.x,
                y1: params.y,
                y2: params.y + params.height
            }
        ]

        /**
         * note that we are returning the drawsocket def that will be
         * displayed in the 'view' group
         * the top level element of the symbol has the root id
         * so here we need to make sure that the id is different
         */

    }

    fromData(dataObj, container, preview = false)
    {
        //console.log('container', container, dataObj);
        // merging with defaults in case the user forgot to include something
        const data_union = {
            ...this.structs.data,
            ...dataObj
        };
        const viewParams = this.dataToViewParams(data_union, container);
        const viewObj = this.display(viewParams);  
        const drawObj = (preview ? 
            ui_api.svgPreviewFromViewAndData(viewObj, data_union) : 
            ui_api.svgFromViewAndData(viewObj, data_union) );
        ui_api.drawsocketInput( drawObj );
        
        /*
        //automatically create a new measure
        const thisElement = document.getElementById(dataObj.id);
        const measureInit = {
            class: 'Measure',
            id : `${dataObj.id}-defaultMeasure`,
            timeSignature : [4, 4],
            barLineType: 'single',
            repeatStart: false,
            repeatEnd: false
        };
        const measureDef = ui_api.getDef('Measure');
        measureDef.fromData(measureInit, thisElement);
        ui_api.sendToServer({
            key: "data",
            val: measureInit
        });
        */
    }
    
    getElementViewParams(element) {

        const vLine = element.querySelector(`#${element.id}-cornerVertical`);
        const nameText = element.querySelector('.Part-name');
        const x = parseFloat(vLine.getAttribute('x1'));
        const y = parseFloat(vLine.getAttribute('y1'));
        const height = parseFloat(vLine.getAttribute('y2')) - y;
        const part_name = nameText.innerHTML;
        //console.log('NameText', nameText);
        //console.log('innerhtml', part_name);

        return {
            id: element.id,
            x,
            y,
            height,
            part_name
        }

    }


    getPaletteIcon() {
        return {
            key: 'svg',
            val: this.display({
                id: `${this.class}-palette-icon`,
                class: this.class,
                x: 30,
                y: 0,
                height : 40,
                part_name: 'p'
            })
        }
    }

    /**
     * 
     * @param {Element} this_element instance of this element
     * @param {Object} child_data child data object, requesting information about where to put itself
     */
    childDataToViewParams(this_element, child_data) {
        const viewParams = this.getElementViewParams(this_element);
        const index = parseInt(child_data.index);
        let x, time_signature_visible;
        //console.log('Measure', index);
        //console.trace();
        if (index == 0) { // first measure
            x = viewParams.x;
            if (child_data.time_signature_visible == 'auto') {
                time_signature_visible = true;
            }
            else time_signature_visible = child_data.time_signature_visible;
        }
        else {
            // Might have a better method?
            const prevMeasure = this.childGetPreviousMeasure(this_element, child_data);
            const prevBBox = ui_api.getBBoxAdjusted(prevMeasure);
            x = prevBBox.right;
            //console.log('x offset',x - viewParams.x);
            if (child_data.time_signature_visible == 'auto') {
                const prevTimeSig = prevMeasure.dataset.time_signature;
                time_signature_visible = (prevTimeSig != JSON.stringify(child_data.time_signature));
            }
            else {
                time_signature_visible = child_data.time_signature_visible;
            }
        }
        return {
            x,
            y: viewParams.y + viewParams.height / 2,
            time_signature_visible
        }
    }

    childGetPreviousMeasure(this_element, child_data) {
        //console.log('Measure', child_data.index);
        const allMeasures = this_element.querySelectorAll(`.symbol.Measure`);
        //console.log('allMeasures', allMeasures);
        let prevMeasure;
        allMeasures.forEach(child => {
            if (parseInt(child.dataset.index) == parseInt(child_data.index - 1)) prevMeasure = child;
        });
        //console.log('prevMeasure ==',prevMeasure);
        return prevMeasure;
    }
    
    childViewParamsToData(this_element, child_viewParams) {
        
    }
    

}

class Part_IO extends Template.IO_SymbolBase
{
    constructor()
    {
        super();
        this.class = 'Part';
    }
    
}



module.exports = {
    ui_def: Part,
    io_def: Part_IO    
}



/***/ }),

/***/ 742:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Template = __webpack_require__(20);
const lib = __webpack_require__(1);


class Rest extends Template.SymbolBase 
{
    constructor() {
        super();
        this.class = 'Rest';
        this.palette = ['Graphic'];
    }


    get structs () {
        return {
 
            data: {
                class: this.class,
                id : `${this.class}-0`,
                value: 1
            },
            
            view: {
                class: this.class,
                id: `${this.class}-0`, 
                x: 100,
                y: 100,
                glyph: 'auto',
                dots: 0,
                dots_displace: true // default
            },
            
            children: {
                data: {},
                view: {}
            }
        }
    }

    drag(element, pos){}

    selected(element, state) {
        ui_api.sendToServer({ 
            key:"call", 
            val: {
                class: "NodeScoreAPI", 
                method: "updateSelected",
                id: element.id,
                state: state
            }
        });
    }

    currentContext( element, enable = false ) 
    {
        console.log(this.class, " is context ", enable);
        if( enable )
        {
            this.m_mode = 'context';
        }
        else
        {
            this.m_mode = "exited context";
        }
        ui_api.sendToServer({ 
            key:"call", 
            val: {
                class: "NodeScoreAPI", 
                method: "updateContext",
                id: element.id,
                enable
            }
        });
    }
    
    display(params) {
        const staffLineSpacing = lib.fontSize / 4;

        //console.log('params', params);
        ui_api.hasParam(params, Object.keys(this.structs.view) );
        let returnArray = [];
        let currentX = params.x;
        
        // rest glyph
        returnArray.push({
            new: 'text',
            class: 'Rest-glyph Global-musicFont',
            id: `${params.id}-glyph`,
            x: currentX,
            y: params.y,
            child: params.glyph
        });
        currentX += lib.getComputedTextLength(params.glyph, 'Rest-glyph Global-musicFont');
        
        // dots
        let dotGroup = {
            new: 'g',
            class: 'Rest-dot-group',
            id: `${params.id}-dot-group`,
            'data-num-dots': params.dots,
            child: []
        };
        for (let i = 0; i < params.dots; i++) {
            dotGroup.child.push({
                new: 'text',
                class: 'Rest-dot Global-musicFont',
                id: `${params.id}-dot-${i}`,
                x: currentX,
                y: params.y - (params.dots_displace ? staffLineSpacing / 2 : 0),
                child: lib.smufl.dot
            });
            currentX += lib.getComputedTextLength(lib.smufl.dot, 'Rest-dot Global-musicFont');
        }
        returnArray.push(dotGroup);
        
        return returnArray;
    }
    
    getElementViewParams(element) {
        const glyph = element.querySelector(`.Rest-glyph`).innerText;
        const x = parseFloat(restHead.getAttribute('x'));
        const y = parseFloat(restHead.getAttribute('y'));
        const dots = parseInt(element.querySelector(`.Rest-dot-group`).dataset['num-dots']);

        return {
            id: element.id,
            x,
            y,
            glyph,
            dots
        }
    }

    getPaletteIcon() {
        return {
            key: 'svg',
            val: {
                new: 'text',
                id: `Rest-palette-icon`,
                class: 'Rest-glyph Global-musicFont',
                x: 20,
                y: 20,
                child: ''
            }
        }
    }

    childDataToViewParams(this_element, child_data) {
        if (child_data.class == 'Graphic') {
            const x = this.getElementViewParams(this_element).x;
            const y = this.getElementViewParams(this_element).y - 50;
            return {x, y}
        }
    }

    childViewParamsToData(this_element, child_viewParams) {

    }

    // update parent when new rest is added
    creatNewFromMouseEvent(event)
    {
        // remove preview sprite
        ui_api.drawsocketInput({
            key: "remove", 
            val: `${this.class}-sprite`
        })

        // generate objectData from Mouse Event
        const container = ui_api.getCurrentContext();
        let data =  this.mouseToData(event, container);
        
        this.fromData(data, container);

        // send new object to server
        ui_api.sendToServer({
            key: "data",
            val: data
        })

        // call parent updateAfterContents function
        const parentDef = ui_api.getDefForElement(container);
        parentDef.updateAfterContents(container);

        return data;
    }

    // update parent when rest is changed from inspector
    updateFromDataset(element)
    {
        const container = ui_api.getContainerForElement(element);        
        let data = ui_api.getElementData(element, container);
     
        //console.log(element.id, 'updateFromDataset', data);

        this.fromData(data, container);

        // update data 
        ui_api.sendToServer({
            key: "data",
            val: data
        })

        let contents = element.querySelector('.contents');
        let children = contents.children;
        //console.log(element.id, 'contents', children);

        for( let i = 0; i < children.length; i++)
        {
            const child_def = ui_api.getDefForElement(children[i]);
            child_def.updateFromDataset(children[i]);
        }
        const parentDef = ui_api.getDefForElement(container);
        parentDef.updateAfterContents(container);

    }

}

class Rest_IO extends Template.IO_SymbolBase
{
    constructor()
    {
        super();
        this.class = 'Rest';
    }
    
}



module.exports = {
    ui_def: Rest,
    io_def: Rest_IO    
}



/***/ }),

/***/ 699:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Template = __webpack_require__(20);
const lib = __webpack_require__(1);

class Score extends Template.SymbolBase {
    constructor() {
        super();
        this.class = 'Score';
        this.palette = ['Part'];
    }

    get structs() {
        return {

            data: {
                class: this.class,
                id: `${this.class}-0`,
                x: 0,
                y: 0,
                width: 800,
                height: 600,
                title: 'Score Title',
                margin_left: 40,
                margin_right: 40,
                margin_top: 40,
                margin_bottom: 40,
                margin_part: 20,
                indent: 50
            },

            view: {
                class: this.class,
                id: `${this.class}-0`,
                x: 5,
                y: 5,
                height: 30,
                width: 30,
                title: '',
                margin_left: 0,
                margin_right: 0,
                margin_top: 0,
                margin_bottom: 0,
                margin_part: 20,
                indent: 20
            },
            
            
            children: {
                data: {
                },
                view: {
                    x: 0,
                    y: 0
                }
            }
            
        }
    }

    drag(element, pos) { }
    /*
    selected(element, state) {
        ui_api.sendToServer({ 
            key:"call", 
            val: {
                class: "NodeScoreAPI", 
                method: "updateSelected",
                id: element.id,
                state: state
            }
        });
    }
    */

    currentContext( element, enable = false ) 
    {
        console.log(this.class, " is context ", enable);
        if( enable )
        {
            this.m_mode = 'context';
        }
        else
        {
            this.m_mode = "exited context";
        }
        ui_api.sendToServer({ 
            key:"call", 
            val: {
                class: "NodeScoreAPI", 
                method: "updateContext",
                id: element.id,
                enable
            }
        });
    }

    display(params) {
        ui_api.hasParam(params, Object.keys(this.structs.view));
        return [{
            new: 'rect',
            id: `${params.id}-rect`,
            class: 'Score-rect',
            x: params.x,
            y: params.y,
            height: params.height,
            width: params.width
        }, {
            new: 'text',
            id: `${params.id}-title`,
            class: 'Score-title Global-textFont',
            x: params.x + params.margin_left,
            y: params.y + params.margin_top,
            child: params.title
        }];

        /**
         * note that we are returning the drawsocket def that will be 
         * displayed in the 'view' group
         * the top level element of the symbol has the root id
         * so here we need to make sure that the id is different
         */

    }

    getElementViewParams(element) {
        // For this element, dataset is identical to view params
        return element.dataset;
    }

    /**
     * note: this container is a 'top level' DURATION container, and so for the moment we are not querying
     * the parent for info, because the here the width is determined by the duration, and the parent
     * is purely graphical, and has no knowledge of duration.
     */

    dataToViewParams(data, container) {

        //console.log('dataToViewParams in Score');
        let viewInData = ui_api.filterByKeys(data, Object.keys(this.structs.view));

        return {
            ...this.structs.view, // defaults
            ...viewInData, // view params passed in from data
            id: data.id
        }

    }

    getPaletteIcon() {
        return {
            key: 'svg',
            val: {
                new: 'text',
                child: 'S',
                class: 'Score-title Global-textFont',
                x: 20,
                y: 30,
                'text-anchor': 'center'
            }
        }
    }

    /*
    childDataToViewParams(this_element, child_data) {
        const x = parseFloat(this_element.dataset.x) + parseFloat(this_element.dataset.margin_left) + parseFloat(this_element.dataset.indent);

        const children = this_element.querySelector('.contents').children;
        let y = parseFloat(this_element.dataset.margin_part);
        
        if ( children.length > 0 ) {
            const lastChild = children[children.length-1];
            const lastChildBottom = lastChild.querySelector(`#${lastChild.id}-cornerVertical`).getAttribute('y2');
            y += parseFloat(lastChildBottom);

            const thisChild = this_element.querySelector(`#${child_data.id}`);
            
            // if the child already exists
            if (thisChild) {
                const thisChildTop = parseFloat(thisChild.querySelector(`#${child_data.id}-cornerVertical`).getAttribute('y1'));
                const thisChildBottom = parseFloat(thisChild.querySelector(`#${child_data.id}-cornerVertical`).getAttribute('y2'));
                y -= thisChildBottom - thisChildTop + parseFloat(this_element.dataset.margin_part);
            }
        }
        else  {
            const titleText = this_element.querySelector('.Score-title');
            y += ui_api.getBBoxAdjusted(titleText).bottom;
        }
        return {
            x, 
            y
        };


        
        // The way to get parent defs:
        //let container = ui_api.getContainerForElement(this_element);
        //let parentDef = ui_api.getDefForElement(container);
        //return parentDef.childDataToViewParams(container, child_data);
        
    }
    */
    childDataToViewParams(this_element, child_data) {
        const x = parseFloat(this_element.dataset.x) + parseFloat(this_element.dataset.margin_left) + parseFloat(this_element.dataset.indent);
        const children = this_element.querySelector('.contents').children;
        const titleText = this_element.querySelector('.Score-title');
        let y = ui_api.getBBoxAdjusted(titleText).bottom + parseFloat(this_element.dataset.margin_part);
        
        for (let i = 0; i < children.length; i++) {
            //console.log('i ==',i);
            const currentId = children[i].id;
            if (currentId == child_data.id) {
                break;
            }
            else {
                const vLine = children[i].querySelector(`#${currentId}-cornerVertical`);
                const height = parseFloat(vLine.getAttribute('y2')) - parseFloat(vLine.getAttribute('y1'));
                y += height + parseFloat(this_element.dataset.margin_part);
            }
        }
        return {
            x, 
            y
        };
    }
    viewParamsToData(viewParams, container) {}

    childViewParamsToData(this_element, child_viewParams) {}


    /**
     * 
     * @param {Element} element 
     * 
     * called after child object has been added in order to adjust 
     * drawing of the container element
     * 
     */
    updateAfterContents(element) {
        console.log('Score updateAfterContents');
        const children = element.querySelector('.contents').children;
        const numChildren = children.length;
        const lastChild = children[numChildren-1];
        const partBottom = parseFloat(lastChild.querySelector(`#${lastChild.id}-cornerVertical`).getAttribute('y2'));
        
        const dataObj = {
            id: element.id,
            x: parseFloat(element.dataset.x),
            y: parseFloat(element.dataset.y),
            width: parseFloat(element.dataset.width),
            height: partBottom + parseFloat(element.dataset.margin_bottom) - parseFloat(element.dataset.y),
            title: element.dataset.title,
            margin_left: parseFloat(element.dataset.margin_left),
            margin_right: parseFloat(element.dataset.margin_right),
            margin_top: parseFloat(element.dataset.margin_top),
            margin_bottom: parseFloat(element.dataset.margin_bottom),
            margin_part: parseFloat(element.dataset.margin_part),
            indent: parseFloat(element.dataset.indent)
        }

        const container = ui_api.getContainerForElement(element);

        this.fromData(dataObj, container);
    }

    //updateFromDataset(element) {

        /**
         * here is where we might want to change the x_ and y_ params
         * for mapping the children
         */

    //}



}

class Score_IO extends Template.IO_SymbolBase {
    constructor() {
        super();
        this.class = 'Score';
    }

}


module.exports = {
    ui_def: Score,
    io_def: Score_IO
}



/***/ }),

/***/ 521:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Template = __webpack_require__(20);
const lib = __webpack_require__(1);


class StaffClef extends Template.SymbolBase 
{
    constructor() {
        super();
        this.class = 'StaffClef';
        this.palette = ['Note', 'Rest', 'RhythmGroup'];
        this.fontSize = 24;
    }


    get structs () {
        return {

            data: {
                class: this.class,
                id : `${this.class}-0`,
                staff_line : [-2, -1, 0, 1, 2],
                clef: 'G',
                clef_anchor: 'auto',
                clef_visible: 'auto',
                key_map: 'auto',
                key_signature: 'none',
                key_signature_visible: 'auto'
            },
            
            view: {
                class: this.class,
                id: `${this.class}-0`, 
                staff_line : [-2, -1, 0, 1, 2],
                staff_line_width: 100,
                x: 100,
                y: 100,
                clef: 'G',
                clef_anchor: -1,
                clef_visible: 'auto',
                key_map: 'auto',
                key_signature: 'none',
                key_signature_visible: 'auto'
            },
            
            children: {
                data: {},
                view: {}
            }
        }
    }

    drag(element, pos){}

    selected(element, state) {
        ui_api.sendToServer({ 
            key:"call", 
            val: {
                class: "NodeScoreAPI", 
                method: "updateSelected",
                id: element.id,
                state: state
            }
        });
    }

    currentContext( element, enable = false ) 
    {
        console.log(this.class, " is context ", enable);
        if( enable )
        {
            this.m_mode = 'context';
        }
        else
        {
            this.m_mode = "exited context";
        }
        ui_api.sendToServer({ 
            key:"call", 
            val: {
                class: "NodeScoreAPI", 
                method: "updateContext",
                id: element.id,
                enable
            }
        });
    }
    
    display(params) {
        //console.log('params', params);
        ui_api.hasParam(params, Object.keys(this.structs.view) );
        let returnArray = [];

        // reference
        returnArray.push({
            new: 'rect',
            class: 'StaffClef-ref',
            id: `${params.id}-ref`,
            x: params.x,
            y: params.y,
            width: params.staff_line_width,
            height: this.fontSize
        });

        // staff lines
        let staffLineGroup = {
            new: 'g',
            class: 'StaffClef-staff_line-group',
            id: `${params.id}-staff_line-group`,
            child: []
        }
        let staffLineSpacing = this.fontSize / 4;
        //if (typeof(params.staff_line) == 'string') params.staff_line = JSON.parse(params.staff_line);
        params.staff_line.forEach(i => {
            staffLineGroup.child.push({
                new: 'line',
                class: 'StaffClef-staff_line',
                id: `${params.id}-staff_line-${i}`,
                x1: params.x,
                x2: params.x + params.staff_line_width,
                y1: params.y - staffLineSpacing * i,
                y2: params.y - staffLineSpacing * i
            });
        });
        returnArray.push(staffLineGroup);

        // clef + keysig
        let clefKeyGroup = {
            new: 'g',
            class: 'StaffClef-clef_key-group',
            id: `${params.id}-clef_key-group`,
            child: []
        }
        let clefVisible = params.clef_visible;
        let keySigVisible = params.key_signature_visible;
        let keyMap;
        //console.log('clefVisible',clefVisible);
        //console.log('keySigVisible',keySigVisible);
        if (clefVisible == 'auto') {
            console.error('Error: clef_visible is still auto inside StaffClef display');
            clefVisible = true;
        }
        if (keySigVisible == 'auto') {
            console.error('Error: key_signature_visible is still auto inside StaffClef display');
            keySigVisible = true;
        }
        if (clefVisible == true || keySigVisible == true) {
            keyMap = __webpack_require__(629)(`./${params.key_map}`);
        }
        //console.log('clefVisible', clefVisible);
        if (clefVisible == true) {
            let clefGroup = {
                new: 'g',
                class: 'StaffClef-clef-group',
                id: `${params.id}-clef-group`,
                child: []
            }
            if (Array.isArray(params.clef)) {
                params.clef.forEach((c, ind) => {
                    clefGroup.child.push({
                        new: 'text',
                        class: 'StaffClef-clef Global-musicFont',
                        id: `${params.id}-clef`,
                        x: params.x,
                        y: params.y - staffLineSpacing * params.clef_anchor[ind],
                        child: keyMap.clefDef[c].glyph
                    });
                })
            }
            else {
                clefGroup.child.push({
                    new: 'text',
                    class: 'StaffClef-clef Global-musicFont',
                    id: `${params.id}-clef`,
                    x: params.x,
                    y: params.y - staffLineSpacing * params.clef_anchor,
                    child: keyMap.clefDef[params.clef].glyph
                });
            }

            clefKeyGroup.child.push(clefGroup);
        }
        console.log('Start key sig', params.key_signature)
        if (keySigVisible == true) {
            const keySigGroup = keyMap.keySignatureDisplay(params, params.x + staffLineSpacing * 3, staffLineSpacing);
            clefKeyGroup.child.push(keySigGroup);
        }
        
        
        returnArray.push(clefKeyGroup);
        
        return returnArray;
    }
    
    getElementViewParams(element) {
        const ref = element.querySelector(`.StaffClef-ref`);
        
        const x = parseFloat(ref.getAttribute('x'));
        const y = parseFloat(ref.getAttribute('y'));
        const staff_line_width = parseFloat(ref.getAttribute('width'));
        return {
            id: element.id,
            staff_line : JSON.parse(element.dataset.staff_line),
            staff_line_width,
            x,
            y,
            clef: element.dataset.clef,
            clef_anchor: parseInt(element.dataset.clef),
            clef_visible: element.dataset.clef_visible
        }
    }

    getPaletteIcon() {
        return {
            key: 'svg',
            val: this.display({
                ...this.structs.view,
                id: `${this.class}-palette-icon`,
                class: this.class,
                x: 5,
                y: 20,
                staff_line_width: 30,
                staff_line : [-2, -1, 0, 1, 2],
                clef_visible: false
            })
        }
    }

    childDataToViewParams(this_element, child_data) {
        let x, y;
        const container = ui_api.getContainerForElement(this_element);
        const children = this_element.querySelector('.contents').children;

        const clefKeyGroup = this_element.querySelector('.StaffClef-clef_key-group');
        const timeSigGroup = container.querySelector('.Measure-timeSig-group');

        // NEED TO SIMPLIFY

        if (child_data.class == 'Note') {
            const clefKeyGroup = this_element.querySelector('.StaffClef-clef_key-group');

            // initialize x, start from the right of timeSig/clefKey if visible
            if (children.length > 0 ) {
                try { // check if this child already exists
                    const child_exist = document.getElementById(child_data.id);
                    x = ui_api.getBBoxAdjusted(child_exist).left;
                }
                catch (e) {
                    const lastChild = children[children.length-1];
                    x = ui_api.getBBoxAdjusted(lastChild).right;
                }
            }
            else if (timeSigGroup) {
                x = ui_api.getBBoxAdjusted(timeSigGroup).right;
            }
            else if (clefKeyGroup.childNodes.length > 0) {
                x = ui_api.getBBoxAdjusted(clefKeyGroup).right;
            }
            else {
                x = this.getElementViewParams(this_element).x;
            }
            const keyMap = __webpack_require__(629)(`./${this_element.dataset.key_map}`);
            const fromKeyMap = keyMap.noteDataToViewParams(this_element, child_data, this.fontSize / 4);
            //const x_after_note = x + lib.getComputedTextLength(fromKeyMap.note_head_glyph, 'Note-note_head Global-musicFont');
            return {
                ...fromKeyMap, // y, accidental_glyph, accidental_visible, stem_direction, ledger_line, note_head_glyph
                x//,
                //beam_flag: true,
                //x_after_note
            }
        }
        else if (child_data.class == 'Rest') {
            const clefKeyGroup = this_element.querySelector('.StaffClef-clef_key-group');
            const y = this.getElementViewParams(this_element).y;
            // initialize x, start from the right of timeSig/clefKey if visible
            if (children.length > 0 ) {
                try { // check if this child already exists
                    const child_exist = document.getElementById(child_data.id);
                    x = ui_api.getBBoxAdjusted(child_exist).left;
                }
                catch (e) {
                    const lastChild = children[children.length-1];
                    x = ui_api.getBBoxAdjusted(lastChild).right;
                }
            }
            else if (timeSigGroup) {
                x = ui_api.getBBoxAdjusted(timeSigGroup).right;
            }
            else if (clefKeyGroup.childNodes.length > 0) {
                x = ui_api.getBBoxAdjusted(clefKeyGroup).right;
            }
            else {
                x = this.getElementViewParams(this_element).x;
            }
            const keyMap = __webpack_require__(629)(`./${this_element.dataset.key_map}`);
            const fromKeyMap = keyMap.restDataToViewParams(this_element, child_data, this.fontSize / 4);
            
            return {
                ...fromKeyMap, // y, accidental_glyph, accidental_visible, stem_direction, ledger_line, note_head_glyph
                x,
                y
            }
        }
        else if (child_data.class == 'RhythmGroup') {

            if (children.length > 0 ) {
                try { // check if this rhythm group already exists
                    const child_exist = document.getElementById(child_data.id);
                    x = ui_api.getBBoxAdjusted(child_exist).left;
                }
                catch (e) {
                    const lastChild = children[children.length-1];
                    x = ui_api.getBBoxAdjusted(lastChild).right;
                }
            }
            else if (timeSigGroup) {
                x = ui_api.getBBoxAdjusted(timeSigGroup).right;
            }
            else if (clefKeyGroup.childNodes.length > 0) {
                x = ui_api.getBBoxAdjusted(clefKeyGroup).right;
            }
            else {
                x = this.getElementViewParams(this_element).x;
            }
            y = this.getElementViewParams(this_element).y;

            return {
                x,
                y
            }
        }
    }

    childViewParamsToData(this_element, child_viewParams) {
        if ('note_head_glyph' in child_viewParams) { // if child is a note
            const keyMap = __webpack_require__(629)(`./${this_element.dataset.key_map}`);
            const yCenter = this.getElementViewParams(this_element).y;
            const staffLevelSpacing = this.fontSize / 8;
            const staffLevel = (yCenter - child_viewParams.y) / staffLevelSpacing;
            const pitch = keyMap.staffLevelToPitch(this_element, staffLevel);
            return { pitch }
        }
    }

    updateAfterContents (element) {
        const children = element.querySelector('.contents').children;
        const l = children.length;
        let drawArray = [];
        //let beamArray = [];
        let leftXArray = [];
        let rightXArray = [];
        let yArray = [];
        let isNote = [];
        let stemGroup = {
            new: 'g',
            class: 'StaffClef-stem-group',
            id: `${element.id}-stem-group`,
            container: `${element.id}-display`,
            child: []
        };
        let flagGroup = {
            new: 'g',
            class: 'StaffClef-flag-group',
            id: `${element.id}-flag-group`,
            container: `${element.id}-display`,
            child: []
        };
        const refY = parseFloat(element.querySelector('.StaffClef-ref').getAttribute('y'));

        // iterate children
        for (let i = 0; i < l; i++) {
            if (children[i].classList[0] == 'Note') {
                isNote[i] = true;
                // notehead y left right
                const noteHead = children[i].querySelector('.Note-note_head');
                const noteHeadBBox = ui_api.getBBoxAdjusted(noteHead);
                leftXArray[i] = noteHeadBBox.left;
                rightXArray[i] = noteHeadBBox.right;
                const noteHeadY = parseFloat(noteHead.getAttribute('y'));
                yArray[i] = noteHeadY;
                
                // draw stems
                const staffHeight = lib.fontSize;
                const stemWidth = lib.fontSize / 16;
                let stem_direction = children[i].dataset.stem_direction;
                
                if (stem_direction == 'auto') {
                    if (yArray[i] >= refY) stem_direction = 'up';
                    else stem_direction = 'down';
                }

                if (stem_direction == 'up') {
                    stemGroup.child.push({
                        new: 'rect',
                        class: 'StaffClef-stem',
                        id: `${element.id}-stem-${children[i].id}`,
                        x: rightXArray[i] - stemWidth,
                        y: yArray[i] - staffHeight,
                        width: stemWidth,
                        height: staffHeight
                    });
                }
                else if (stem_direction == 'down') {
                    stemGroup.child.push({
                        new: 'rect',
                        class: 'StaffClef-stem',
                        id: `${element.id}-stem-${children[i].id}`,
                        x: leftXArray[i],
                        y: yArray[i],
                        width: stemWidth,
                        height: staffHeight
                    });
                }

                // draw flags
                const noteFlagGroup = children[i].querySelector('.Note-flag-group');
                const numFlags = parseFloat(noteFlagGroup.dataset.num_beams);
                if (numFlags > 0 && numFlags <= 8) {
                    flagGroup.child.push({
                        new: 'text',
                        class: 'StaffClef-flag Global-musicFont',
                        id: `${element.id}-flag-${children[i].id}`,
                        x: (stem_direction == 'down' ? leftXArray[i] : rightXArray[i] - stemWidth),
                        y: yArray[i] - (stem_direction == 'down' ? 0 : staffHeight),
                        child: lib.smufl.flag[numFlags][stem_direction]
                    });
                }
            }
            else if (children[i].classList[0] == 'RhythmGroup') {
                // do nothing if it's a RhythmGroup
                isNote[i] = false;
            }
        }
        
        drawArray.push(stemGroup);
        drawArray.push(flagGroup);

        const drawObj = {
            key: 'svg',
            val: drawArray
        }
        ui_api.drawsocketInput(drawObj);

    }
}

class StaffClef_IO extends Template.IO_SymbolBase
{
    constructor()
    {
        super();
        this.class = 'StaffClef';
    }
    
}



module.exports = {
    ui_def: StaffClef,
    io_def: StaffClef_IO    
}



/***/ }),

/***/ 94:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const testXML = `<?xml version="1.0"?> <jmslscoredoc> <!-- Saved document from JMSL's programmable music notation editor. Java Music Specification Language by Nick Didkovsky & Phil Burk, available from: http://www.algomusic.com --> <score NAME="JMSLMaxScore-8" SUBTITLE="" COMPOSER="" COPYRIGHT="" WIDTH="800" HEIGHT="800" STAFFS="1" NUMTRACKSPERSTAFF="4" InstrumentNamesVisible="false" TempoVisible="true" StaffNumbersVisible="true" MeasureNumbersVisible="true" SectionBracketsVisible="true" TimeSignaturesVisible="true" KeySignaturesVisible="true" ClefsVisible="true" ScoreTitleVisible="false" CourtesyClefsVisible="false" MeasureNumberOffset="1" LeftMargin="20.0" RightMargin="20.0" TopMargin="15.0" BottomMargin="15.0" TopMarginOfFirstPage="60.0" DrawAllMeasureNumbers="false" TextFontScaler="1.5" ScoreSubtitleFontScaler="2.0" ScoreTitleFontScaler="4.0" TimesigFontScaler="2.5" MeasureNumberFontScaler="1.5" TextFontName="SansSerif" ScoreSubtitleFontName="Serif" ScoreTitleFontName="Serif" TimesigFontName="Serif" MeasureNumberFontName="SansSerif" FirstSystemIndent="0.0" useLegacyMultiTrackOrientation="true" > <ScoreAnnotation CLASSNAME="com.softsynth.jmsl.score.ScoreAnnotation" Annotation="316.3ocUPtzSCCCDD9bxuBKeNMxUhGpbipdgCTp3gPBDGbRsiL01azZmBnp9eG+nMDtXK+siGMydnrftWfNEXojaHz40LZUf0iPOf9.lqiCXQXila2sg2IFIdkQ7hU4if4LVcFJ91KAaBRuEUAGhXyfS0NxWh78CHmlcwqEiSdN3oirV7E4QvvsIEMcsfFv372Ir5EKtpZx0EUjPtIeDUJ+uRV0jiQQNg+Uj2mR8o2uAfIUq5KOQVEhWdA7TOuUY6Vxc4lWecRhmKkyXQRwgxhBpVrsSfZkU3N6bT0O5zunqDR9f1SSXipECsKEAp49YVvJxS3a+bv4OugKnsgUSR01o+OEsYZ.1Mz+m1Tj5PHyB8OT7TiC11zf2YcdbM2jyCI6jJBGLBqONYC3TwR+fTFVAImKKNVVdr7W.K.VkGB" > </ScoreAnnotation> <orchestra CLASSNAME="com.softsynth.jmsl.score.Orchestra" > <jmslscoreinstrument CLASSNAME="com.algomusic.max.MaxScoreInstrument" InsIndex="0" EditEnabled="true" Name="MaxScoreIns-0" MixerClassName="com.softsynth.jmsl.NullMixer" Transposition="0.0" > <dim index="4" defaultvalue="0.0" lowlimit="0.0" highlimit="3.0" name="EventFlag" /> <dim index="5" defaultvalue="-1.0" lowlimit="-1.0" highlimit="127.0" name="originalPitch" /> <dim index="6" defaultvalue="-1.0" lowlimit="-1.0" highlimit="10000.0" name="index" /> </jmslscoreinstrument> </orchestra> <mixerpanelsettings > <panamppair FADERINDEX="0" PAN="0.5" AMP="0.5" /> </mixerpanelsettings> <staffspacing INDEX="0" ABOVE="72.0" BELOW="72.0" /> <scoresection NAME="A" START="0" END="0" /> <scoresection NAME="B" START="0" END="0" /> <scoresection NAME="C" START="0" END="0" /> <scoresection NAME="D" START="0" END="0" /> <scoresection NAME="E" START="0" END="0" /> <scoresection NAME="F" START="0" END="0" /> <scoresection NAME="G" START="0" END="0" /> <scoresection NAME="H" START="0" END="0" /> <scoresection NAME="I" START="0" END="0" /> <scoresection NAME="J" START="0" END="0" /> <scoresection NAME="K" START="0" END="0" /> <scoresection NAME="L" START="0" END="0" /> <scoresection NAME="M" START="0" END="0" /> <scoresection NAME="N" START="0" END="0" /> <scoresection NAME="O" START="0" END="0" /> <scoresection NAME="P" START="0" END="0" /> <scoresection NAME="Q" START="0" END="0" /> <scoresection NAME="R" START="0" END="0" /> <scoresection NAME="S" START="0" END="0" /> <scoresection NAME="T" START="0" END="0" /> <scoresection NAME="U" START="0" END="0" /> <scoresection NAME="V" START="0" END="0" /> <scoresection NAME="W" START="0" END="0" /> <scoresection NAME="X" START="0" END="0" /> <scoresection NAME="Y" START="0" END="0" /> <scoresection NAME="Z" START="0" END="0" /> <measure WIDTH="821" WIDTHSETBYHAND="false" TIMESIG="4 4" TIMESIGSETBYHAND="false" TEMPO="60.0" TEMPOSETBYHAND="false" REPEATSTART="false" REPEATEND="false" NUMREPEATS="1" BARLINE="SINGLE" MEASURETEXT="" MEASURETEXTX="48" MEASURETEXTY="48" MEASURELEFTMARGIN="50.0" > <staff INDEX="0" CLEF="0" CLEFSETBYHAND="false" INSTRUMENTINDEX="0" INSINDEXSETBYHAND="false" KEYSIGTYPE="0" KEYSIGNUMACC="0" KEYSIGSETBYHAND="false" EXTENDEDLINESABOVE="0" EXTENDEDLINESBELOW="0" > <track INDEX="0" MultitrackRestAdjustmentY="0.0" > <note NOTEDUR="2" TUPLET="0" DOTS="0" ACCINFO="0" DURATION="1.0" PITCH="67.0" VELOCITY="0.5" HOLD="0.25" BEAMEDOUT="false" GLISSOUT="false" TIEDOUT="false" ACCPREF="0" ACCVISPOLICY="0" ALTENHARMONIC="false" DYN="0" SLUROUT="false" ISGRACENOTE="false" GRACENOTESEPARATIONSCALER="2.0" LEDGERLINESVISIBLE="true" WEDGE="none" OTTAVA="none" MARK="0" TEXTOFFSETX="0" TEXTOFFSETY="0" NOTEHEAD="0" NOTEHEADSCALE="1.0" VISIBLE="true" NOTEHEADVISIBLE="true" STEMVISIBLE="true" OVERRIDELEVEL="-1" ISOVERRIDELEVEL="false" STEMINFOOVERRIDE="false" STEMINFO="1" LAYOUTSHIFTX="0.0" TEXT="" > <dim index="4" value="0.0" name="EventFlag" /> <dim index="5" value="67.0" name="originalPitch" /> <dim index="6" value="-1.0" name="index" /> </note> <note NOTEDUR="2" TUPLET="0" DOTS="0" ACCINFO="0" DURATION="1.0" PITCH="64.0" VELOCITY="0.5" HOLD="1.0" BEAMEDOUT="false" GLISSOUT="false" TIEDOUT="false" ACCPREF="0" ACCVISPOLICY="0" ALTENHARMONIC="false" DYN="0" SLUROUT="false" ISGRACENOTE="false" GRACENOTESEPARATIONSCALER="2.0" LEDGERLINESVISIBLE="true" WEDGE="none" OTTAVA="none" MARK="0" TEXTOFFSETX="0" TEXTOFFSETY="0" NOTEHEAD="0" NOTEHEADSCALE="1.0" VISIBLE="true" NOTEHEADVISIBLE="true" STEMVISIBLE="true" OVERRIDELEVEL="-1" ISOVERRIDELEVEL="false" STEMINFOOVERRIDE="false" STEMINFO="1" LAYOUTSHIFTX="0.0" TEXT="" > <dim index="4" value="0.0" name="EventFlag" /> <dim index="5" value="64.0" name="originalPitch" /> <dim index="6" value="-1.0" name="index" /> </note> <note NOTEDUR="2" TUPLET="0" DOTS="0" ACCINFO="0" DURATION="1.0" PITCH="74.0" VELOCITY="0.5" HOLD="1.0" BEAMEDOUT="false" GLISSOUT="false" TIEDOUT="false" ACCPREF="0" ACCVISPOLICY="0" ALTENHARMONIC="false" DYN="0" SLUROUT="false" ISGRACENOTE="false" GRACENOTESEPARATIONSCALER="2.0" LEDGERLINESVISIBLE="true" WEDGE="none" OTTAVA="none" MARK="0" TEXTOFFSETX="0" TEXTOFFSETY="0" NOTEHEAD="0" NOTEHEADSCALE="1.0" VISIBLE="true" NOTEHEADVISIBLE="true" STEMVISIBLE="true" OVERRIDELEVEL="-1" ISOVERRIDELEVEL="false" STEMINFOOVERRIDE="false" STEMINFO="2" LAYOUTSHIFTX="0.0" TEXT="" > <dim index="4" value="0.0" name="EventFlag" /> <dim index="5" value="74.0" name="originalPitch" /> <dim index="6" value="-1.0" name="index" /> </note> <note NOTEDUR="2" TUPLET="0" DOTS="0" ACCINFO="0" DURATION="1.0" PITCH="71.0" VELOCITY="0.5" HOLD="1.0" BEAMEDOUT="false" GLISSOUT="false" TIEDOUT="false" ACCPREF="0" ACCVISPOLICY="0" ALTENHARMONIC="false" DYN="0" SLUROUT="false" ISGRACENOTE="false" GRACENOTESEPARATIONSCALER="2.0" LEDGERLINESVISIBLE="true" WEDGE="none" OTTAVA="none" MARK="0" TEXTOFFSETX="0" TEXTOFFSETY="0" NOTEHEAD="0" NOTEHEADSCALE="1.0" VISIBLE="true" NOTEHEADVISIBLE="true" STEMVISIBLE="true" OVERRIDELEVEL="-1" ISOVERRIDELEVEL="false" STEMINFOOVERRIDE="false" STEMINFO="2" LAYOUTSHIFTX="0.0" TEXT="" > <dim index="4" value="0.0" name="EventFlag" /> <dim index="5" value="71.0" name="originalPitch" /> <dim index="6" value="-1.0" name="index" /> </note> </track> <track INDEX="1" MultitrackRestAdjustmentY="0.0" > </track> <track INDEX="2" MultitrackRestAdjustmentY="0.0" > </track> <track INDEX="3" MultitrackRestAdjustmentY="0.0" > </track> </staff> </measure> <measure WIDTH="700" WIDTHSETBYHAND="false" TIMESIG="4 4" TIMESIGSETBYHAND="false" TEMPO="60.0" TEMPOSETBYHAND="false" REPEATSTART="false" REPEATEND="false" NUMREPEATS="1" BARLINE="SINGLE" MEASURETEXT="" MEASURETEXTX="48" MEASURETEXTY="48" MEASURELEFTMARGIN="50.0" > <staff INDEX="0" CLEF="0" CLEFSETBYHAND="false" INSTRUMENTINDEX="0" INSINDEXSETBYHAND="false" KEYSIGTYPE="0" KEYSIGNUMACC="0" KEYSIGSETBYHAND="false" EXTENDEDLINESABOVE="0" EXTENDEDLINESBELOW="0" > <track INDEX="0" MultitrackRestAdjustmentY="0.0" > </track> <track INDEX="1" MultitrackRestAdjustmentY="0.0" > </track> <track INDEX="2" MultitrackRestAdjustmentY="0.0" > </track> <track INDEX="3" MultitrackRestAdjustmentY="0.0" > </track> </staff> </measure> <scoreUserBean CLASSNAME="com.algomusic.max.MaxScoreRenderedMessageListener" > </scoreUserBean> </score> </jmslscoredoc>`;

function importJMSL(path) {
    //const fs = require('fs');
    const xml2json = __webpack_require__(540);
    let scoreObj = {
        class: 'Score',
        id: 'Score',
        x: 100,
        y: 40,
        width: 1000,
        height: 500,
        indent: 100,
        contents: []
    };
    //console.log('path = ', path);
    /*fs.readFile(path, 'utf-8', (err, xml) => {
        if (err) console.error(err);
        else {
            console.log('xml read successful: ' + path);
            const jmsl = xml2json.xml2json(xml);
            console.log(jmsl);
        }
    });
    */
    try {
        //console.log('imported XML: '+testXML);
        const jmsl = xml2json.xml2json(testXML);
        //console.log('converted JSON: '+JSON.stringify(jmsl, null, 2));

        const score = jmsl.jmslscoredoc.score;
        if (typeof score.NAME != 'undefined') scoreObj.title = score.NAME;
        let num_staffs = 0;
        if (typeof score.STAFFS != 'undefined') num_staffs = score.STAFFS;

        for (let i = 0; i < num_staffs; i++) {
            scoreObj.contents.push({
                class: 'Part',
                id: `Part_${i}`,
                contents: []
            });
        }

        const measure = Array.isArray(score.measure) ? score.measure : [score.measure];

        measure.forEach((m,i) => {
            const timesig = m.TIMESIG.split(' ');
            const staff = Array.isArray(m.staff) ? m.staff : [m.staff];
            scoreObj.contents.forEach((p,j) => {
                let measureStaffObj = {
                    // copy measure in all parts
                    class: 'Measure',
                    id: `Measure_${i}_${j}`,
                    time_signature: [timesig[0],timesig[1]],
                    index: i,
                    // individual StaffClef from m.staff
                    contents: [{
                        class: 'StaffClef',
                        id: `StaffClef_${i}_${j}`,
                        contents: []
                    }]
                }
                p.contents.push(measureStaffObj);                
            });


        });

    }
    catch (e) {
        console.error(e);
    }
    return scoreObj;
}

module.exports = {
    importJMSL
}

/***/ }),

/***/ 540:
/***/ ((module) => {

function xml2json(xmlStr) {
    xmlStr = cleanXML(xmlStr);
    return xml2jsonRecurse(xmlStr, 0);
}

function xml2jsonRecurse(xmlStr) {
    var obj = {},
        tagName, indexClosingTag, inner_substring, tempVal, openingTag;
    while (xmlStr.match(/<[^\/][^>]*>/)) {
        openingTag = xmlStr.match(/<[^\/][^>]*>/)[0];
        tagName = openingTag.substring(1, openingTag.length - 1);
        indexClosingTag = xmlStr.indexOf(openingTag.replace('<', '</'));
        if (indexClosingTag == -1) {
            tagName = openingTag.match(/[^<][\S*]*/)[0];
            indexClosingTag = xmlStr.indexOf('</' + tagName);
            if (indexClosingTag == -1) {
                indexClosingTag = xmlStr.indexOf('<\\/' + tagName);
            }
        }
        inner_substring = xmlStr.substring(openingTag.length, indexClosingTag);
        if (inner_substring.match(/<[^\/][^>]*>/)) {
            tempVal = xml2json(inner_substring);
        } else {
            tempVal = inner_substring;
        }
        if (obj[tagName] === undefined) {
            obj[tagName] = tempVal;
        } else if (Array.isArray(obj[tagName])) {
            obj[tagName].push(tempVal);
        } else {
            obj[tagName] = [obj[tagName], tempVal];
        }
        xmlStr = xmlStr.substring(openingTag.length * 2 + 1 + inner_substring.length);
    }
    return obj;
}

function cleanXML(xmlStr) {
    xmlStr = xmlStr.replace(/<![\s\S]*?>/g, '');
    xmlStr = xmlStr.replace(/\n|\t|\r/g, '');
    xmlStr = xmlStr.replace(/ {1,}<|\t{1,}</g, '<');
    xmlStr = xmlStr.replace(/> {1,}|>\t{1,}/g, '>');
   	xmlStr = xmlStr.replace(/<\?[^>]*\?>/g, '');
    xmlStr = replaceSelfClosingTags(xmlStr);
  	xmlStr = replaceAloneValues(xmlStr);
   	xmlStr = replaceAttributes(xmlStr);
    return xmlStr;
}

function replaceSelfClosingTags(xmlStr) {
    var selfClosingTags = xmlStr.match(/<[^/][^>]*\/>/g);
    	if (selfClosingTags) {
        for (var i = 0; i < selfClosingTags.length; i++) {
            var oldTag = selfClosingTags[i];
            var tempTag = oldTag.substring(0, oldTag.length - 2);
            tempTag += ">";
            var tagName = oldTag.match(/[^<][\w+$]*/)[0];
            var closingTag = "</" + tagName + ">";
            var newTag = "<" + tagName + ">";
            var attrs = tempTag.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g); //"
            if (attrs) {
                for (var j = 0; j < attrs.length; j++) {
                    var attr = attrs[j];
                    var attrName = attr.substring(0, attr.indexOf('='));
                    var attrValue = attr.substring(attr.indexOf('"') + 1, attr.lastIndexOf('"'));
                    newTag += "<" + attrName + ">" + attrValue + "</" + attrName + ">";
                }
            }
            newTag += closingTag;
            xmlStr = xmlStr.replace(oldTag, newTag);
        }
    }
    return xmlStr;
}

function replaceAloneValues(xmlStr) {
    var tagsWithAttributesAndValue = xmlStr.match(/<[^\/][^>][^<]+\s+.[^<]+[=][^<]+>{1}([^<]+)/g);
    if (tagsWithAttributesAndValue) {
        for (var i = 0; i < tagsWithAttributesAndValue.length; i++) {
            var oldTag = tagsWithAttributesAndValue[i];
            var oldTagName = oldTag.substring(0, oldTag.indexOf(">") + 1);
            var oldTagValue = oldTag.substring(oldTag.indexOf(">") + 1);
            var newTag = oldTagName + "<_@ttribute>" + oldTagValue + "</_@ttribute>";
            xmlStr = xmlStr.replace(oldTag, newTag);
        }
    }
    return xmlStr;
}

function replaceAttributes(xmlStr) {
     var tagsWithAttributes = xmlStr.match(/<[^\/][^>][^<]+\s+.[^<]+[=][^<]+>/g);
    if (tagsWithAttributes) {
        for (var i = 0; i < tagsWithAttributes.length; i++) {
            var oldTag = tagsWithAttributes[i];
            var tagName = oldTag.match(/[^<][\S*]*/)[0];
            var newTag = "<" + tagName + ">";
            var attrs = oldTag.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g); //"
           if (attrs) {
                for (var j = 0; j < attrs.length; j++) {
                    var attr = attrs[j];
                    var attrName = attr.substring(0, attr.indexOf('='));
                    var attrValue = attr.substring(attr.indexOf('"') + 1, attr.lastIndexOf('"'));
                    newTag += "<" + attrName + ">" + attrValue + "</" + attrName + ">";
                }
            }
            xmlStr = xmlStr.replace(oldTag, newTag);
        }
    }
    return xmlStr;
}

module.exports = {
    xml2json
}

/***/ }),

/***/ 298:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const lib = __webpack_require__(1);

const context = {
    about: '24 Tone Equal Temperament',
    steps: 24,
    step_size: 0.5,
    input_step_size: 1,
    repeat_interval: 12,
    dominant_interval: 7,
    mode_scale: [0, null, null, null, 0, null, null, null, 0, null, 0, null, null, null, 0, null, null, null, 0, null, null, null, 0, null], // accidental deviation if not in scale
    mode_steps: 7,
    tonic: 0
}
const clefDef = {
    G: {
        pitch: 67,
        glyph: lib.smufl.clef.G,
        default_anchor: -1,
        key_signature_centroid: {
            '1': 4,
            '-1': 2
        }
    },
    C: {
        pitch: 60,
        glyph: lib.smufl.clef.C,
        default_anchor: 0,
        key_signature_centroid: {
            '1': 1,
            '-1': -1
        }
    },
    F: {
        pitch: 53,
        glyph: lib.smufl.clef.F,
        default_anchor: 1,
        key_signature_centroid: {
            '1': -2,
            '-1': -4
        }
    },
    'G-8': {
        pitch: 55,
        glyph: lib.smufl.clef['G-8'],
        default_anchor: -1,
        key_signature_centroid: {
            '1': 4,
            '-1': 2
        }
    },
    'G+8': {
        pitch: 79,
        glyph: lib.smufl.clef['G+8'],
        default_anchor: -1,
        key_signature_centroid: {
            '1': 4,
            '-1': 2
        }
    },
    'G-15': {
        pitch: 43,
        glyph: lib.smufl.clef['G-15'],
        default_anchor: -1,
        key_signature_centroid: {
            '1': 4,
            '-1': 2
        }
    },
    'G+15': {
        pitch: 91,
        glyph: lib.smufl.clef['G+15'],
        default_anchor: -1,
        key_signature_centroid: {
            '1': 4,
            '-1': 2
        }
    },
    'C-8': {
        pitch: 48,
        glyph: lib.smufl.clef['C-8'],
        default_anchor: 0,
        key_signature_centroid: {
            '1': 1,
            '-1': -1
        }
    },
    'F-8': {
        pitch: 55,
        glyph: lib.smufl.clef['F-8'],
        default_anchor: 1,
        key_signature_centroid: {
            '1': -2,
            '-1': -4
        }
    },
    'F+8': {
        pitch: 79,
        glyph: lib.smufl.clef['F+8'],
        default_anchor: 1,
        key_signature_centroid: {
            '1': -2,
            '-1': -4
        }
    },
    'F-15': {
        pitch: 43,
        glyph: lib.smufl.clef['F-15'],
        default_anchor: 1,
        key_signature_centroid: {
            '1': -2,
            '-1': -4
        }
    },
    'F+15': {
        pitch: 91,
        glyph: lib.smufl.clef['F+15'],
        default_anchor: 1,
        key_signature_centroid: {
            '1': -2,
            '-1': -4
        }
    }
}

const clefAlternativeDef = {
    treble: {
        clef: 'G',
        clef_anchor: -1
    },
    soprano: {
        clef: 'G',
        clef_anchor: -2
    },
    alto: {
        clef: 'C',
        clef_anchor: 0
    },
    tenor: {
        clef: 'C',
        clef_anchor: 1
    },
    bass: {
        clef: 'F',
        clef_anchor: 1
    }
}

/**
 * Internal, returns formatted array of accidentals to be drawn 
 * Format:
 * [ {pitch_class, accidental}, ... ]
 * 
 * Also accepts format: ['C#', 'Ab']
 * 
 * Pitch class to be represented in midi, from 0 to 11
 * Accidental in string
 * 
 * @param {String} key
 */
function keySignatureDef(key) {
    if (Array.isArray(key)) {
        if (key.length == 0) return key;
        else if (key.length > 0) {
            if (typeof(key[0]) == 'string') {
                let returnArray = [];
                key.forEach((val, i) => {
                    returnArray[i] = {
                        pitch_class: pitchClassDef[val].pitch_class,
                        accidental: pitchClassDef[val].deviation
                    };
                });
                return returnArray;
            }
            else return key;
        }
    }

    if (key == 'none' || key == 'C' || key == 'Am') return [];

    // internal, for the following 4 cases
    function standardKeys(keyDefs, k, sharp) {
        let numSharp = keyDefs.indexOf(k) + 1;
        let keySigArray = [];
        let pitchClass = (sharp ? 6 : 10);
        for (let i = 0; i < numSharp; i++) {
            keySigArray.push({
                pitch_class: pitchClass,
                accidental: (sharp ? 1 : -1)
            });
            pitchClass = (pitchClass + (sharp ? context.dominant_interval : context.repeat_interval-context.dominant_interval)) % context.repeat_interval;
        }
        return keySigArray;
    }

    const sharpMajor = ['G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
    if (sharpMajor.includes(key)) {
        return standardKeys(sharpMajor, key, true);
    }

    const sharpMinor = ['Em', 'Bm', 'F#m', 'C#m', 'G#m', 'D#m', 'A#m'];
    if (sharpMinor.includes(key)) {
        return standardKeys(sharpMinor, key, true);
    }

    const flatMajor = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];
    if (flatMajor.includes(key)) {
        return standardKeys(flatMajor, key, false);
    }

    const flatMinor = ['Dm', 'Gm', 'Cm', 'Fm', 'Bbm', 'Ebm', 'Abm'];
    if (flatMinor.includes(key)) {
        return standardKeys(flatMinor, key, false);
    }

    /*
    // finally test if key is defined in JSON format
    try {
        const jsonKeySig = JSON.parse(key);
        if (!Array.isArray(jsonKeySig)) throw 'not an array';
        return jsonKeySig;
    }
    catch(e) {
        console.error('Please enter a valid key signature: defined string or array [{pitch_class, accidental}, ...]');
    }
    */

    // any other case: no key signature
    return [];
}

function accidentalDef(acc) {
    let deviation = 0;
    if (!isNaN(acc)) deviation = Number(acc);
    else if (typeof(acc) == 'string') {
        let accString = acc;
        let multiplier = 1;
        // template for the following parsing
        function parseAccidental(subString, dev, mul) {
            while(accString.includes(subString)) {
                deviation += dev;
                multiplier *= mul;
                accString = accString.replace(subString, '');
            }
        }
        parseAccidental('flat', -1, 1);
        parseAccidental('sharp', 1, 1);
        parseAccidental('natural', 0, 1);
        parseAccidental('#', 1, 1);
        parseAccidental('double', 0, 2);
        parseAccidental('triple', 0, 3);
        parseAccidental('half', 0, 0.5);
        parseAccidental('x', 2, 1);
        parseAccidental('n', 0, 1);
        parseAccidental('b', -1, 1);
        parseAccidental('d', -0.5, 1);
        parseAccidental('-', -0.5, 1);
        parseAccidental('+', 0.5, 1);

        deviation *= multiplier;
        if (accString != '' && accString != '()') {
            console.error(`Warning: Accidental '${acc}' parsed as ${deviation} semitones`);
        }
    }
    const glyphs = lib.smufl.accidental;
    if (deviation in glyphs) {
        return {
            glyph: glyphs[deviation],
            deviation
        }
    }
    else {
        console.error(`No glyph found for accidental deviation ${deviation}`);
    }
}

const pitchClassDef = {
    'C': {
        pitch_class: 0,
        deviation: 0
    },
    'Cb': {
        pitch_class: 0,
        deviation: -1
    },
    'C#': {
        pitch_class: 1,
        deviation: 1
    },
    'Db': {
        pitch_class: 1,
        deviation: -1
    },
    'D': {
        pitch_class: 2,
        deviation: 0
    },
    'D#': {
        pitch_class: 3,
        deviation: 1
    },
    'Eb': {
        pitch_class: 3,
        deviation: -1
    },
    'E': {
        pitch_class: 4,
        deviation: 0
    },
    'Fb': {
        pitch_class: 4,
        deviation: -1
    },
    'F': {
        pitch_class: 5,
        deviation: 0
    },
    'E#': {
        pitch_class: 5,
        deviation: 1
    },
    'F#': {
        pitch_class: 6,
        deviation: 1
    },
    'Gb': {
        pitch_class: 6,
        deviation: -1
    },
    'G': {
        pitch_class: 7,
        deviation: 0
    },
    'G#': {
        pitch_class: 8,
        deviation: 1
    },
    'Ab': {
        pitch_class: 8,
        deviation: -1
    },
    'A': {
        pitch_class: 9,
        deviation: 0
    },
    'A#': {
        pitch_class: 10,
        deviation: 1
    },
    'Bb': {
        pitch_class: 10,
        deviation: -1
    },
    'B': {
        pitch_class: 11,
        deviation: 0
    },
    'Cb': {
        pitch_class: 11,
        deviation: -1
    }
}

function pitchStringDef(pitch, keySigArray = []) {
    if (typeof(pitch) == 'string') {
        const octave = Number(pitch.replace(/[^0-9]/g, ''));
        const pitchClass = pitch.replace(/[0-9]/g, '');
        if (pitchClass in pitchClassDef && !isNaN(octave)) {
            return {
                pitch: (octave + 1) * context.repeat_interval + pitchClassDef[pitchClass].pitch_class,
                deviation: pitchClassDef[pitchClass].deviation
            }
        }
    }

    // search for best match for accidental in case it's not defined
    if (!isNaN(pitch)) {
        const midiPitch = Math.round(Number(pitch) / context.step_size) * context.step_size;
        const pitchClass = (midiPitch + context.repeat_interval) % context.repeat_interval;
        let key = [...context.mode_scale];
        let keySharpness = 0; // sum of all accidentals in keysig
        // check if pitch class is included in keysig, if exists, return
        // at the same time build key array
        for (const val of keySigArray) {
            if (val.pitch_class == pitchClass) {
                return {
                    pitch: midiPitch,
                    deviation: val.accidental
                }
            }
            const whiteKeyPitchClass = (val.pitch_class - val.accidental + context.repeat_interval) % context.repeat_interval;
            key[whiteKeyPitchClass/context.step_size] = null;
            key[val.pitch_class/context.step_size] = val.accidental;
            keySharpness += val.accidental;
        }
        // otherwise check if pitch class is in the key
        if (key[pitchClass/context.step_size] !== null) {
            return {
                pitch: midiPitch,
                deviation: key[pitchClass]
            }
        }
        // check if it's a white key (natural)
        if (context.mode_scale[pitchClass/context.step_size] == 0) {
            return {
                pitch: midiPitch,
                deviation: 0
            }
        }
        // otherwise if it's a black key, follow key sig sharpness
        let tempDeviation = 0;
        //console.log('next key', context.mode_scale[(pitchClass - tempDeviation + context.repeat_interval) % context.repeat_interval / context.step_size])
        while (context.mode_scale[(pitchClass - tempDeviation + context.repeat_interval) % context.repeat_interval / context.step_size] === null) {
            tempDeviation += Math.sign(keySharpness) * context.step_size;
        }
        return {
            pitch: midiPitch,
            deviation: tempDeviation
        }
    }

    // can be defined in JSON format
    else if (typeof(pitch) == 'object') {
        if ('pitch' in pitch && 'deviation' in pitch) {
            return {
                pitch: pitch.pitch,
                deviation: pitch.deviation
            }
        }
    }

    else {
        console.error(`Note pitch '${pitch}' not identified.`);
        return null;
    }
}

function findStaffLevelForPitchClass(pitch_class, staff_level_pitch_list, accidental, findBestMatch, centroid) {
    let match;
    const matchClass = pitch_class - accidental.deviation;
    for (sl in staff_level_pitch_list) {
        if ((staff_level_pitch_list[sl] - matchClass) % context.repeat_interval == 0) {
            // for note calculation, no best match needed
            if (!findBestMatch) return Number(sl);
            // if not previously matched
            else if (match === undefined) {
                match = Number(sl);
            }
            else {
                // prioritize staff levels closest to centroid
                if (Math.abs(Number(sl)-centroid) < Math.abs(match-centroid)) {
                    match = Number(sl);
                }
            }
        }
    }
    // if no staff level found
    if (match === undefined) {
        console.error(`Pitch to Staff Level: No match found for pitch class ${pitch_class}`)
        return null;
    }
    else return match;
}

/**
 * 
 * @param {Object} staff_view
 * @returns pitch for every staff level in range, in format { staff_level: pitch, ... }
 */
function clefToPitchContext(staff_view) {
    let returnObj = {};
    let clefPitch, clefStaffLevel;
    if (Array.isArray(staff_view.clef) && Array.isArray(staff_view.clef_anchor)) {
        clefPitch = clefDef[staff_view.clef[0]].pitch;
        clefStaffLevel = staff_view.clef_anchor[0] * 2;
    }
    else {
        clefPitch = clefDef[staff_view.clef].pitch;
        clefStaffLevel = staff_view.clef_anchor * 2;
    }
    let maxStaffLevel, staffLine;
    try {
        staffLine = JSON.parse(staff_view.staff_line);
    }
    catch(e) {
        staffLine = staff_view.staff_line;
    }
    if (staff_view.clef == 'C') { //special case
        maxStaffLevel = Math.max.apply(null, staffLine) * 2;
    }
    else {
        maxStaffLevel = Math.max.apply(null, staffLine) * 2 + 1;
    }
    let minStaffLevel = Math.min.apply(null, staffLine) * 2 - 1;

    returnObj[clefStaffLevel] = clefPitch;
    minStaffLevel = Math.min(clefStaffLevel, minStaffLevel);
    maxStaffLevel = Math.max(clefStaffLevel, maxStaffLevel);
    let currentPitch = clefPitch;
    for (let i = clefStaffLevel + 1; i <= maxStaffLevel; i++) {
        currentPitch += context.step_size;
        while (context.mode_scale[(currentPitch % context.repeat_interval) / context.step_size] === null) {
            currentPitch += context.step_size;
        }
        returnObj[i] = currentPitch;
    }
    currentPitch = clefPitch;
    for (let i = clefStaffLevel - 1; i >= minStaffLevel; i--) {
        currentPitch -= context.step_size;
        while (context.mode_scale[(currentPitch % context.repeat_interval) / context.step_size] === null) {
            currentPitch -= context.step_size;
        }
        returnObj[i] = currentPitch;
    }
    return returnObj;
}

/**
 * Called by childViewParamsToData in StaffClef.js
 * 
 * @param {Element} staff_element 
 * @param {Number} staff_level can be a float, retrieved from mouse position
 */
function staffLevelToPitch(staff_element, staff_level) {
    const clefPitch = clefDef[staff_element.dataset.clef].pitch;
    const clefStaffLevel = Number(staff_element.dataset.clef_anchor) * 2;
    const staffLevelOffset = staff_level - clefStaffLevel;
    let pitch = clefPitch + staffLevelOffset * context.repeat_interval / context.mode_steps;
    pitch = Math.round(pitch / context.input_step_size) * context.input_step_size;

    return pitch;
}

/**
 * Called by display in StaffClef.js
 * @param {Object} staff_view 
 * @returns {Array} drawsocket group for key signature display
 */
function keySignatureDisplay(staff_view, x_offset, staff_line_spacing) {
    let svgGroup = {
        new: 'g',
        class: 'StaffClef-key_signature-group',
        id: `${staff_view.id}-key_signature-group`,
        child: []
    };

    if (staff_view.key_signature == 'none' || staff_view.key_signature == 'C' || staff_view.key_signature == 'Am') return svgGroup;

    const keySigArray = keySignatureDef(staff_view.key_signature);
    const clefStaffLevel = (staff_view.clef_anchor[0] || staff_view.clef_anchor) * 2;
    const clefCentroid = clefStaffLevel + clefDef[staff_view.clef].key_signature_centroid[keySigArray[0].accidental];
    const accidentalSpacing = staff_line_spacing;
    const staffLevelPitchList = clefToPitchContext(staff_view);
    keySigArray.forEach((obj, ind) => {
        svgGroup.child.push({
            new: 'text',
            class: 'StaffClef-key_signature Global-musicFont',
            id: `${staff_view.id}-key_signature-${ind}`,
            x: x_offset + ind * accidentalSpacing,
            y: staff_view.y - staff_line_spacing / 2 * findStaffLevelForPitchClass(obj.pitch_class, staffLevelPitchList, accidentalDef(obj.accidental), true, clefCentroid),
            child: accidentalDef(obj.accidental).glyph
        });
    });

    return svgGroup;
}

function noteValueToGlyph(value) {
    const maxDots = 6;
    let noteHead;
    let stemVisible = false;
    let beams = 0;
    let dots = 0;
    let currentValue;
    if (value >= 16 || value <= 0) {
        console.log('Note value invalid:',value);
    }
    else if (value >= 8) {
        noteHead = 'doubleWhole';
        currentValue = 8;
    }
    else if (value >= 4) {
        noteHead = 'whole';
        currentValue = 4;
    }
    else {
        stemVisible = true;
        if (value >= 2) {
            noteHead = 'half';
            currentValue = 2;
        }
        else {
            noteHead = 'black';
            currentValue = 1;
            while (value < currentValue) {
                currentValue /= 2;
                beams++;
            }
        }
    }
    // add dots
    let dotValue = currentValue;
    while (value > currentValue && dots < maxDots) {
        dotValue /= 2;
        currentValue += dotValue;
        dots++;
    }

    return {
        noteHead,
        stemVisible,
        beams,
        dots
    }
}

function restValueToGlyph(value) {
    const maxDots = 6;
    let glyph = '';
    let dots = 0;
    let currentValue = 32;
    if (value > 32 || value <= 0) {
        console.log('Note value invalid:',value);
    }
    while (value < currentValue && currentValue >= 1/256) {
        currentValue /= 2;
        glyph = currentValue;
    }
    // add dots
    let dotValue = currentValue;
    while (value > currentValue && dots < maxDots) {
        dotValue /= 2;
        currentValue += dotValue;
        dots++;
    }

    return {
        glyph,
        dots
    }
}

/**
 * Called by childDataToViewParams in StaffClef.js, returns note view params y, accidental
 * 
 * @param {Element} staff_element 
 * @param {Object} rest_data 
 */
 function restDataToViewParams(staff_element, rest_data, staffLineSpacing) {

    // rhythm
    const value = rest_data.value;
    const restDisplay = restValueToGlyph(value);
    const glyph = lib.smufl.rest[restDisplay.glyph];
    const dots = restDisplay.dots;
    return {
        glyph,
        dots,
    }
}
/**
 * Called by childDataToViewParams in StaffClef.js, returns note view params y, accidental
 * 
 * @param {Element} staff_element 
 * @param {Object} note_data 
 */
 function noteDataToViewParams(staff_element, note_data, staffLineSpacing) {
    // retrieve y from parent
    const ref = staff_element.querySelector(`.StaffClef-ref`);
    const y0 = parseFloat(ref.getAttribute('y'));

    // get pitch, determine accidental
    const keySigArray = keySignatureDef(staff_element.dataset.key_signature);
    const pitchObj = pitchStringDef(note_data.pitch, keySigArray);
    const accidental_glyph = [accidentalDef(pitchObj.deviation).glyph]; // to return

    // determine staff level (and y)
    const whitePitch = pitchObj.pitch - pitchObj.deviation; // the pitch as if with a natural, for searching staff level
    const staffLevelPitchList = clefToPitchContext(staff_element.dataset); // staff level pitches without accidentals
    const tempSL = findStaffLevelForPitchClass(pitchObj.pitch, staffLevelPitchList, pitchObj, false);
    const octaveDiff = staffLevelPitchList[tempSL] - whitePitch;
    let staffLevel;
    if (octaveDiff % context.repeat_interval == 0) {
        staffLevel = tempSL - octaveDiff / context.repeat_interval * context.mode_steps;
    }
    const y = y0 - staffLineSpacing / 2 * staffLevel; // to return

    const staffLines = JSON.parse(staff_element.dataset.staff_line);
    const maxStaffLine = Math.max.apply(null, staffLines);
    const minStaffLine = Math.min.apply(null, staffLines);
    const midStaffLevel = maxStaffLine + minStaffLine; // avg *2
    /*
    let clef;
    try {
        clef = JSON.parse(staff_element.dataset.clef);
    }
    catch(e) {
        clef = staff_element.dataset.clef;
    }
    */

    // determine stem direction
    let stem_direction;
    if (note_data.stem_direction == 'auto') {
        if (staffLevel > midStaffLevel) stem_direction = 'down';
        else stem_direction = 'up';
    }
    else stem_direction = note_data.stem_direction;

    // build ledger lines
    let ledger_line = [];
    for (let l = maxStaffLine + 1; l * 2 <= staffLevel; l++) {
        ledger_line.push(l * 2 - staffLevel); // offset from staff level
    }
    for (let l = minStaffLine - 1; l * 2 >= staffLevel; l--) {
        ledger_line.push(l * 2 - staffLevel);
    }

    // accidental visibility
    let accidental_visible;
    if (note_data.accidental_visible != 'auto') accidental_visible = note_data.accidental_visible;
    // process when 'auto'
    else {
        let currentStaffLevelPitch = whitePitch;
        for (keyObj of keySigArray) {
            // match white pitch to key signature pitch class
            if ((whitePitch - keyObj.pitch_class + keyObj.accidental) % context.repeat_interval == 0) {
                currentStaffLevelPitch += keyObj.accidental;
                break;
            }
        }
        // iterate notes before current
        function iterateAccidentals(el) {
            const children = el.querySelector('.contents').children;
            for (let i = 0; i < children.length; i++) {
                if (children[i].id == note_data.id) return; // if note already exists
                if (children[i].classList[0] == 'Note') {
                    const noteHead = children[i].querySelector('.Note-note_head');
                    if (noteHead.getAttribute('y') == y) {
                        currentStaffLevelPitch = pitchStringDef(children[i].dataset.pitch, keySigArray).pitch;
                    }
                }
                else if (children[i].classList[0] == 'RhythmGroup') iterateAccidentals(children[i]);
            }
        }
        iterateAccidentals(staff_element);

        // finally, check if current accidental is same
        if (currentStaffLevelPitch == pitchObj.pitch) accidental_visible = false;
        else accidental_visible = true;
        
    }

    // rhythm
    const value = note_data.value;
    const noteDisplay = noteValueToGlyph(value);
    let stem_visible;
    if (note_data.stem_visible == 'auto') {
        stem_visible = noteDisplay.stemVisible;
    }
    else {
        stem_visible = note_data.stem_visible;
    }
    const beams = noteDisplay.beams;
    const note_head_glyph = lib.smufl.noteHead[note_data.note_head_family][noteDisplay.noteHead];
    const dots = noteDisplay.dots;
    const dots_displace = (staffLevel % 2 == 0);
    return {
        y,
        accidental_glyph,
        accidental_visible,
        stem_direction,
        stem_visible,
        beams,
        dots,
        dots_displace,
        ledger_line,
        note_head_glyph
    }
}

module.exports = {
    pitchClassDef,
    clefDef,
    clefAlternativeDef,
    keySignatureDef,
    accidentalDef,
    noteDataToViewParams,
    restDataToViewParams,
    staffLevelToPitch,
    keySignatureDisplay
}

/***/ }),

/***/ 629:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./24EDO": 298,
	"./24EDO.js": 298
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 629;

/***/ }),

/***/ 20:
/***/ ((module) => {

"use strict";

/**
 * Methods called from Controller:
 * 
 * class
 * palette
 * paletteSelected
 * getPaletteIcon
 * fromData
 * editMode
 * selected
 * applyTransformToData
 * currentContext
 * updateAfterContents
 * drag
 * getInfoDisplay
 */


class SymbolBase
{
    constructor()
    {
        this.class = "template";
        this.palette = [];
        this.m_mode = '';
        this.mouseListening = false;
    }
    

    get structs () {
        return {

            data: {
                class: this.class,
                id : `${this.class}-0`,
                time: 0
            },
            
            view: {
                class: this.class,
                id: `${this.class}-0`, 
                x: 0,
                y: 0,
                text: "undefined"
            },

            

            /*
            // container symbols define the parameters they map here
            childStructs: {
                data: {
                    time: 0
                },
                view: {
                    x: 0
                }
            }
            */
        }
    }


    /**
     * internal method called when drawing
     * maps view parameters to drawing commands
     * 
     * returns drawsocket object
     * 
     * @param {Object} params 
     */
    display(params) { 
        console.error(`${this.class} display is undefined`);

        ui_api.hasParam(params, Object.keys(this.structs.view) );
        
        return {
            new: "text",
            id: `${params.id}-undefined`,
            class: "template",
            x: params.x,
            y: params.y,
            text: "undefined symbol"
        }

    }
    


    /**
     * internal method, should be re-defined in subclass
     * 
     * gets viewParams from element
     * 
     * @param {Element} element the symbol SVG/HTML element to parse to view params
     * 
     * 
     */
    getElementViewParams(element) { 
        console.error(`${this.class} getElementViewParams is undefined`);

        const textEl = element.querySelector('text');
        
        return {
            id: element.id,
            x: parseFloat(textEl.getAttribute('x')),
            y: parseFloat(textEl.getAttribute('y')),
            text: textEl.innerHTML
        }
    }

    /**
     * API function called from controller
     * 
     */
    getPaletteIcon () { 
        console.error(`${this.class} getPaletteIcon is undefined`);

        return {
            key: "svg",
            val: this.display({
                id: `template-palette-icon`,
                class: this.class,
                x: 10,
                y: 10,
                text: "template"
            })
        }

    }
    


    /**
     * API function called from controller to draw new data objects
     * also used internally
     * 
     * @param {Object} dataObj 
     * @param {Element} container 
     * @param {Boolean} preview -- optional flag to draw as sprite overlay and draw data text
     * 
     */
    fromData(dataObj, container, preview = false)
    {
        //console.log('template fromData', container, dataObj);
        // merging with defaults in case the user forgot to include something
        const data_union = {
            ...this.structs.data,
            ...dataObj
        };
        
        const viewParams = this.dataToViewParams(data_union, container);
        
        const viewObj = this.display(viewParams);        
        
        const drawObj = (preview ? 
            ui_api.svgPreviewFromViewAndData(viewObj, data_union) : 
            ui_api.svgFromViewAndData(viewObj, data_union) );

        ui_api.drawsocketInput( drawObj );

        if( !preview ) {
            let outObj = {};
            outObj[dataObj.id] = viewParams;
            ui_api.outlet({ viewParams: outObj });
        }

    }


    /**
     * internal mapping function data->viewParams
     * 
     * @param {Object} data 
     * @param {Element} container 
     * 
     * @returns object of view params
     * 
     */
    dataToViewParams(data, container)
    {
        const parentDef = ui_api.getDefForElement(container);
        //console.log('dataToViewParams', data, container);

        return {
            ...this.structs.view, // defaults
            ...ui_api.filterByKeys(data, Object.keys(this.structs.view) ), // gets view values that might in the data
            ...parentDef.childDataToViewParams(container, data),
            
            // other mappings that the parent doesn't know about might be added here

            id: data.id,
            container: data.container // set container/parent id
        }
     
    /**
     * note: This template prototype works only for child objects, the top level element object 
     * is the application which has no built in knowledge of time, duration etc. and so the 
     * childToViewParameters function will not apply the mapping. In the case of top-level symbols,
     * you will need to create your own mapping and put it in the dataToViewParams function
     */

    }


    /**
     * internal mapping function viewParams->data
     * 
     * @param {Object}  viewParams 
     * @param {Element} container
     * @param {Event}   event (optional) include the mouse event for mode handling
     * 
     * returns data object
     * 
     * note that the view params should be able to generate a data object from the view params without access to the element dataset.
     * in some cases, this menas that drawing coeficients need to be pulled in the getElementViewParams function
     * 
     */
    viewParamsToData(viewParams, container, event = null)
    {
        const parentDef = ui_api.getDefForElement(container);

        return {
            ...this.structs.data, // defaults
            ...ui_api.filterByKeys(viewParams, Object.keys(this.structs.data) ), // gets data values that might in the view
            ...parentDef.childViewParamsToData(container, viewParams, event),

            // other mappings that the parent doesn't know about might be added here

            class: this.class, // overwrite the classname, since we don't want symbol or selected etc.
            container: container.id // set container/parent id
        }
    }


    /**
     * 
     * Called by child objects using the template
     * the parent/container object supplies a mapping from view params to data
     * 
     * @param {Element} this_element instance of this element
     * @param {Object} child_viewParams child data object, requesting information about where to put itself
     * @param {Event}   event (optional) include the mouse event for mode handling
     */
    childViewParamsToData(this_element, child_viewParams, event = null) {
        const this_element_container = ui_api.getContainerForElement(this_element);
        const parentDef = ui_api.getDefForElement(this_element_container);
        return parentDef.childViewParamsToData(this_element_container, child_viewParams, event);
        
        // by default pass on to the parent, since we don't have anything to add
        // the top level will return the child's data fully
    }


     /**
     * 
     * Called by child objects using the template
     * the parent/container object supplies a mapping from data to view params
     * 
     * @param {Element} this_element instance of this element
     * @param {Object} child_data child data object, requesting information about where to put itself
     * 
     */
    childDataToViewParams(this_element, child_data) {
        const this_element_container = ui_api.getContainerForElement(this_element);
        const parentDef = ui_api.getDefForElement(this_element_container);
        return parentDef.childDataToViewParams(this_element_container, child_data);
        // by default pass on to the parent, since we don't have anything to add
        // the top level will return the child's data fully
    }

    /**
     * 
     * API function called from controller
     * 
     * @param {Element} element 
     * 
     * called after child object has been added from the score
     * in order to adjust drawing of the container element
     * 
     */
    updateAfterContents( element ) {}

  
    /**
     * 
     * API function called from controller
     * 
     * @param {Object} dataObj 
     * 
     * called from controller in dataToView as a for containers to decide
     * which of it's kind should be the context in case there are more than one
     * 
     */
    getContainerForData(dataObj)
    {
        return document.getElementById(dataObj.container);
    }

    /**
     * API function called from controller
     * called when the user hits [i] when selecting an object
     * 
     * @param {HTML or SVG Element} viewElement element that is being viewed
     * 
     * @returns drawsocket format object(s) to draw
     */
    getInfoDisplay( viewElement )
    {
       // console.log('getInfoDisplay', viewElement );
        ui_api.drawsocketInput(
            ui_api.makeDefaultInfoDisplay(viewElement)
        )
        
    }

    /**
     * 
     * API function called from info panel
     * on update
     * 
     * @param {Element} element element to use for update
     * 
     * called from info panel edit boxes -- the datset is used to update the graphics
     */
    updateFromDataset(element)
    {
        const container = ui_api.getContainerForElement(element);        
        let data = ui_api.getElementData(element, container);
     
        //console.log(element.id, 'updateFromDataset', data);

        this.fromData(data, container);

        // update data 
        ui_api.sendToServer({
            key: "data",
            val: data
        })

        let contents = element.querySelector('.contents');
        let children = contents.children;
        //console.log(element.id, 'contents', children);

        for( let i = 0; i < children.length; i++)
        {
            const child_def = ui_api.getDefForElement(children[i]);
            child_def.updateFromDataset(children[i]);
        }

    }

    /**
     * 
     * internal method
     * called from createNewFromMouseEvent and mousemove in palette mode
     * 
     * @param {Event} event 
     * @param {Element} container 
     */
    mouseToData( event, container )
    {
        const pt = ui_api.getSVGCoordsFromEvent(event);
        const parent_def = ui_api.getDefForElement(container);

        if( !parent_def )
        {
            console.error(`could not find def for container ${container}`);
        }

        return {
            ...this.structs.data, // set defaults, before overwriting with parent's mapping
            ...parent_def.childViewParamsToData(container, 
                {
                    ...this.structs.view, //get defaults
                    ...pt
                }, 
                event ), 
            id: `${this.class}_u_${ui_api.fairlyUniqueString()}`,
            container: container.id
        }    
    }


    /**
     * (internal method)
     * called when new instance of this object is created by a mouse down event
     * 
     * @param {Event} event mouse event from click
     * 
     * returns new view object in drawsocket format, to be drawn
     * 
     * 
     */
    creatNewFromMouseEvent(event)
    {

        // remove preview sprite
        ui_api.drawsocketInput({
            key: "remove", 
            val: `${this.class}-sprite`
        })

        // generate objectData from Mouse Event
        const container = ui_api.getCurrentContext();
        let data =  this.mouseToData(event, container);
        
        this.fromData(data, container);

        // send new object to server
        ui_api.sendToServer({
            key: "data",
            val: data
        })

        return data;
    }

    /**
     * (internal method)
     * 
     * @param {Event} event mouse event
     * 
     */
    mousemove(event)
    {
        if( event.metaKey && this.m_mode == "palette" )
        {
            // preview of mouse down creation
            const container = ui_api.getCurrentContext();
            let data = this.mouseToData(event, container);
            this.fromData( data, container, true); // sets preview flag to true
        }

    }



    /**
     * API function called from controller
     * 
     * @param {Element} element html/svg element to translate
     * @param {Event} event mouse event, with added delta_pos x/y point
     * 
     * return true to use default translation
     * return false to use custom translation 
     */
    drag(element, event = { delta_pos: {x:0, y:0} } ) 
    {
        if( this.m_mode == "edit" )
        {
            //console.log('drag in edit mode');
        }
        else
        {
         //   console.log('drag in mode', this.m_mode);

            // maybe rename... sets translation in transform matrix, but doesn't apply it
            ui_api.translate(element, event.delta_pos);

            let viewParams =  this.getElementViewParams(element);

            // this can be resused in most cases
            // if x and y are in the viewParams
            viewParams.x += event.delta_pos.x;
            viewParams.y += event.delta_pos.y;

            let container = ui_api.getContainerForElement(element);
            let data = this.viewParamsToData(viewParams, container, event);

            ui_api.drawsocketInput(
                ui_api.getDataTextView(data)
            )
        }

       
        return true; // return true if you are handling your own translation
    }

    /**
     * 
     * API function called from controller
     * on mouseup after drag
     * 
     * @param {SVG/HTMLElement} element 
     */
    applyTransformToData(element)
    {
        ui_api.applyTransform(element);

        let viewParams =  this.getElementViewParams(element);
        let container = ui_api.getContainerForElement(element);
        let data =  this.viewParamsToData(viewParams, container);

        ui_api.drawsocketInput({
            key: "svg",
            val: ui_api.dataToHTML(data)
        })

        // send out
        ui_api.sendToServer({
            key: "data",
            val: data
        })

        return true; // << required if defined

    }


    /**
     * 
     * API function called from controller
     * when user selects a symbol
     * 
     * @param {SVG/HTMLElement} element 
     * @param {Boolean} state notifications on selection and deselection
     *  
     */
    selected(element, state)
    {
        console.log('select state', state);
        // return true if you want to disable the default selection
    }

    
    mouseListeners(enable = false )
    {
        if( enable && !this.mouseListening )
        {
            window.addEventListener("mousedown",    this, false );
            window.addEventListener("mousemove",    this, false );
            window.addEventListener("mouseup",      this, false);
            window.addEventListener("keydown",      this, false);
            window.addEventListener("keyup",        this, false);

            this.mouseListening = true;
        }
        else
        {
            ui_api.removeSprites();
            window.removeEventListener("mousedown",     this, false);
            window.removeEventListener("mousemove",     this, false);
            window.removeEventListener("mouseup",       this, false);
            window.removeEventListener("keydown",       this, false);
            window.removeEventListener("keyup",         this, false);
            this.mouseListening = false;
        }
    }

    /**
     * 
     * API function called from controller
     * 
     * @param {Boolean} enable called when entering  "palette" or  "edit"  mode
     * 
     * creation mode starts when the symbol is sected in the palette
     * edit mode is when the symbols is when one symbol is selected (or when you hit [e]?)
     */
    paletteSelected( enable = false ) 
    {

        if( enable )
        {
            this.m_mode = 'palette';
            this.mouseListeners(enable);
        }
        else
        {
            this.m_mode = 'exited palette';
            this.mouseListeners(enable);
        }
    }

    
    /**
     * 
     * (internal method)
     * 
     * handleEvents is a default JS method for handling mouse events
     * 
     * @param {Event} e mouse event
     * 
     * routes and handles events by type, 
     * and program logic
     * 
     * currently only used in palette mode but could be used in other 
     * cases
     * 
     */
    handleEvent(e) {
        switch(e.type)
        {
            case 'keyup':
                if( e.key == "Meta" ){
                    ui_api.removeSprites();
                    console.log('na?');
                }
            break;
            case 'mousedown':
                if( e.metaKey ){
                    this.creatNewFromMouseEvent(e);
                }
            break;
            case 'mousemove':
                this.mousemove(e);
            break;

        }

    }

    /**
     * 
     * API function called from controller
     * when user hits the [e] button
     * 
     * here we are only setting the status
     * the implementation is in the subclasses
     * 
     * @param {SVG/HTML Element} element 
     * @param {Boolean} enable 
     */
    editMode( element, enable = false )
    {
        if( enable )
        {
            this.m_mode = 'edit';
            this.mouseListeners(enable);
        }
        else
        {
            this.m_mode = 'exited edit';
            this.mouseListeners(enable);
        }

        return true; 
        // return true in subclass
        // otherwise edit mode is not set in the controller
    }


    /**
     * 
     * API function called from controller
     * when user hits the [e] button
     * 
     * here we are only setting the status
     * the implementation is in the subclasses
     * 
     * @param {SVG/HTML Element} element 
     * @param {Boolean} enable 
     */
    currentContext( element, enable = false ) 
    {
        console.log(this.class, " is context ", enable);
        if( enable )
        {
            this.m_mode = 'context';
        }
        else
        {
            this.m_mode = "exited context";
        }
    }

}


class IO_SymbolBase
{
    constructor() {
        this.class = "template"
    }

    /**
     * 
     * API function called from controller
     * 
     * @param {Object} a 
     * @param {Object} b 
     * 
     * comparator for sorting instances of this class type (rectangleStave)
     */
    comparator (a, b) {
        return (a.time < b.time ? -1 : (a.time == b.time ? 0 : 1))
    }


    /**
      *
      * API function called from controller
      *  
      * @param {Object} dataObj data object that has been looked up
      * 
      * script here is called when looking up symbols, and potentially could respond with
      * generative values in realtime
      * 
      */
    lookup( params, obj_ref )
    {
        const start = obj_ref.time;
        const end = start + obj_ref.duration;
        if( start <= params.time && end >= params.time )
        {

            params.phase = (params.time - start) / obj_ref.duration;
            let ret = [{
                ...obj_ref,
                phase: params.phase
            }];


            if( typeof obj_ref.contents != "undefined" )
            {
                obj_ref.contents.forEach( obj => {
                    const def = io_api.defGet(obj.class);
                    const event = def.lookup(params, obj);
                    if( event )
                    {
                        ret.push(event);
                    }
                });
            
            }

            return ret;
        }

        return null;
    }


    default_container_lookup( params, obj_ref )
    {
        let ret = [];

        if( typeof obj_ref.contents != "undefined" )
        {
            obj_ref.contents.forEach(obj => {
                const def = io_api.defGet(obj.class);
                const event = def.lookup(params, obj);
                if( event )
                {
                    ret.push(event);
                }
            });
        
        }
        else
        {
            ret = {
                lookup_error: `no contents element with id "${obj_ref.contents}" found`
            };
        }

        let ret_obj = {};
        ret_obj[obj_ref.id] = ret;
        
        return ret_obj;
    }


    /**
     * 
     * API function called from controller
     * 
     * @param {*} params 
     * @param {*} obj_ref 
     */
    getFormattedLookup(params, obj_ref)
    {
        console.error('getFormattedLookup not defined for class', this.class, 'using default');
        return obj_ref;
    }

    default_container_getFormattedLookup(params, obj_ref )
    {
        let ret_by_type = {};

        if( typeof obj_ref.contents != "undefined" )
        {
            obj_ref.contents.forEach(obj => {
                const def = io_api.defGet(obj.class);
                if( typeof ret_by_type[obj.class] == "undefined" ){
                    ret_by_type[obj.class] = {};
                }

                const event = def.getFormattedLookup(params, obj);
                if( event )
                {
                    Object.keys(event).forEach( k => {

                        if( typeof ret_by_type[obj.class][k] == "undefined" ){
                            ret_by_type[obj.class][k] = [];
                        }

                        ret_by_type[obj.class][k].push(event[k]);
                    })
                }
            });
        
        }
        else
        {
            ret_by_type = {
                lookup_error: `no contents element with id "${obj_ref.contents}" found`
            };
        }

        let ret_obj = {};
        ret_obj[obj_ref.id] = ret_by_type;
        
        return ret_obj;
    }
    
}

module.exports = {
    SymbolBase,
    IO_SymbolBase
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(489);
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;