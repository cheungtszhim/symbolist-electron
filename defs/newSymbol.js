const SymbolBase = require('../lib/symbol-template') 

class newSymbol extends SymbolBase 
{
    constructor(unused) {
        super();
        this.class = "newSymbol";
    }


    get structs () {
        return {

            data: {
                class: this.class,
                id : `${this.class}-0`,
                time: 0,
                pitch: 55
            },
            
            view: {
                class: this.class,
                id: `${this.class}-0`, 
                x: 0,
                y: 0,
                r: 2
            }
        }
    }


    display(params) {

        ui_api.hasParam(params, Object.keys(this.structs.view) );
        
        return {
            new: "circle",
            class: 'notehead',
            id: `${params.id}-notehead`,
            cx: params.x,
            cy: params.y,
            r: params.r
        }

        /**
         * note that we are returning the drawsocket def that will be 
         * displayed in the "view" group
         * the top level element of the symbol has the root id
         * so here we need to make sure that the id is different
         */

    }
    
    getElementViewParams(element) {

        const circle = element.querySelector('.notehead');
        const x = parseFloat(circle.getAttribute('cx'));
        const y = parseFloat(circle.getAttribute('cy'));
        const r = parseFloat(circle.getAttribute('r'));

        return {
            id: element.id,
            x,
            y,
            r
        }

    }


    getPaletteIcon() {
        return {
            key: "svg",
            val: this.display({
                id: `circle-palette-icon`,
                class: this.class,
                x: 10,
                y: 10,
                r: 2
            })
        }
    }


}

console.log(newSymbol);

module.exports = {
    ui_def: newSymbol
}

