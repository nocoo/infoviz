/*
    InfoViz, PieChart
    @copyright 2012 - 2013  Zheng Li <lizheng@lizheng.me>
    @github https://github.com/nocoo/InfoViz
    @license MIT
*/

define(function(require, exports, module) {
    require.async(['./infoviz.core'], function(core) {

        exports.draw_piechart = function(paper, chart_area, data, overwrite_options, callback, that) {
            if (!paper || !data) return idb('Paper or Data is empty.');

            var options = core.merge_options(overwrite_options), cache = [], x, y, i, item, radius;
            var hole_radius = options['piechart']['hole-radius'];
            var cx = chart_area['top-left'][0] + chart_area['width'] / 2 + options['piechart']['horizontal-offset'];
            var cy = chart_area['top-left'][1] + chart_area['height'] / 2 + options['piechart']['vertical-offset'];

            if (chart_area['width'] > chart_area['height']) {
                radius = Math.floor(chart_area['height'] / 2) * options['piechart']['size-factor'];
            } else {
                radius = Math.floor(chart_area['width'] / 2) * options['piechart']['size-factor'];
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

            var sector = function(cx, cy, r, hole_r, startAngle, endAngle, params) {
                var rad = Math.PI / 180,
                    x1 = cx + r * Math.cos(-startAngle * rad),
                    x2 = cx + r * Math.cos(-endAngle * rad),
                    y1 = cy + r * Math.sin(-startAngle * rad),
                    y2 = cy + r * Math.sin(-endAngle * rad);

                    x3 = cx + hole_r * Math.cos(-startAngle * rad),
                    x4 = cx + hole_r * Math.cos(-endAngle * rad),
                    y3 = cy + hole_r * Math.sin(-startAngle * rad),
                    y4 = cy + hole_r * Math.sin(-endAngle * rad);

                if (hole_r > 0) {
                    return paper.path(['M', x3, y3, 'L', x1, y1, 'A', r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, 'L', x4, y4, 'A', hole_r, hole_r, 0, -(endAngle - startAngle > 180), 1, x3, y3]).attr(params);
                } else {
                    return paper.path(['M', cx, cy, 'L', x1, y1, 'A', r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, 'z']).attr(params);
                }
            };

            var angle_unit = 360 / v_sum;
            var this_angle, current_angle = 0, this_color, p_sectors = [], p_bars = [], p_labels = [], half_angle;
            var x2, y2, x3, y3, x4, y4, align;
            var this_sector, this_bar, this_label;
            var legend_data = [];

            for (i = 0; i < data['data'].length; ++i) {
                item = data['data'][i][data['value_field']];
                this_angle = angle_unit * item;
                this_color = options['color'][(i % options['color'].length)];

                // Sector
                this_sector = sector(cx, cy, radius, hole_radius, current_angle, current_angle + this_angle, {
                    'fill': this_color['color'],
                    'fill-opacity': this_color['light-alpha'],
                    'stroke': this_color['color'],
                    'stroke-opacity': this_color['dark-alpha'],
                    'stroke-width': options['piechart']['sector-border-width']
                }).translate(0.5, 0.5);

                // Draw sector shadow.
                if (options['layout']['shadow-enabled']) {
                    this_sector.glow({
                        'width': options['layout']['shadow-width'],
                        'fill': false,
                        'opacity': options['layout']['shadow-alpha'],
                        'offsetx': options['layout']['shadow-offset-x'],
                        'offsety': options['layout']['shadow-offset-y'],
                        'color': options['layout']['shadow-color']
                    });
                }

                this_sector.data('color-alpha', this_color['light-alpha']);
                this_sector.data('index', i);
                p_sectors.push(this_sector);

                // Action.
                if (callback && typeof(callback) === 'function') {
                    this_sector.data('info', {
                        'start': current_angle,
                        'angle': this_angle,
                        'value': data['data'][i][data['value_field']],
                        'data': data['data'][i],
                        'callback': callback,
                        'that': that
                    });
                    this_sector.click(core.element_action);
                }

                // Add legend.
                legend_data.push({
                    'label': data['data'][i][data['label_field']],
                    'color': this_color,
                    'type': 'sector'
                });

                // Label bar
                half_angle = -(current_angle + this_angle / 2) * Math.PI / 180;
                x = cx + (radius + options['piechart']['label-distance']) * Math.cos(half_angle);
                y = cy + (radius + options['piechart']['label-distance']) * Math.sin(half_angle);

                x2 = cx + (radius + options['piechart']['label-distance'] + options['piechart']['label-bar-length1']) * Math.cos(half_angle);
                y2 = cy + (radius + options['piechart']['label-distance'] + options['piechart']['label-bar-length1']) * Math.sin(half_angle);

                if (x > cx) {
                    x3 = x2 + options['piechart']['label-bar-length2'];
                } else {
                    x3 = x2 - options['piechart']['label-bar-length2'];
                }

                y3 = y2;

                cache = [];
                cache.push('M' + x + ',' + y);
                cache.push('L' + x2 + ',' + y2);
                cache.push('L' + x3 + ',' + y3);

                this_bar = paper.path(cache.join('')).attr({
                    'stroke': options['piechart']['label-bar-color'],
                    'stroke-opacity': options['piechart']['label-bar-color'],
                    'stroke-width': options['piechart']['label-bar-width']
                }).translate(0.5, 0.5);
                p_bars.push(this_bar);

                // Label text
                if (x > cx) {
                    x4 = x3 + options['piechart']['label-distance'];
                    align = 'start';
                } else {
                    x4 = x3 - options['piechart']['label-distance'];
                    align = 'end';
                }

                y4 = y3;

                this_label = paper.text(x4, y4, data['data'][i][data['label_field']]).attr({
                    'text-anchor': align,
                    'fill': this_color['color'],
                    'font-size': options['piechart']['label-size']
                }).translate(0.5, 0.5);
                p_labels.push(this_label);

                // Tooltip.
                if (data['tooltip_title'] || data['tooltip_content']) {
                    var title = data['tooltip_title'];
                    var content = data['tooltip_content'];

                    for (var p in data['data'][i]) {
                        title = title.replace('{' + p + '}', data['data'][i][p]);
                        content = content.replace('{' + p + '}', data['data'][i][p]);
                    }

                    this_sector.data('tooltip', {
                        'id': i,
                        'title': title,
                        'content': content,
                        'color': this_color,
                        'x': cx + (options['piechart']['tooltip-position'] * radius) * Math.cos(half_angle),
                        'y': cy + (options['piechart']['tooltip-position'] * radius) * Math.sin(half_angle),
                        'element': this_sector,
                        'options': options,
                        'paper': paper
                    });
                    this_sector.hover(core.element_tooltip);
                }

                current_angle += this_angle;
            }

            core.draw_legend(paper, chart_area, legend_data, options);

            var animate_on = Raphael.animation({
                'transform': 's1.1 1.1 ' + cx + ' ' + cy
            }, options['layout']['speed'], '>');
            var animate_off = Raphael.animation({
                'transform': ''
            }, options['layout']['speed'], '<');

            var this_animation;
            for (i = 0; i < p_sectors.length; ++i) {
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
                })(p_sectors[i]);
            }
        };
    });
});
