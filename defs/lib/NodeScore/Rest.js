const Template = require('../SymbolTemplate');
const lib = require('./NodeScoreLib');


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

