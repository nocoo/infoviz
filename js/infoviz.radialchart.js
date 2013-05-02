/*
    InfoViz, RadialChart
    @copyright 2012 - 2013  Zheng Li <lizheng@lizheng.me>
    @github https://github.com/nocoo/InfoViz
    @license MIT
*/

define(function(require, exports, module) {
    require.async(['./infoviz.core'], function(core) {

        exports.draw_radialchart = function(paper, chart_area, data, overwrite_options, callback, that) {
            if (!paper || !data) return idb('Paper or Data is empty.');

            var options = core.merge_options(overwrite_options), cache = [], x, y, i, item, radius, rad = Math.PI / 180;
            var hole_radius = options['radialchart']['hole-radius'];
            var cx = chart_area['top-left'][0] + chart_area['width'] / 2 + options['radialchart']['horizontal-offset'];
            var cy = chart_area['top-left'][1] + chart_area['height'] / 2 + options['radialchart']['vertical-offset'];

            if (chart_area['width'] > chart_area['height']) {
                radius = Math.floor(chart_area['height'] / 2) * options['radialchart']['size-factor'];
            } else {
                radius = Math.floor(chart_area['width'] / 2) * options['radialchart']['size-factor'];
            }

            // Scan value fields.
            var v_max = -Infinity, v_min = Infinity, v_sum = 0;
            for (i = 0; i < data['data'].length; ++i) {
                item = data['data'][i];

                if (item[data['value_field']] > v_max) {
                    v_max = item[data['value_field']];
                }

                if (item[data['value_field']] < v_min) {
                    v_min = item[data['value_field']];
                }

                v_sum += item[data['value_field']];
            }

            var angle_unit = 360 / data['data'].length;
            var bar_width = options['radialchart']['bar-width'] ? options['radialchart']['bar-width'] : angle_unit;
            var radius_unit = (radius - hole_radius - options['radialchart']['bar-min-height']) / (v_max - v_min);
            var current_angle = 0, this_color, p_boxes = [], p_bars = [], p_labels = [];
            var x2, y2, x3, y3, x4, y4, align, this_radius;
            var this_box, this_bar, this_label;
            var legend_data = [];

            for (i = 0; i < data['data'].length; ++i) {
                item = data['data'][i][data['value_field']];
                this_radius = hole_radius + options['radialchart']['bar-min-height'] + radius_unit * (item - v_min);
                this_color = options['color'][(i % options['color'].length)];

                cache = [];

                // Box start x, y
                x = cx + hole_radius * Math.cos(current_angle * rad);
                y = cy + hole_radius * Math.sin(current_angle * rad);
                cache.push('M' + x + ',' + y);

                // Box end x, y
                x = cx + this_radius * Math.cos(current_angle * rad);
                y = cy + this_radius * Math.sin(current_angle * rad);
                cache.push('L' + x + ',' + y);

                // Box end x2, y2
                x = cx + this_radius * Math.cos((current_angle + bar_width) * rad);
                y = cy + this_radius * Math.sin((current_angle + bar_width) * rad);
                cache.push('L' + x + ',' + y);

                // Box start x2, y2
                x = cx + hole_radius * Math.cos((current_angle + bar_width) * rad);
                y = cy + hole_radius * Math.sin((current_angle + bar_width) * rad);
                cache.push('L' + x + ',' + y);

                cache.push('Z');

                // Box
                this_box = paper.path(cache.join('')).attr({
                    'fill': this_color['color'],
                    'fill-opacity': this_color['light-alpha'],
                    'stroke': this_color['color'],
                    'stroke-opacity': this_color['dark-alpha'],
                    'stroke-width': options['radialchart']['bar-border-width']
                }).translate(0.5, 0.5);

                // Draw bar shadow.
                if (options['layout']['shadow-enabled']) {
                    this_box.glow({
                        'width': options['layout']['shadow-width'],
                        'fill': false,
                        'opacity': options['layout']['shadow-alpha'],
                        'offsetx': options['layout']['shadow-offset-x'],
                        'offsety': options['layout']['shadow-offset-y'],
                        'color': options['layout']['shadow-color']
                    });
                }

                this_box.data('color-alpha', this_color['light-alpha']);
                this_box.data('index', i);
                p_boxes.push(this_box);

                // Action.
                if (callback && typeof(callback) === 'function') {
                    this_box.data('info', {
                        'start': current_angle,
                        'angle': bar_width,
                        'value': data['data'][i][data['value_field']],
                        'data': data['data'][i],
                        'callback': callback,
                        'that': that
                    });
                    this_box.click(core.element_action);
                }

                // Add legend.
                legend_data.push({
                    'label': data['data'][i][data['label_field']],
                    'color': this_color,
                    'type': 'box'
                });

                var half_angle = current_angle + bar_width / 2;
                if (options['radialchart']['label-enabled']) {
                    // Label bar
                    x = cx + (this_radius + options['radialchart']['label-distance']) * Math.cos(half_angle * rad);
                    y = cy + (this_radius + options['radialchart']['label-distance']) * Math.sin(half_angle * rad);

                    x2 = cx + (this_radius + options['radialchart']['label-distance'] + options['radialchart']['label-bar-length1']) * Math.cos(half_angle * rad);
                    y2 = cy + (this_radius + options['radialchart']['label-distance'] + options['radialchart']['label-bar-length1']) * Math.sin(half_angle * rad);

                    if (x > cx) {
                        x3 = x2 + options['radialchart']['label-bar-length2'];
                    } else {
                        x3 = x2 - options['radialchart']['label-bar-length2'];
                    }

                    y3 = y2;

                    cache = [];
                    cache.push('M' + x + ',' + y);
                    cache.push('L' + x2 + ',' + y2);
                    cache.push('L' + x3 + ',' + y3);

                    this_bar = paper.path(cache.join('')).attr({
                        'stroke': options['radialchart']['label-bar-color'],
                        'stroke-opacity': options['radialchart']['label-bar-color'],
                        'stroke-width': options['radialchart']['label-bar-width']
                    }).translate(0.5, 0.5);
                    p_bars.push(this_bar);

                    // Label text
                    if (x > cx) {
                        x4 = x3 + options['radialchart']['label-distance'];
                        align = 'start';
                    } else {
                        x4 = x3 - options['radialchart']['label-distance'];
                        align = 'end';
                    }

                    y4 = y3;

                    this_label = paper.text(x4, y4, data['data'][i][data['label_field']]).attr({
                        'text-anchor': align,
                        'fill': this_color['color'],
                        'font-size': options['radialchart']['label-size']
                    }).translate(0.5, 0.5);
                    p_labels.push(this_label);
                }

                // Tooltip.
                if (data['tooltip_title'] || data['tooltip_content']) {
                    var title = data['tooltip_title'];
                    var content = data['tooltip_content'];

                    for (var p in data['data'][i]) {
                        title = title.replace('{' + p + '}', data['data'][i][p]);
                        content = content.replace('{' + p + '}', data['data'][i][p]);
                    }

                    this_box.data('tooltip', {
                        'id': i,
                        'title': title,
                        'content': content,
                        'color': this_color,
                        'x': cx + options['radialchart']['tooltip-position'] * radius * Math.cos(half_angle * rad),
                        'y': cy + options['radialchart']['tooltip-position'] * radius * Math.sin(half_angle * rad),
                        'element': this_box,
                        'options': options,
                        'paper': paper
                    });
                    this_box.hover(core.element_tooltip);
                }

                current_angle += angle_unit;
            }

            core.draw_legend(paper, chart_area, legend_data, options);

            var animate_on = Raphael.animation({
                'transform': 's1.1 1.1 ' + cx + ' ' + cy
            }, options['layout']['speed'], '>');
            var animate_off = Raphael.animation({
                'transform': ''
            }, options['layout']['speed'], '<');

            var this_animation;
            for (i = 0; i < p_boxes.length; ++i) {
                (function(target) {
                    target.mouseover(function() {
                        this_bar = p_bars[target.data('index')];
                        if (this_bar) this_bar.stop().animate(animate_on);

                        this_label = p_labels[target.data('index')];
                        if (this_label) this_label.stop().animate(animate_on);

                        this_animation = animate_on;
                        this_animation.anim['100']['fill-opacity'] = 1;
                        target.stop().animate(this_animation);
                        delete this_animation.anim['100']['fill-opacity'];
                    });
                    target.mouseout(function() {
                        this_bar = p_bars[target.data('index')];
                        if (this_bar) this_bar.stop().animate(animate_off);

                        this_label = p_labels[target.data('index')];
                        if (this_label) this_label.stop().animate(animate_off);

                        this_animation = animate_off;
                        this_animation.anim['100']['fill-opacity'] = target.data('color-alpha');
                        target.stop().animate(this_animation);
                        delete this_animation.anim['100']['fill-opacity'];
                    });
                })(p_boxes[i]);
            }
        };
    });
});
