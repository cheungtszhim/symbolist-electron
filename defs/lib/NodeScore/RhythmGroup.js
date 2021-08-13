const Template = require('../SymbolTemplate');
const lib = require('./NodeScoreLib');


class RhythmGroup extends Template.SymbolBase 
{
    constructor() {
        super();
        this.class = 'RhythmGroup';
        this.palette = ['Note'];
    }


    get structs () {
        return {

            data: {
                class: this.class,
                id : `${this.class}-0`,
                tuplet: 'none',
                stem_direction: 'auto'
            },
            
            view: {
                class: this.class,
                id: `${this.class}-0`,
                x: 100,
                y: 100,
                tuplet_number: 'none',
                stem_direction: 'auto'
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
            new: 'circle',
            class: 'RhythmGroup-ref',
            id: `${params.id}-ref`,
            cx: params.x,
            cy: params.y
        });
        /*
        if (params.beam_start_x) {
            // test beam
            returnArray.push({
                new: 'line',
                class: 'RhythmGroup-beam',
                id: `${params.id}-beam-test`,
                x1: params.beam_start_x,
                y1: params.beam_start_y,
                x2: params.beam_end_x,
                y2: params.beam_end_y
            });
        }
        */
        
        return returnArray;
    }
    
    getElementViewParams(element) {
        const ref = element.querySelector(`.RhythmGroup-ref`);
        
        const x = parseFloat(ref.getAttribute('cx'));
        const y = parseFloat(ref.getAttribute('cy'));
        return {
            id: element.id,
            x,
            y
        }
    }

    getPaletteIcon() {
        return {
            key: 'svg',
            val: {
                new: 'text',
                class: `${this.class}-palette_icon`,
                id: `${this.id}-palette_icon`,
                x: 20,
                y: 20,
                child: 'G'
            }
        }
    }

    childDataToViewParams(this_element, child_data) {
        if (child_data.class == 'Note') {

            // initialize x, start from the right of timeSig/clefKey if visible
            let x;
            /*
            let measure_element = ui_api.getContainerForElement(this_element);
            //console.log('Measure class', measure_element.classList);
            while (measure_element.classList[0] != 'Measure') {
                measure_element = ui_api.getContainerForElement(measure_element);
            }
            //console.log('Measure element:', measure_element);
            const timeSigGroup = measure_element.querySelector('.Measure-timeSig-group');
            */
            let staff_element = this_element;
            while (staff_element.classList[0] != 'StaffClef') {
                staff_element = ui_api.getContainerForElement(staff_element);
            }
            /*
            const clefKeyGroup = staff_element.querySelector('.StaffClef-clef_key-group');
            //console.log('Staff element:', staff_element);
            */
            const children = this_element.querySelector('.contents').children;
            const ref = this_element.querySelector('.RhythmGroup-ref');
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
            else if (ref) {
                x = parseFloat(ref.getAttribute('cx'));
            }
            else {
                x = this.getElementViewParams(this_element).x;
            }
            const keyMap = require(`./key_maps/${staff_element.dataset.key_map}`);
            const fromKeyMap = keyMap.noteDataToViewParams(staff_element, child_data, lib.fontSize / 4);

            //let stem_direction = child_data.stem_direction;
            //if (stem_direction == 'auto') stem_direction = this_element.dataset.stem_direction;
            return {
                ...fromKeyMap, // y, accidental_glyph, accidental_visible, stem_direction, ledger_line, note_head_glyph
                x
            }
        }
    }

