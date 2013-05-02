/*
    InfoViz, BubbleChart
    @copyright 2012 - 2013  Zheng Li <lizheng@lizheng.me>
    @github https://github.com/nocoo/InfoViz
    @license MIT
*/

define(function(require, exports, module) {
    exports.draw_bubblechart = function(paper, chart_area, data, overwrite_options, callback, that) {
        if (!paper || !data) return idb('Paper or Data is empty.');

        var core = require('./infoviz.core');
        var options = core.merge_options(overwrite_options), cache = [], i, x, y, size, item;
        var h_min = Infinity, h_max = -Infinity, v_min = Infinity, v_max = -Infinity, size_max = -Infinity, size_min = Infinity;

        // Scan data.
        for (i = 0; i < data['data'].length; ++i) {
            item = data['data'][i];

            if (item[data['horizontal_field']] > h_max) {
                h_max = item[data['horizontal_field']];
            }
            if (item[data['horizontal_field']] < h_min) {
                h_min = item[data['horizontal_field']];
            }

            if (item[data['vertical_field']] > v_max) {
                v_max = item[data['vertical_field']];
            }
            if (item[data['vertical_field']] < v_min) {
                v_min = item[data['vertical_field']];
            }

            if (item[data['size_field']] > size_max) {
                size_max = item[data['size_field']];
            }
            if (item[data['size_field']] < size_min) {
                size_min = item[data['size_field']];
            }
        }

        // Round.
        h_min = Math.floor(h_min / 10) * 10;
        h_max = Math.ceil(h_max / 10) * 10;
        v_min = Math.floor(v_min / 10) * 10;
        v_max = Math.ceil(v_max / 10) * 10;

        // Setup units.
        var h_start = chart_area['top-left'][0] + options['bubblechart']['padding-left'];
        var h_unit = (chart_area['top-right'][0] - options['bubblechart']['padding-right'] - h_start) / (h_max - h_min);
        var v_start = chart_area['bottom-left'][1] - options['bubblechart']['padding-bottom'];
        var v_unit = (v_start - chart_area['top-left'][1] - options['bubblechart']['padding-top']) / (v_max - v_min);
        var size_start = options['bubblechart']['circle-min-radius'];
        var size_unit = (options['bubblechart']['circle-max-radius'] - size_start) / (size_max - size_min);

        // Draw bubbles.
        var this_h, this_v, this_size, this_label, this_color, this_bubble, this_text;
        var legend_data = [], p_bubbles = [], p_texts = [];
        for (i = 0; i < data['data'].length; ++i) {
            item = data['data'][i];
            this_h = item[data['horizontal_field']];
            this_v = item[data['vertical_field']];
            this_size = item[data['size_field']];
            this_label = item[data['label_field']];
            this_color = options['color'][(i % options['color'].length)];

            size = size_start + this_size * size_unit;
            x = h_start + (this_h - h_min) * h_unit;
            y = v_start - (this_v - v_min) * v_unit;

            this_bubble = paper.circle(x, y, size).attr({
                'fill': this_color['color'],
                'fill-opacity': this_color['light-alpha'],
                'stroke': this_color['color'],
                'stroke-opacity': this_color['dark-alpha'],
                'stroke-width': options['bubblechart']['circle-border-width']
            }).translate(0.5, 0.5);

            this_text = paper.text(x, y, this_label).attr({
                'fill': options['bubblechart']['label-color'],
                'font-size': options['bubblechart']['label-size'],
                'text-anchor': 'middle'
            }).translate(0.5, 0.5);

            // Draw bubble shadow.
            if (options['layout']['shadow-enabled']) {
                this_bubble.glow({
                    'width': options['layout']['shadow-width'],
                    'fill': false,
                    'opacity': options['layout']['shadow-alpha'],
                    'offsetx': options['layout']['shadow-offset-x'],
                    'offsety': options['layout']['shadow-offset-y'],
                    'color': options['layout']['shadow-color']
                });
            }

            this_bubble.data('data', item);
            this_text.data('data', item);
            p_bubbles.push(this_bubble);
            p_texts.push(this_text);

            // Add legend data.
            legend_data.push({
                'label': this_label,
                'color': this_color,
                'type': 'circle'
            });

            // Action.
            if (callback && typeof(callback) === 'function') {
                this_bubble.data('info', {
                    'x': x,
                    'y': y,
                    'v_value': this_v,
                    'h_value': this_h,
                    'data': item,
                    'type': 'circle',
                    'callback': callback,
                    'that': that
                });
                this_bubble.click(core.element_action);

                this_text.data('info', {
                    'x': x,
                    'y': y,
                    'v_value': this_v,
                    'h_value': this_h,
                    'data': item,
                    'type': 'label',
                    'callback': callback,
                    'that': that
                });
                this_text.click(core.element_action);
            }

            // Tooltip.
            if (data['tooltip_title'] || data['tooltip_content']) {
                var title = data['tooltip_title'];
                var content = data['tooltip_content'];

                for (var p in item) {
                    title = title.replace('{' + p + '}', item[p]);
                    content = content.replace('{' + p + '}', item[p]);
                }

                // this_bubble.data('tooltip', {
                //     'id': i,
                //     'title': title,
                //     'content': content,
                //     'color': this_color,
                //     'x': x,
                //     'y': y - size,
                //     'element': this_bubble,
                // 'options': options,
                // 'paper': paper
                // });
                // this_bubble.hover(core.element_tooltip);

                this_text.data('tooltip', {
                    'id': i,
                    'title': title,
                    'content': content,
                    'color': this_color,
                    'x': x,
                    'y': y - size,
                    'element': this_text,
                    'options': options,
                    'paper': paper
                });
                this_text.hover(core.element_tooltip);
            }
        }

        core.draw_legend(paper, chart_area, legend_data, options);

        // Vertical labels.
        var v_label_unit = (v_start - chart_area['top-left'][1] - options['bubblechart']['padding-top']) / (options['grid']['vertical-label-count'] - 1);
        var v_label_value_unit = (v_max - v_min) / (options['grid']['vertical-label-count'] - 1);

        cache = [];
        x = chart_area['top-left'][0] - options['grid']['vertical-bar-width'];
        y = v_start;
        var v_value = v_min;

        for (i = 0; i < options['grid']['vertical-label-count']; ++i) {
            cache.push('M' + x + ',' + y + 'L' + chart_area['top-left'][0] + ',' + y);

            paper.path(cache.join('')).attr({
                'stroke': options['grid']['axis-color'],
                'stroke-opacity': options['grid']['axis-alpha'],
                'stroke-width': options['grid']['axis-width']
            }).translate(0.5, 0.5);

            paper.text(x - options['grid']['vertical-bar-width'], y, v_value.toFixed(options['grid']['vertical-label-round'])).attr({
                'text-anchor': 'end',
                'fill': options['grid']['vertical-label-color'],
                'font-size': options['grid']['vertical-label-size']
            }).translate(0.5, 0.5);

            y -= v_label_unit;
            v_value += v_label_value_unit;
        }

        // Horizontal labels.
        var h_label_unit = (chart_area['top-right'][0] - options['bubblechart']['padding-right'] - h_start) / (options['grid']['vertical-label-count'] - 1);
        var h_label_value_unit = (h_max - h_min) / (options['grid']['vertical-label-count'] - 1);

        cache = [];
        x = h_start;
        y = chart_area['bottom-left'][1] + options['bubblechart']['horizontal-bar-width'];
        var h_value = h_min, this_h_label;

        for (i = 0; i < options['bubblechart']['horizontal-label-count']; ++i) {
            cache.push('M' + x + ',' + y + 'L' + x + ',' + chart_area['bottom-left'][1]);

            paper.path(cache.join('')).attr({
                'stroke': options['grid']['axis-color'],
                'stroke-opacity': options['grid']['axis-alpha'],
                'stroke-width': options['grid']['axis-width']
            }).translate(0.5, 0.5);

            this_h_label = paper.text(x, y + options['bubblechart']['horizontal-bar-width'] * 2, h_value.toFixed(options['grid']['vertical-label-round'])).attr({
                'fill': options['grid']['horizontal-label-color'],
                'font-size': options['grid']['horizontal-label-size']
            }).translate(0.5, 0.5);

            if (options['grid']['horizontal-label-rotate']) {
                this_h_label.transform('r' + options['grid']['horizontal-label-rotate']);
            }

            x += h_label_unit;
            h_value += h_label_value_unit;
        }
    };
});
