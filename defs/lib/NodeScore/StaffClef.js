const Template = require('../SymbolTemplate');
const lib = require('./NodeScoreLib');


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
                clef_anchor: -1,
                clef_visible: 'auto',
                key_map: '24EDO',
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
                key_map: '24EDO',
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
            keyMap = require(`./key_maps/${params.key_map}`);
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
            const keyMap = require(`./key_maps/${this_element.dataset.key_map}`);
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
            const keyMap = require(`./key_maps/${this_element.dataset.key_map}`);
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
            const keyMap = require(`./key_maps/${this_element.dataset.key_map}`);
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

