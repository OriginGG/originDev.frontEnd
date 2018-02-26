
var reacterminator = require('reacterminator');
const prettydiff = require('prettydiff');
const fs = require('fs');

const component_array = [
    './scripts/html_files/test.html'
]
let p = component_array.length;
const p_array = [];
component_array.forEach((e) => {
    fs.readFile(e, (err, data) => {
        if (err) {
            throw err;
        }
        p--;
        p_array.push(data);
        if (p === 0) {
            let new_len = p_array.length;
            p_array.forEach((d) => {
                const components = reacterminator(
                    {
                        type: 'string',
                        content: d.toString()
                    },
                    {
                        generatefiles: true,
                        customize: false
                    }
                );
                for (let key in components) {
                    if (key !== 'App') {

                        const imp = `import React, { Component } from 'react'\n\n\nclass ${key} extends Component {\nrender() {\n    return(\n${components[key].jsxSnippet})}}\n\nexport default ${key}\n`;
                        const args = {
                            source: imp,
                            mode: 'beautify',
                            lang: 'jsx',
                            wrap: '0',
                            preserve: '1'

                        }
                        const output = prettydiff.api(args);
                        fs.writeFile(`./components/render_classes/${key}.js`, output[0], function (err) {
                            
                            if (err) {
                                return console.log(err);
                            }
                            new_len--;
                            if (new_len === 0) {
                                return console.log('Finished...');
                            }
                        }); 
                    }
                }

            });
            
        }
    });
});




// let gr = $.html();
// gr = gr.replace(/classname=/g, 'className=')
// gr = gr.replace(/<html>/g, '')
// gr = gr.replace(/<\/html>/g, '')
// gr = gr.replace(/<head>/g, '')
// gr = gr.replace(/<\body>/g, '')
// gr = gr.replace(/<\/body>/g, '')
// gr = gr.replace(/data-insert-props="{/g, '')
// console.log(gr);
