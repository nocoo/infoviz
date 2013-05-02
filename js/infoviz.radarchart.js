/*
    InfoViz, RadarChart
    @copyright 2012 - 2013  Zheng Li <lizheng@lizheng.me>
    @github https://github.com/nocoo/InfoViz
    @license MIT
*/

define(function(require, exports, module) {
    require.async(['./infoviz.core'], function(core) {

        exports.draw_radarchart = function(paper, chart_area, data, overwrite_options, callback, that) {
            if (!paper || !data) return idb('Paper or Data is empty.');

            var options = core.merge_options(overwrite_options), cache = [], cache2 = [], x, y, i, j, item, radius, rad = Math.PI / 180;
            var cx = chart_area['top-left'][0] + chart_area['width'] / 2 + options['radarchart']['horizontal-offset'];
            var cy = chart_area['top-left'][1] + chart_area['height'] / 2 + options['radarchart']['vertical-offset'];

            if (chart_area['width'] > chart_area['height']) {
                radius = Math.floor(chart_area['height'] / 2) * options['radarchart']['size-factor'];
            } else {
                radius = Math.floor(chart_area['width'] / 2) * options['radarchart']['size-factor'];
            }

            // Scan value fields.
            var angle_start = 0;
            var angle_unit = 360 / data['value_fields'].length;
            var v_map = {}, a_map = {};
            for (i = 0; i < data['value_fields'].length; ++i) {
                v_map[data['value_fields'][i]] = {
                    'v_max': -Infinity, 'v_min': Infinity
                };

                a_map[data['value_fields'][i]] = { 'angle': angle_start };

                angle_start += angle_unit;
            }

            for (i = 0; i < data['data'].length; ++i) {
                for (j = 0; j < data['value_fields'].length; ++j) {

                    if (typeof(data['value_maxs']) === 'object' && (data['value_maxs'] instanceof Array)) {
                        v_map[data['value_fields'][j]]['v_max'] = data['value_maxs'][j];
                    }

                    if (typeof(data['value_mins']) === 'object' && (data['value_mins'] instanceof Array)) {
                        v_map[data['value_fields'][j]]['v_min'] = data['value_mins'][j];
                    }

                    item = data['data'][i][data['value_fields'][j]];

                    if (item > v_map[data['value_fields'][j]]['v_max']) {
                        v_map[data['value_fields'][j]]['v_max'] = item;

                    }

                    if (item < v_map[data['value_fields'][j]]['v_min']) {
                        v_map[data['value_fields'][j]]['v_min'] = item;
                    }
                }
            }

            // Draw outer border.
            paper.circle(cx, cy, radius).attr({
                'stroke': options['radarchart']['outer-border-color'],
                'stroke-width': options['radarchart']['outer-border-width'],
                'stroke-opacity': options['radarchart']['outer-border-alpha'],
                'fill': options['radarchart']['outer-background-color'],
                'fill-opacity': options['radarchart']['outer-background-alpha']
            }).translate(0.5, 0.5);

            // Draw innter border and axises.
            cache = [];
            cache2 = [];
            var this_rotation = 0;
            for (i = 0; i < data['value_fields'].length; ++i) {
                if (i === 0) {
                    cache.push('M');
                } else {
                    cache.push('L');
                }

                x = cx + radius * Math.sin(a_map[data['value_fields'][i]]['angle'] * rad);
                y = cy - radius * Math.cos(a_map[data['value_fields'][i]]['angle'] * rad);
                a_map[data['value_fields'][i]]['end-x'] = x;
                a_map[data['value_fields'][i]]['end-y'] = y;

                cache.push(x + ',' + y);
                cache2.push('M' + cx + ',' + cy + 'L' + x + ',' + y);

                // Calculate label position.
                x = cx + (radius + options['radarchart']['label-distance']) * Math.sin(a_map[data['value_fields'][i]]['angle'] * rad);
                y = cy - (radius + options['radarchart']['label-distance']) * Math.cos(a_map[data['value_fields'][i]]['angle'] * rad);
                a_map[data['value_fields'][i]]['label-x'] = x;
                a_map[data['value_fields'][i]]['label-y'] = y;

                // Label rotation.
                if (options['radarchart']['label-rotation']) {
                    this_rotation = a_map[data['value_fields'][i]]['angle'];

                    if (a_map[data['value_fields'][i]]['angle'] > 90 && a_map[data['value_fields'][i]]['angle'] < 270) {
                        this_rotation += 180;
                    }
                }

                // Draw labels.
                paper.text(x, y, data['value_fields'][i]).attr({
                    'font-size': options['radarchart']['label-size'],
                    'fill': options['radarchart']['label-color'],
                    'transform': 'r' + this_rotation
                }).translate(0.5, 0.5);

                // Calculate v_unit.
                v_map[data['value_fields'][i]]['v_unit'] = (radius - options['radarchart']['circle-min-radius']) / (v_map[data['value_fields'][i]]['v_max'] - v_map[data['value_fields'][i]]['v_min']);
            }

            cache.push('z');
            paper.path(cache.join('')).attr({
                'stroke': options['radarchart']['inner-border-color'],
                'stroke-width': options['radarchart']['inner-border-width'],
                'stroke-opacity': options['radarchart']['inner-border-alpha'],
                'fill': options['radarchart']['inner-background-color'],
                'fill-opacity': options['radarchart']['inner-background-alpha']
            }).translate(0.5, 0.5);

            // Axis.
            paper.path(cache2.join('')).attr({
                'stroke': options['radarchart']['axis-color'],
                'stroke-width': options['radarchart']['axis-width'],
                'stroke-opacity': options['radarchart']['axis-alpha']
            }).translate(0.5, 0.5);

            // Draw circles.
            var this_r = 0, this_color, this_value, p_circles = [], this_circle, legend_data = [];
            for (i = 0; i < data['data'].length; ++i) {
                this_color = options['color'][(i % options['color'].length)];
                cache = [];

                for (j = 0; j < data['value_fields'].length; ++j) {
                    this_value = data['data'][i][data['value_fields'][j]];
                    this_r = options['radarchart']['circle-min-radius'] + v_map[data['value_fields'][j]]['v_unit'] * (this_value - v_map[data['value_fields'][j]]['v_min']);

                    if (!this_r) continue;

                    if (j === 0) {
                        cache.push('M');
                    } else {
                        cache.push('L');
                    }

                    x = cx + this_r * Math.sin(a_map[data['value_fields'][j]]['angle'] * rad);
                    y = cy - this_r * Math.cos(a_map[data['value_fields'][j]]['angle'] * rad);
                    cache.push(x + ',' + y);
                }

                cache.push('z');
                this_circle = paper.path(cache.join('')).attr({
                    'stroke': this_color['color'],
                    'stroke-width': options['radarchart']['circle-border-width'],
                    'stroke-opacity': this_color['dark-alpha'],
                    'fill': this_color['color'],
                    'fill-opacity': options['radarchart']['circle-background-alpha']
                }).translate(0.5, 0.5);

                // Draw circle shadow.
                if (options['layout']['shadow-enabled']) {
                    this_circle.glow({
                        'width': options['layout']['shadow-width'],
                        'fill': false,
                        'opacity': options['layout']['shadow-alpha'],
                        'offsetx': options['layout']['shadow-offset-x'],
                        'offsety': options['layout']['shadow-offset-y'],
                        'color': options['layout']['shadow-color']
                    });
                }

                this_circle.data('color-alpha', options['radarchart']['circle-background-alpha']);
                p_circles.push(this_circle);

                if (data['data'][i][data['name_field']]) {
                    // Add legend.
                    legend_data.push({
                        'label': data['data'][i][data['name_field']],
                        'color': this_color,
                        'type': 'circle'
                    });
                }

                // Action.
                if (callback && typeof(callback) === 'function') {
                    this_circle.data('info', {
                        'name': data['data'][i][data['name_field']],
                        'data': data['data'][i],
                        'callback': callback,
                        'that': that
                    });
                    this_circle.click(core.element_action);
                }

                // Tooltip.
                if (data['tooltip_title'] || data['tooltip_content']) {
                    var title = data['tooltip_title'];
                    var content = data['tooltip_content'];

                    for (var p in data['data'][i]) {
                        title = title.replace('{' + p + '}', data['data'][i][p]);
                        content = content.replace('{' + p + '}', data['data'][i][p]);
                    }

                    this_circle.data('tooltip', {
                        'id': i,
                        'title': title,
                        'content': content,
                        'color': this_color,
                        'x': x,
                        'y': y,
                        'element': this_circle,
                        'options': options,
                        'paper': paper
                    });
                    this_circle.hover(core.element_tooltip);
                }
            }

            core.draw_legend(paper, chart_area, legend_data, options);

            // Animations.
            for (i = 0; i < p_circles.length; ++i) {
                (function(target) {
                    target.mouseover(function() {
                        target.animate({
                            'fill-opacity': 0.618
                        }, options['layout']['speed'], '<');
                    });
                    target.mouseout(function() {
                        target.animate({
                            'fill-opacity': target.data('color-alpha')
                        }, options['layout']['speed'], '>');
                    });
                })(p_circles[i]);
            }
        };
    });
});
