
var reacterminator = require('reacterminator');
const prettydiff = require('prettydiff');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs-extra')



const component_array = [
    { source_html: './src/html/SignupPageComponent.html', sub_dir: 'signup' },
    { source_html: './src/html/SignupComponent.html', sub_dir: 'signup' },
    { source_html: './src/html/SignupChoiceComponent.html', sub_dir: 'signup' },
    { source_html: './src/html/LoginComponent.html', sub_dir: 'signup' },
    { source_html: './src/html/CreateSubDomainComponent.html', sub_dir: 'signup' },

    { source_html: './src/html/dark_OrganizationAboutModalComponent.html', sub_dir: 'themes/dark_theme' },
    { source_html: './src/html/dark_OrganizationNewsModuleComponent.html', sub_dir: 'themes/dark_theme' },
    { source_html: './src/html/dark_OrganizationNewsModalComponent.html', sub_dir: 'themes/dark_theme' },
    { source_html: './src/html/dark_OrganizationPageComponent.html', sub_dir: 'themes/dark_theme' },
    { source_html: './src/html/dark_OrganizationVideoComponent.html', sub_dir: 'themes/dark_theme' },
    { source_html: './src/html/dark_OrganizationMatchesComponent.html', sub_dir: 'themes/dark_theme' },
    { source_html: './src/html/dark_OrganizationTwitterComponent.html', sub_dir: 'themes/dark_theme' },
    { source_html: './src/html/dark_OrganizationNewsComponent.html', sub_dir: 'themes/dark_theme' },
    { source_html: './src/html/dark_OrganizationSponserComponent.html', sub_dir: 'themes/dark_theme' },
    { source_html: './src/html/dark_OrganizationNavComponent.html', sub_dir: 'themes/dark_theme' },
    { source_html: './src/html/dark_OrganizationLogoComponent.html', sub_dir: 'themes/dark_theme' },
    { source_html: './src/html/dark_OrganizationMobileMenuComponent.html', sub_dir: 'themes/dark_theme' },
    { source_html: './src/html/dark_OrganizationMobileNavComponent.html', sub_dir: 'themes/dark_theme' },
    { source_html: './src/html/dark_OrganizationRosterItemComponent.html', sub_dir: 'themes/dark_theme' },
    { source_html: './src/html/dark_OrganizationRosterPageComponent.html', sub_dir: 'themes/dark_theme' },
    { source_html: './src/html/dark_OrganizationSponsersItemComponent.html', sub_dir: 'themes/dark_theme' },
    { source_html: './src/html/dark_OrganizationSponsersPageComponent.html', sub_dir: 'themes/dark_theme' },

    { source_html: './src/html/light_OrganizationAboutModalComponent.html', sub_dir: 'themes/light_theme' },
    { source_html: './src/html/light_OrganizationNewsModalComponent.html', sub_dir: 'themes/light_theme' },
    { source_html: './src/html/light_OrganizationPageComponent.html', sub_dir: 'themes/light_theme' },
    { source_html: './src/html/light_OrganizationVideoComponent.html', sub_dir: 'themes/light_theme' },
    { source_html: './src/html/light_OrganizationMatchesComponent.html', sub_dir: 'themes/light_theme' },
    { source_html: './src/html/light_OrganizationTwitterComponent.html', sub_dir: 'themes/light_theme' },
    { source_html: './src/html/light_OrganizationNewsModuleComponent.html', sub_dir: 'themes/light_theme' },
    { source_html: './src/html/light_OrganizationNewsComponent.html', sub_dir: 'themes/light_theme' },
    { source_html: './src/html/light_OrganizationSponserComponent.html', sub_dir: 'themes/light_theme' },
    { source_html: './src/html/light_OrganizationNavComponent.html', sub_dir: 'themes/light_theme' },
    { source_html: './src/html/light_OrganizationLogoComponent.html', sub_dir: 'themes/light_theme' },
    { source_html: './src/html/light_OrganizationMobileMenuComponent.html', sub_dir: 'themes/light_theme' },

    { source_html: './src/html/OrganizationAdminPageComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/OrganizationAdminProfileComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/OrganizationAdminUserComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/OrganizationAdminAboutComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/OrganizationAdminMatchesComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/OrganizationAdminMediaComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/OrganizationAdminMenuComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/OrganizationAdminRosterComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/OrganizationAdminSponserComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/OrganizationAdminThemeComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/OrganizationAdminThemeModalComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/OrganizationAdminBlogComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/OrganizationAdminCollaboratorComponent.html', sub_dir: 'admin' },
    
    { source_html: './src/html/IndividualPageComponent.html', sub_dir: 'individual' },
    { source_html: './src/html/IndividualBasicInfoComponent.html', sub_dir: 'individual' },
    { source_html: './src/html/IndividualSocialStatsComponent.html', sub_dir: 'individual' },
]
let p = component_array.length;
const p_array = [];
for (var index in component_array) {
    (function (element) {
        fs.readFile(element.source_html, (err, data) => {
            if (err) {
                throw err;
            }
            p--;
            const $ = cheerio.load(data);

            $.root().find('*').contents().filter(() => { return this.type === 'comment'; }).remove();
            const x = $.root().html();
            p_array.push({ fn: element.source_html, sd: element.sub_dir, ht: $.root().html() });
            if (p === 0) {
                let new_len = p_array.length;
                p_array.forEach((d) => {
                    const components = reacterminator(
                        {
                            type: 'string',
                            content: d.ht.toString()
                        },
                        {
                            generatefiles: true,
                            customize: false
                        }
                    );

                    for (let key in components) {
                        if (key !== 'App') {

                            const imp = `/* eslint-disable */\nimport React, { Component } from 'react';
                        import injectSheet from 'react-jss';
                        import PropTypes from 'prop-types';
                        import { GlobalStyles } from 'Theme/Theme';
                        

                        class ${key}Render extends Component {\nrender() {\n    return(\n${components[key].jsxSnippet})}}\n\n
                        
                        ${key}Render.propTypes = {
                            classes: PropTypes.object.isRequired
                        };
                        
                        export default injectSheet(GlobalStyles)(${key}Render)`;

                            const regex = /className="(classes.*?)"/gi;
                            let new_output = imp.replace(regex, "className={this.props.$1}");

                            const regex2 = /src=(["'])(?:(?=(\\?))\2.)*?\1/g;
                            let new_output2 = new_output.replace(regex2, "");

                            const regex3 = /onchange=(["'])(?:(?=(\\?))\2.)*?\1/g;
                            let new_output3 = new_output2.replace(regex3, "");

                            const args = {
                                source: new_output3,
                                mode: 'beautify',
                                bracepadding: true,
                                lang: 'jsx',
                                wrap: '0',
                                preserve: '1'

                            }
                            const output = prettydiff.api(args);
                            const bn = path.basename(d.fn).slice(0, -5);
                            const final_dir = path.join('./src/components/', d.sd);
                            const final_output = path.join('./src/components/', d.sd, `/${bn}Render.js`)

                            fs.ensureDir(final_dir, err => {
                                console.log(`${d.fn} - Converted to: ${ final_output }`);
                                fs.writeFile(final_output, output[0], function (err) {
                                    if (err) {
                                        return console.log(err);
                                    }
                                    new_len--;
                                    if (new_len === 0) {
                                        return console.log('Finished...');
                                    }
                                });
                                // dir has now been created, including the directory it is to be placed in
                            })
                            
                        }
                    }

                });

            } (element)
            // You can use 'filename' here as well.
        });
    }(component_array[index]));
}




// let gr = $.html();
// gr = gr.replace(/classname=/g, 'className=')
// gr = gr.replace(/<html>/g, '')
// gr = gr.replace(/<\/html>/g, '')
// gr = gr.replace(/<head>/g, '')
// gr = gr.replace(/<\body>/g, '')
// gr = gr.replace(/<\/body>/g, '')
// gr = gr.replace(/data-insert-props="{/g, '')
// console.log(gr);