    childViewParamsToData(this_element, child_viewParams) {
        let staff_element = this_element;
        while (staff_element.classList[0] != 'StaffClef') {
            staff_element = ui_api.getContainerForElement(staff_element);
        }
        const keyMap = require(`./key_maps/${staff_element.dataset.key_map}`);
        const yCenter = this.getElementViewParams(this_element).y;
        const staffLevelSpacing = lib.fontSize / 8;
        const staffLevel = (yCenter - child_viewParams.y) / staffLevelSpacing;

        const pitch = keyMap.staffLevelToPitch(staff_element, staffLevel);
        return { pitch }
    }

    
    updateAfterContents (element) {
        const children = element.querySelector('.contents').children;
        const l = children.length;
        //const noteDef = ui_api.getDef('Note');
        let stem_direction = element.dataset.stem_direction;
        const refElement = element.querySelector('.RhythmGroup-ref');
        const refY = parseFloat(refElement.getAttribute('cy'));
        let drawArray = [];
        if (l > 1) {
            // hide ref if there are contents
            refElement.setAttribute('display', 'none');

            let beamArray = [];
            let leftXArray = [];
            let rightXArray = [];
            let yArray = [];

            // determine beam stem direction if auto
            if (stem_direction == 'auto') {
                let count_direction = 0;
                    for (let i = 0; i < l; i++) {
                        if (children[i].dataset.stem_direction == 'auto') break;
                        else if (children[i].dataset.stem_direction == 'up') count_direction++;
                        else if (children[i].dataset.stem_direction == 'down') count_direction--;
                    }
                    if (count_direction > 0) stem_direction = 'up';
                    else if (count_direction < 0) stem_direction = 'down';
                    // else if == 0, kept as 'auto'
            }

            // collect note info
            for (let i = 0; i < l; i++) {
                //console.log(`children ${i}: `, children[i]);
                if (children[i].classList[0] == 'Note') {
                    // beam number array
                    const flagGroup = children[i].querySelector('.Note-flag-group');
                    beamArray.push(parseFloat(flagGroup.dataset.num_beams));
                    // notehead y left right
                    const noteHead = children[i].querySelector('.Note-note_head');
                    const noteHeadBBox = ui_api.getBBoxAdjusted(noteHead);
                    leftXArray.push(noteHeadBBox.left);
                    rightXArray.push(noteHeadBBox.right);
                    const noteHeadY = parseFloat(noteHead.getAttribute('y'));
                    yArray.push(noteHeadY);
                }
            }
            
            // if all notes and parent group are 'auto', here stem_direction will still be 'auto'
            // Need to change to average!
            if (stem_direction != 'down' && stem_direction != 'up') stem_direction = (Math.max.apply(this, yArray) / l < refY ? 'down' : 'up');

            // draw beams
            let beamGroup = {
                new: 'g',
                class: 'RhythmGroup-beam-group',
                id: `${element.id}-beam-group`,
                container: `${element.id}-display`,
                child: []
            };
            const maxBeams = Math.max.apply(this, beamArray);
            const staffHeight = lib.fontSize;
            const beamHalfHeight = lib.fontSize / 16;
            const stemWidth = lib.fontSize / 16;
            let stemEndArray = [];
            let startPointUp, startPointDown, endPointUp, endPointDown;
            if (stem_direction == 'up') {
                for (let i = 0; i < l; i++) {
                    stemEndArray[i] = [rightXArray[i]];
                }
                stemEndArray[0][1] = yArray[0]-staffHeight;
                stemEndArray[l-1][1] = yArray[l-1]-staffHeight;
                startPointUp = [stemEndArray[0][0]-stemWidth, stemEndArray[0][1]-beamHalfHeight];
                startPointDown = [stemEndArray[0][0]-stemWidth, stemEndArray[0][1]+beamHalfHeight];
                endPointUp = [stemEndArray[l-1][0], stemEndArray[l-1][1]-beamHalfHeight];
                endPointDown = [stemEndArray[l-1][0], stemEndArray[l-1][1]+beamHalfHeight];
            }
            else if (stem_direction == 'down') {
                for (let i = 0; i < l; i++) {
                    stemEndArray[i] = [leftXArray[i]];
                }
                stemEndArray[0][1] = yArray[0]+staffHeight;
                stemEndArray[l-1][1] = yArray[l-1]+staffHeight;
                startPointUp = [stemEndArray[0][0], stemEndArray[0][1]-beamHalfHeight];
                startPointDown = [stemEndArray[0][0], stemEndArray[0][1]+beamHalfHeight];
                endPointUp = [stemEndArray[l-1][0]+stemWidth, stemEndArray[l-1][1]-beamHalfHeight];
                endPointDown = [stemEndArray[l-1][0]+stemWidth, stemEndArray[l-1][1]+beamHalfHeight];
            }
            beamGroup.child.push({
                new: 'polygon',
                class: 'RhythmGroup-beam',
                id: `${element.id}-beam-0`,
                points: `${startPointUp} ${endPointUp} ${endPointDown} ${startPointDown}`
            });
            drawArray.push(beamGroup);

            // fill stemEndArray Y-coordinates by proportion
            for (let i = 1; i < l-1; i++) {
                const proportion = (stemEndArray[i][0] - stemEndArray[0][0]) / (stemEndArray[l-1][0] - stemEndArray[0][0]); // x proportion known
                stemEndArray[i][1] = stemEndArray[0][1] + proportion * (stemEndArray[l-1][1] - stemEndArray[0][1]);
            }

            // draw stems
            let stemGroup = {
                new: 'g',
                class: 'RhythmGroup-stem-group',
                id: `${element.id}-stem-group`,
                container: `${element.id}-display`,
                child: []
            };
            for (let i = 0; i < l; i++) {
                if (stem_direction == 'up') {
                    stemGroup.child.push({
                        new: 'rect',
                        class: 'RhythmGroup-stem',
                        id: `${element.id}-stem-${children[i].id}`,
                        x: stemEndArray[i][0]-stemWidth,
                        y: stemEndArray[i][1],
                        width: stemWidth,
                        height: yArray[i] - stemEndArray[i][1]
                    });
                }
                else if (stem_direction == 'down') {
                    stemGroup.child.push({
                        new: 'rect',
                        class: 'RhythmGroup-stem',
                        id: `${element.id}-stem-${children[i].id}`,
                        x: stemEndArray[i][0],
                        y: yArray[i],
                        width: stemWidth,
                        height: stemEndArray[i][1] - yArray[i]
                    });
                }
            }
            drawArray.push(stemGroup);

            const drawObj = {
                key: 'svg',
                val: drawArray
            }
            ui_api.drawsocketInput(drawObj);
        }

    }
    

}

class RhythmGroup_IO extends Template.IO_SymbolBase
{
    constructor()
    {
        super();
        this.class = 'RhythmGroup';
    }
    
}



module.exports = {
    ui_def: RhythmGroup,
    io_def: RhythmGroup_IO    
}

