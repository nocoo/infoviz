/*
    InfoViz, BasicTree
    @copyright 2012 - 2013  Zheng Li <lizheng@lizheng.me>
    @github https://github.com/nocoo/InfoViz
    @license MIT
*/

define(function(require, exports, module) {
    require.async(['./infoviz.core'], function(core) {

        exports.draw_basictree = function(paper, chart_area, data, overwrite_options, callback, that) {
            if (!paper || !data) return idb('Paper or Data is empty.');

            var options = core.merge_options(overwrite_options), cache = [], x, y, i, j, item;

            // BFS the tree.
            var walk_bfs = function(root) {
                //console.log(data);
                var result = [], queue = [], dict = {};
                var count = 0, level;

                // Mark the root node.
                root['_id'] = 'n_' + count++;
                result.push({ '_id': root['_id'], 'node': root });
                dict[root['_id']] = {
                    'index': result.length - 1,
                    'parent_id': undefined,
                    'count_direct': root['children'].length,
                    'count_leaf': 0
                };

                // Enqueue the root node.
                queue.push(root);

                var t, i, pid;
                while (queue.length > 0) {
                    t = queue[0];
                    queue = queue.slice(1);
                    pid = t['_id'];

                    if (!t['children']) t['children'] = [];
                    for (i = 0; i < t['children'].length; ++i) {
                        // Mark t.
                        t['children'][i]['_id'] = 'n_' + count++;
                        result.push({ '_id': t['children'][i]['_id'], 'node': t['children'][i] });
                        dict[t['children'][i]['_id']] = {
                            'index': result.length - 1,
                            'parent_id': pid,
                            'count_direct': t['children'][i]['children'] ? t['children'][i]['children'].length : 0,
                            'count_leaf': 0
                        };

                        // Enqueue t.
                        queue.push(t['children'][i]);
                    }
                }

                for (var id in dict) {
                    level = 0;
                    t = dict[id];

                    while (t['parent_id'] !== undefined) {
                        if (t['count_direct'] === 0) {
                            var m = t;
                            while (m['parent_id'] !== undefined) {
                                dict[m['parent_id']]['count_leaf'] += 1;
                                m = dict[m['parent_id']];
                            }
                        }

                        t = dict[t['parent_id']];
                        ++level;
                    }

                    dict[id]['level'] = level;
                }

                return { 'set': result, 'dictionary': dict };
            };

            var root = data.data;
            var node_map = walk_bfs(root);
            var level_map = [], level_count = 0;
            var set = node_map['set'], dict = node_map['dictionary'];

            // Create a level map.
            for (id in dict) {
                t = dict[id];
                if (!level_map[t['level']]) {
                    level_map[t['level']] = { 'count_node': 0, 'nodes': [] };
                    level_count++;
                }

                level_map[t['level']]['count_node']++;
                level_map[t['level']]['nodes'].push(set[t['index']]['_id']);
            }

            // Make sure these two data structures is correct.
            //console.log(node_map);
            //console.log(level_map);

            // Scan node and edge value.
            var n_max = -Infinity, n_min = Infinity, n_sum = 0;
            var e_max = -Infinity, e_min = Infinity, e_sum = 0;

            for (i = 0; i < set.length; ++i) {
                dict[set[i]['_id']]['_color'] = options['color'][(i % options['color'].length)];

                var n_value = set[i]['node'][data['node_value_field']];
                if (core.is_number(n_value)) {
                    if (n_value > n_max) n_max = n_value;
                    if (n_value < n_min) n_min = n_value;
                    n_sum += n_value;
                }

                var e_value = set[i]['node'][data['edge_value_field']];
                if (core.is_number(e_value)) {
                    if (e_value > e_max) e_max = e_value;
                    if (e_value < e_min) e_min = e_value;
                    e_sum += e_value;
                }
            }

            // Calculate space.
            var width = chart_area['width'] - options['basictree']['padding-left'] - options['basictree']['padding-right'];
            var height = chart_area['height'] - options['basictree']['padding-top'] - options['basictree']['padding-bottom'];
            //console.log(width);
            //console.log(height);

            var zx = chart_area['top-left'][0] + options['basictree']['padding-left'];
            var zy = chart_area['top-left'][1] + options['basictree']['padding-top'];

            // Draw root node.
            x = zx + width / 2;
            y = zy + options['basictree']['node-max-radius'];

            var r_unit = (options['basictree']['node-max-radius'] - options['basictree']['node-min-radius']) / (n_max - n_min);
            if (n_max === n_min) r_unit = 0;

            var v_unit;
            if (level_count > 0) {
                v_unit = height / level_count;
            } else {
                v_unit = height;
            }

            var p_node, p_nodes = [];
            var p_label, p_labels = [];
            var p_box, p_boxes = [];

            // Draw nodes and edges.
            for (i = 0; i < level_map.length; ++i) {
                for (j = 0; j < level_map[i]['nodes'].length; ++j) {
                    var this_node = dict[level_map[i]['nodes'][j]];

                    if (i === 0) {
                        var this_e_value, this_node, this_parent, this_space;
                        var this_n_value = set[0]['node'][data['node_value_field']];
                        var this_radius = (this_n_value - n_min) * r_unit + options['basictree']['node-min-radius'];

                        p_node = paper.circle(x, y, this_radius).attr({
                            'stroke-width': options['basictree']['node-border-width'],
                            'stroke': dict[set[0]['_id']]['_color']['color'],
                            'fill': dict[set[0]['_id']]['_color']['color'],
                            'fill-opacity': dict[set[0]['_id']]['_color']['light-alpha']
                        }).translate(0.5, 0.5);
                        p_nodes.push(p_node);

                        dict[set[0]['_id']]['_x'] = x;
                        dict[set[0]['_id']]['_y'] = y;
                        dict[set[0]['_id']]['_r'] = this_radius;
                        dict[set[0]['_id']]['_space'] = width;
                        dict[set[0]['_id']]['_current'] = zx;
                    } else {
                        this_parent = dict[this_node['parent_id']];
                        this_space = this_parent['_space'] / this_parent['count_direct'];
                        this_n_value = set[this_node['index']]['node'][data['node_value_field']];
                        this_e_value = set[this_node['index']]['node'][data['edge_value_field']];
                        this_radius = (this_n_value - n_min) * r_unit + options['basictree']['node-min-radius'];

                        x = this_parent['_current'] + this_space / 2;

                        // node
                        p_node = paper.circle(x, y, this_radius).attr({
                            'stroke-width': options['basictree']['node-border-width'],
                            'stroke': this_node['_color']['color'],
                            'fill': this_node['_color']['color'],
                            'fill-opacity': this_node['_color']['light-alpha']
                        }).translate(0.5, 0.5);

                        // Draw node shadow.
                        if (options['layout']['shadow-enabled']) {
                            p_node.glow({
                                'width': options['layout']['shadow-width'],
                                'fill': false,
                                'opacity': options['layout']['shadow-alpha'],
                                'offsetx': options['layout']['shadow-offset-x'],
                                'offsety': options['layout']['shadow-offset-y'],
                                'color': options['layout']['shadow-color']
                            });
                        }

                        p_nodes.push(p_node);

                        this_parent['_current'] += this_space;
                        this_node['_x'] = x;
                        this_node['_y'] = y;
                        this_node['_space'] = this_space;
                        this_node['_r'] = this_radius;
                        this_node['_current'] = x - this_space / 2;
                    }

                    // node label.
                    var this_n_label = set[this_node['index']]['node'][data['node_label_field']];
                    if (this_n_label && options['basictree']['node-label-size'] > 0) {
                        p_label = paper.text(x, y, this_n_label).attr({
                            'text-anchor': 'middle',
                            'font-size': options['basictree']['node-label-size'],
                            'fill': options['basictree']['node-label-color']
                        }).translate(0.5, 0.5);
                        p_labels.push(p_label);
                    }

                    // Node action.
                    if (callback && typeof(callback) === 'function') {
                        p_node.data('info', {
                            'x': x,
                            'y': y,
                            'type': 'node',
                            'radius': this_radius,
                            'data': set[this_node['index']]['node'],
                            'callback': callback,
                            'that': that
                        });
                        p_node.click(core.element_action);

                        if (p_label) {
                            p_label.data('info', {
                                'x': x,
                                'y': y,
                                'type': 'label',
                                'radius': this_radius,
                                'data': set[this_node['index']]['node'],
                                'callback': callback,
                                'that': that
                            });
                            p_label.click(core.element_action);
                        }
                    }

                    // Node tooltip.
                    if (data['node_tooltip_title'] || data['node_tooltip_content']) {
                        var title = data['node_tooltip_title'];
                        var content = data['node_tooltip_content'];

                        var item = set[this_node['index']]['node'];
                        for (var p in item) {
                            title = title.replace('{' + p + '}', item[p]);
                            content = content.replace('{' + p + '}', item[p]);
                        }

                        p_node.data('tooltip', {
                            'id': 'n_' + i + '_' + j,
                            'title': title,
                            'content': content,
                            'color': dict[item['_id']]['_color'],
                            'x': x,
                            'y': y - this_radius,
                            'element': p_label,
                            'options': options,
                            'paper': paper
                        });
                        p_node.hover(core.element_tooltip);
                    }

                    // edge
                    if (this_parent) {
                        var cx = x, cy = y;
                        var px = this_parent['_x'], py = this_parent['_y'];
                        var angle = Math.atan((py - cy) / (px - cx));
                        var parent_radius = this_parent['_r'];

                        if (px >= cx) {
                            cx += this_radius * Math.cos(angle);
                            cy += this_radius * Math.sin(angle);
                            px -= parent_radius * Math.cos(angle);
                            py -= parent_radius * Math.sin(angle);
                        } else {
                            cx -= this_radius * Math.cos(angle);
                            cy -= this_radius * Math.sin(angle);
                            px += parent_radius * Math.cos(angle);
                            py += parent_radius * Math.sin(angle);
                        }

                        var p_edge = paper.path('M' + cx + ',' + cy + 'L' + px + ',' + py).attr({
                            'stroke-width': options['basictree']['edge-width'],
                            'stroke': options['basictree']['edge-color'],
                            'stroke-opacity': options['basictree']['edge-alpha']
                        }).translate(0.5, 0.5);

                        // Draw node shadow.
                        if (options['layout']['shadow-enabled']) {
                            p_edge.glow({
                                'width': options['layout']['shadow-width'],
                                'fill': false,
                                'opacity': options['layout']['shadow-alpha'],
                                'offsetx': options['layout']['shadow-offset-x'],
                                'offsety': options['layout']['shadow-offset-y'],
                                'color': options['layout']['shadow-color']
                            });
                        }

                        if (this_e_value && options['basictree']['edge-label-size'] > 0) {
                            var lx = (cx + px) / 2;
                            var ly = (cy + py) / 2;

                            // label box
                            var test_text = paper.text(-1000, -1000, this_e_value).attr({
                                'font-size': options['basictree']['edge-label-size']
                            }).translate(0.5, 0.5);
                            var this_box = test_text.getBBox();
                            var bwidth = this_box.width + options['basictree']['edge-box-padding-left'] + options['basictree']['edge-box-padding-right'];
                            var bheight = this_box.height + options['basictree']['edge-box-padding-top'] + options['basictree']['edge-box-padding-bottom'];

                            p_box = paper.rect(lx - bwidth / 2, ly - bheight / 2, bwidth, bheight, options['basictree']['edge-box-border-radius']).attr({
                                'stroke': options['basictree']['edge-box-border-color'],
                                'stroke-width': options['basictree']['edge-box-border-width'],
                                'stroke-opacity': options['basictree']['edge-box-border-alpha'],
                                'fill': options['basictree']['edge-box-background-color'],
                                'fill-opacity': options['basictree']['edge-box-background-alpha']
                            }).translate(0.5, 0.5);
                            p_boxes.push(p_box);

                            p_label = paper.text(lx, ly, this_e_value).attr({
                                'text-anchor': 'middle',
                                'font-size': options['basictree']['edge-label-size'],
                                'fill': options['basictree']['edge-label-color']
                            }).translate(0.5, 0.5);
                            p_labels.push(p_label);

                            // Node action.
                            if (callback && typeof(callback) === 'function') {
                                p_label.data('info', {
                                    'x': lx,
                                    'y': ly,
                                    'type': 'edge',
                                    'data': set[this_node['index']]['node'],
                                    'callback': callback,
                                    'that': that
                                });
                                p_label.click(core.element_action);
                            }

                            // Node tooltip.
                            if (data['edge_tooltip_title'] || data['edge_tooltip_content']) {
                                var title = data['edge_tooltip_title'];
                                var content = data['edge_tooltip_content'];

                                var item = set[this_node['index']]['node'];
                                for (var p in item) {
                                    title = title.replace('{' + p + '}', item[p]);
                                    content = content.replace('{' + p + '}', item[p]);
                                }

                                p_label.data('tooltip', {
                                    'id': 'e_' + i + '_' + j,
                                    'title': title,
                                    'content': content,
                                    'color': dict[item['_id']]['_color'],
                                    'x': lx,
                                    'y': ly - bheight / 2,
                                    'element': p_label,
                                    'options': options,
                                    'paper': paper
                                });
                                p_label.hover(core.element_tooltip);
                            }
                        }
                    }
                }

                y += v_unit;
            }

            for (i = 0; i < p_nodes.length; ++i) {
                p_nodes[i].toFront();
            }

            for (i = 0; i < p_boxes.length; ++i) {
                p_boxes[i].toFront();
            }

            for (i = 0; i < p_labels.length; ++i) {
                p_labels[i].toFront();
            }
        };
    });
});
