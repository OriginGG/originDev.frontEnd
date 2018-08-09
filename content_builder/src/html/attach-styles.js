

export function attach_styles(CurrentTheme, CurrentStyles, t) {
    var uppercasePattern = /[A-Z]/g;
    var msPattern = /^ms-/;
    var cache = {};
 

    function hyphenateStyleName(string) {
        return string in cache
            ? cache[string]
            : cache[string] = string
                .replace(uppercasePattern, '-$&')
                .toLowerCase()
                .replace(msPattern, '-ms-');
    }


    function convertCase(style) {
        const converted = {}

        for (const prop in style) {
            converted[hyphenateStyleName(prop)] = style[prop]
        }

        if (style.fallbacks) {
            if (Array.isArray(style.fallbacks)) converted.fallbacks = style.fallbacks.map(convertCase)
            else converted.fallbacks = convertCase(style.fallbacks)
        }

        return converted
    }

    function convertCamel(style) {
        if (Array.isArray(style)) {
            // Handle rules like @font-face, which can have multiple styles in an array
            for (let index = 0; index < style.length; index++) {
                style[index] = convertCase(style[index])
            }
            return style
        }
        for (let key in style) {
            style[key] = convertCase(style[key]);
        }
        return style;
    }   
    var classes;
    var j = jss.create();
    var x = convertCamel(CurrentStyles(CurrentTheme));
    classes = j.createStyleSheet(x)
    classes.attach();
    var x = $(`[class^="${t}."]`);
    x.each((i, el) => {
        var c = el.className.substr(t.length + 1, el.className.length);
        var new_class = classes.classes[c];
        if (new_class !== undefined) {
            $(el).removeClass(el.className);
            $(el).addClass(new_class);
        }
    });
    // script is now loaded and executed.
    // put your dependent JS here.
}


