/*
    InfoViz, FolderTree
    @copyright 2012 - 2013  Zheng Li <lizheng@lizheng.me>
    @github https://github.com/nocoo/InfoViz
    @license MIT
*/

define(function(require, exports, module) {
    require.async(['./infoviz.core'], function(core) {

        exports.draw_foldertree = function(paper, chart_area, data, overwrite_options, callback, that) {
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
                    'count_leaf': 0,
                    'count_total': 0
                };

                // Enqueue the root node.
                queue.push(root);

                var m, t, i, pid;
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
                            'count_leaf': 0,
                            'count_total': 0
                        };

                        // Enqueue t.
                        queue.push(t['children'][i]);
                    }
                }

                // Calculate level
                for (var id in dict) {
                    level = 0;
                    t = dict[id];

                    while (t['parent_id'] !== undefined) {
                        if (t['count_direct'] === 0) {
                            m = t;
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

                // Calculate count_total
                for (var id in dict) {
                    t = dict[id];
                    m = t;
                    while (m['parent_id'] !== undefined) {
                        dict[m['parent_id']]['count_total'] += 1;
                        m = dict[m['parent_id']];
                    }
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
            // console.log(node_map);
            // console.log(level_map);

            var zx = chart_area['top-left'][0] + options['foldertree']['padding-left'];
            var zy = chart_area['top-left'][1] + options['foldertree']['padding-top'];

            // Draw nodes and labels
            var node_size = options['foldertree']['node-size'];
            var p_node, p_nodes = [], p_label, p_labels = [], index = 0, p_edge;
            var this_node, this_color, this_parent, this_space, this_text;

            var draw_node = function (paper, x, y, size, type, color, thickness) {
                var node;
                switch (type) {
                    default:
                    case 'circle': {
                        node = paper.circle(x, y, size).attr({
                            'fill': color['color'],
                            'fill-opacity': color['light-alpha'],
                            'stroke': color['color'],
                            'stroke-opacity': color['dark-alpha'],
                            'stroke-width': thickness
                        }).translate(0.5, 0.5);

                        break;
                    }
                    case 'box': {
                        node = paper.rect(x - size, y - size, size * 2, size * 2).attr({
                            'fill': color['color'],
                            'fill-opacity': color['light-alpha'],
                            'stroke': color['color'],
                            'stroke-opacity': color['dark-alpha'],
                            'stroke-width': thickness
                        }).translate(0.5, 0.5);

                        break;
                    }
                    case 'line': {
                        cache = [];
                        x -= size;
                        y -= size;
                        size = 2 * size;

                        cache.push('M' + x + ',' + (y + size));
                        cache.push('L' + (x + 2 * size / 5) + ',' + (y + 2 * size / 5));
                        cache.push('L' + (x + 3 * size / 4) + ',' + (y + 5 * size / 7));
                        cache.push('L' + (x + size) + ',' + y);

                        node = paper.path(cache.join('')).attr({
                            'stroke': color['color'],
                            'stroke-opacity': color['dark-alpha'],
                            'stroke-width': thickness
                        }).translate(0.5, 0.5);

                        break;
                    }
                    case 'area': {
                        cache = [];
                        x -= size;
                        y -= size;
                        size = 2 * size;

                        cache.push('M' + x + ',' + (y + size));
                        cache.push('L' + (x + 2 * size / 5) + ',' + (y + 2 * size / 5));
                        cache.push('L' + (x + 3 * size / 4) + ',' + (y + 5 * size / 7));
                        cache.push('L' + (x + size) + ',' + y);
                        cache.push('L' + (x + size) + ',' + + (y + size));
                        cache.push('Z');

                        node = paper.path(cache.join('')).attr({
                            'fill': color['color'],
                            'fill-opacity': color['light-alpha'],
                            'stroke': color['color'],
                            'stroke-opacity': color['dark-alpha'],
                            'stroke-width': thickness
                        }).translate(0.5, 0.5);

                        break;
                    }
                }

                // Draw node shadow.
                if (options['layout']['shadow-enabled']) {
                    node.glow({
                        'width': options['layout']['shadow-width'],
                        'fill': false,
                        'opacity': options['layout']['shadow-alpha'],
                        'offsetx': options['layout']['shadow-offset-x'],
                        'offsety': options['layout']['shadow-offset-y'],
                        'color': options['layout']['shadow-color']
                    });
                }

                return node;
            };

            for (i = 0; i < level_map.length; ++i) {
                for (j = 0; j < level_map[i]['nodes'].length; ++j) {
                    this_node = dict[level_map[i]['nodes'][j]];
                    this_color = options['color'][(index++ % options['color'].length)];

                    if (i === 0) {
                        x = zx + node_size / 2;
                        y = zy + node_size / 2;

                        p_node = draw_node(paper, x, y, node_size, options['foldertree']['node-type'], this_color, options['foldertree']['node-border-width']);
                        p_nodes.push(p_node);

                        dict[set[0]['_id']]['_x'] = x;
                        dict[set[0]['_id']]['_y'] = y;
                        dict[set[0]['_id']]['_current'] = y + node_size * 2 + options['foldertree']['vertical-spacing'];
                    } else {
                        this_parent = dict[this_node['parent_id']];
                        this_space = (this_node['count_total'] + 1) * (node_size * 2) + this_node['count_total'] * options['foldertree']['vertical-spacing'];

                        x = this_parent['_x'] + node_size * 2 + options['foldertree']['horizontal-spacing'];
                        y = this_parent['_current'];

                        // node
                        p_node = draw_node(paper, x, y, node_size, options['foldertree']['node-type'], this_color, options['foldertree']['node-border-width']);
                        p_nodes.push(p_node);

                        this_parent['_current'] += this_space + options['foldertree']['vertical-spacing'];
                        this_node['_x'] = x;
                        this_node['_y'] = y;
                        this_node['_current'] = y + node_size * 2 + options['foldertree']['vertical-spacing'];

                        // edge
                        cache = [];
                        cache.push('M' + (x - node_size - options['foldertree']['edge-horizontal-spacing']) + ',' + y);
                        cache.push('L' + this_parent['_x'] + ',' + y);
                        cache.push('L' + this_parent['_x'] + ',' + (this_parent['_y'] + options['foldertree']['edge-vertical-spacing'] + node_size));
                        p_edge = paper.path(cache.join('')).attr({
                            'stroke-width': options['foldertree']['edge-width'],
                            'stroke': options['foldertree']['edge-color'],
                            'stroke-opacity': options['foldertree']['edge-alpha']
                        }).translate(0.5, 0.5);

                        // Draw edge shadow.
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
                    }

                    // label
                    this_text = data['node_text'];
                    item = set[this_node['index']]['node'];
                    for (var p in item) {
                        this_text = this_text.replace('{' + p + '}', item[p]);
                    }

                    p_label = paper.text(x + node_size + options['foldertree']['node-label-spacing'], y, this_text).attr({
                        'text-anchor': 'start',
                        'font-size': options['foldertree']['node-label-size'],
                        'fill': this_color['color'],
                        'fill-opacity': options['foldertree']['node-label-alpha']
                    }).translate(0.5, 0.5);
                    p_labels.push(p_label);

                    // node action
                    if (callback && typeof(callback) === 'function') {
                        p_node.data('info', {
                            'x': x,
                            'y': y,
                            'type': 'node',
                            'radius': node_size,
                            'data': set[this_node['index']]['node'],
                            'callback': callback,
                            'that': that
                        });
                        p_node.click(core.element_action);

                        p_label.data('info', {
                            'x': x,
                            'y': y,
                            'type': 'label',
                            'text': this_text,
                            'data': set[this_node['index']]['node'],
                            'callback': callback,
                            'that': that
                        });
                        p_label.click(core.element_action);
                    }

                    // node tooltip
                    if (data['node_tooltip_title'] || data['node_tooltip_content']) {
                        var title = data['node_tooltip_title'];
                        var content = data['node_tooltip_content'];

                        var item = set[this_node['index']]['node'];
                        for (var p in item) {
                            title = title.replace('{' + p + '}', item[p]);
                            content = content.replace('{' + p + '}', item[p]);
                        }

                        p_label.data('tooltip', {
                            'id': 'n_' + i + '_' + j,
                            'title': title,
                            'content': content,
                            'color': this_color,
                            'x': x,
                            'y': y - node_size,
                            'element': p_label,
                            'options': options,
                            'paper': paper
                        });
                        p_label.hover(core.element_tooltip);
                    }
                }
            }
        };
    });
});
