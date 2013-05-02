/*
    InfoViz, SmithGraph
    @copyright 2012 - 2013  Zheng Li <lizheng@lizheng.me>
    @github https://github.com/nocoo/InfoViz
    @license MIT
*/

define(function(require, exports, module) {
    require.async(['./infoviz.core'], function(core) {

        exports.draw_smithgraph = function(paper, chart_area, data, overwrite_options, callback, that) {
            if (!paper || !data) return idb('Paper or Data is empty.');

            var options = core.merge_options(overwrite_options), cache = [], x, y, i, item, radius, rad = Math.PI / 180;
            var hole_radius = options['smithgraph']['hole-radius'];
            var cx = chart_area['top-left'][0] + chart_area['width'] / 2 + options['smithgraph']['horizontal-offset'];
            var cy = chart_area['top-left'][1] + chart_area['height'] / 2 + options['smithgraph']['vertical-offset'];

            if (chart_area['width'] > chart_area['height']) {
                radius = Math.floor(chart_area['height'] / 2) * options['smithgraph']['size-factor'];
            } else {
                radius = Math.floor(chart_area['width'] / 2) * options['smithgraph']['size-factor'];
            }

            // Pre-scan
            // Scan node value fields.
            var nv_max = -Infinity, nv_min = Infinity, nv_sum = 0;
            var node_map = {};
            for (i = 0; i < data['data'].length; ++i) {
                item = data['data'][i];

                if (item[data['node_value_field']] > nv_max) {
                    nv_max = item[data['node_value_field']];
                }

                if (item[data['node_value_field']] < nv_min) {
                    nv_min = item[data['node_value_field']];
                }

                nv_sum += item[data['node_value_field']];

                if (!node_map[item[data['node_id_field']]]) {
                    node_map[item[data['node_id_field']]] = {
                        'node': item,
                        'out': item['edges'].length,
                        'in': 0
                    };
                } else {
                    console.log('node id: ' + item[data['node_id_field']] + ' is not unique. skip.');
                    continue;
                }
            }

            // Scan node value fields.
            var ev_max, ev_min, ev_sum;
            var gev_max = -Infinity, gev_min = Infinity, gev_sum = 0;
            for (i = 0; i < data['data'].length; ++i) {
                item = data['data'][i];
                ev_max = -Infinity, ev_min = Infinity, ev_sum = 0;

                for (j = 0; j < item['edges'].length; ++j) {
                    if (!node_map[item['edges'][j]['to']]) {
                        console.log('destination node id: ' + item['edges'][j]['to'] + ' not found. skip.');
                        continue;
                    }

                    node_map[item['edges'][j]['to']]['in']++;

                    var value = item['edges'][j][data['edge_value_field']];
                    if (value > ev_max) { ev_max = value; }
                    if (value < ev_min) { ev_min = value; }
                    ev_sum += value;
                }

                node_map[item[data['node_id_field']]]['edge_max'] = ev_max;
                node_map[item[data['node_id_field']]]['edge_min'] = ev_min;
                node_map[item[data['node_id_field']]]['edge_sum'] = ev_sum;

                // Global max, min and sum.
                if (ev_max > gev_max) gev_max = ev_max;
                if (ev_min < gev_min) gev_min = ev_min;
                gev_sum += ev_sum;
            }

            // Draw node.
            var angle_unit = 360 / data['data'].length;
            var bar_width = options['smithgraph']['bar-width'] ? options['smithgraph']['bar-width'] : angle_unit;
            var radius_unit = (radius - hole_radius - options['smithgraph']['bar-min-height']) / (nv_max - nv_min);
            var current_angle = 0, this_color, p_boxes = [], p_edges;
            var x2, y2, x3, y3, x4, y4, align, this_radius;
            var this_box, this_bar, this_label;
            var legend_data = [];

            for (i = 0; i < data['data'].length; ++i) {
                item = data['data'][i][data['node_value_field']];
                this_radius = hole_radius + options['smithgraph']['bar-min-height'] + radius_unit * (item - nv_min);
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
                    'stroke-width': options['smithgraph']['bar-border-width']
                }).translate(0.5, 0.5);
                this_box.data('color-alpha', this_color['light-alpha']);
                this_box.data('index', i);
                p_boxes.push(this_box);

                // Action.
                if (callback && typeof(callback) === 'function') {
                    this_box.data('info', {
                        'type': 'node',
                        'start': current_angle,
                        'angle': bar_width,
                        'value': data['data'][i][data['node_value_field']],
                        'data': data['data'][i],
                        'callback': callback,
                        'that': that
                    });
                    this_box.click(core.element_action);
                }

                //Add legend.
                legend_data.push({
                    'label': data['data'][i][data['node_label_field']],
                    'color': this_color,
                    'type': 'box'
                });

                // Tooltip.
                if (data['node_tooltip_title'] || data['node_tooltip_content']) {
                    var title = data['node_tooltip_title'];
                    var content = data['node_tooltip_content'];

                    for (var p in data['data'][i]) {
                        title = title.replace('{' + p + '}', data['data'][i][p]);
                        content = content.replace('{' + p + '}', data['data'][i][p]);
                    }

                    this_box.data('tooltip', {
                        'id': i,
                        'title': title,
                        'content': content,
                        'color': this_color,
                        'x': cx + radius * Math.cos((current_angle + bar_width / 2) * rad),
                        'y': cy + radius * Math.sin((current_angle + bar_width / 2) * rad),
                        'element': this_box,
                        'options': options,
                        'paper': paper
                    });
                    this_box.hover(core.element_tooltip);
                }

                // Save position to node_map
                node_map[data['data'][i][data['node_id_field']]]['start'] = current_angle;
                node_map[data['data'][i][data['node_id_field']]]['end'] = current_angle + angle_unit;

                current_angle += angle_unit;
            }

            // Draw edges.
            current_angle = 0;
            for (i = 0; i < data['data'].length; ++i) {
                var node = node_map[data['data'][i][data['node_id_field']]], to_node;
                var edge_unit = angle_unit / node['edge_sum'];
                var this_edge, this_edge_angle, this_position = current_angle, p_edge;
                var edge_area_radius = hole_radius - options['smithgraph']['edge-margin'];

                if (edge_unit == Infinity) { edge_unit = angle_unit; }

                for (j = 0; j < node['node']['edges'].length; ++j) {
                    this_edge = node['node']['edges'][j];
                    to_node = node_map[this_edge['to']];

                    this_edge_angle = edge_unit * this_edge[data['edge_value_field']];
                    this_color = options['smithgraph']['edge-color'][
                        Math.floor(
                            (options['smithgraph']['edge-color'].length - 1) *
                            (this_edge[data['edge_value_field']] - gev_min) /
                            (gev_max - gev_min)
                        )
                    ];

                    cache = [];
                    x = cx + edge_area_radius * Math.cos(this_position * rad);
                    y = cy + edge_area_radius * Math.sin(this_position * rad);
                    cache.push('M' + x + ',' + y);

                    x2 = cx + edge_area_radius * Math.cos((to_node['start'] + to_node['end']) / 2 * rad);
                    y2 = cy + edge_area_radius * Math.sin((to_node['start'] + to_node['end']) / 2 * rad);
                    cache.push('L' + x2 + ',' + y2);
                    //cache.push('A' + hole_radius / 4 + ',' + hole_radius / 4 + ', 0, 0, 0,' + x2 + ',' + y2);

                    //x3 = cx + edge_area_radius * Math.cos(to_node['start'] * rad);
                    //y3 = cy + edge_area_radius * Math.sin(to_node['start'] * rad);
                    //cache.push('L' + x3 + ',' + y3);
                    //cache.push('A' + hole_radius / 4 + ',' + hole_radius / 4 + ', 0, 0, 0,' + x3 + ',' + y3);

                    x4 = cx + edge_area_radius * Math.cos((this_position + this_edge_angle) * rad);
                    y4 = cy + edge_area_radius * Math.sin((this_position + this_edge_angle) * rad);
                    cache.push('L' + x4 + ',' + y4);
                    cache.push('Z');

                    // Edge.
                    p_edge = paper.path(cache.join('')).attr({
                        'fill': this_color['color'],
                        'fill-opacity': options['smithgraph']['edge-background-alpha'],
                        'stroke': this_color['color'],
                        'stroke-opacity': this_color['dark-alpha'],
                        'stroke-width': options['smithgraph']['edge-border-width']
                    }).translate(0.5, 0.5);

                    this_position += this_edge_angle;
                }

                current_angle += angle_unit;
            }

            core.draw_legend(paper, chart_area, legend_data, options);
        };
    });
});
