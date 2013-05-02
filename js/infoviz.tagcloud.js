/*
    InfoViz, TagCloud
    @copyright 2012 - 2013  Zheng Li <lizheng@lizheng.me>
    @github https://github.com/nocoo/InfoViz
    @license MIT
*/

define(function(require, exports, module) {
    require.async(['./infoviz.core'], function(core) {

        exports.draw_tagcloud = function(paper, chart_area, data, overwrite_options, callback, that) {
            if (!paper || !data) return idb('Paper or Data is empty.');

            var options = core.merge_options(overwrite_options), cache = [], x, y, i, j, item;
            var levels = options['tagcloud']['levels'] ? options['tagcloud']['levels'] : 8;

            // Find out max and min value.
            var v_max = -Infinity, v_min = Infinity, total_text_length = 0;
            for (i = 0; i < data['data'].length; ++i) {
                item = data['data'][i];

                if (item[data['value_field']] > v_max) {
                    v_max = item[data['value_field']];
                }

                if (item[data['value_field']] < v_min) {
                    v_min = item[data['value_field']];
                }

                total_text_length += item[data['text_field']].length;
            }

            // Map value to level.
            var text_map = [], this_level, test_text, this_box;
            for (i = 0; i < data['data'].length; ++i) {
                item = data['data'][i];

                this_level = Math.floor((levels - 1) * (item[data['value_field']] - v_min) / (v_max - v_min));
                this_size = options['tagcloud']['text-min-size'] + Math.floor(this_level * (options['tagcloud']['text-max-size'] - options['tagcloud']['text-min-size']) / levels);

                test_text = paper.text(-1000, -1000, item[data['text_field']]).attr({
                    'font-size': this_size
                }).translate(0.5, 0.5);
                this_box = test_text.getBBox();

                text_map.push({
                    'value': item[data['value_field']],
                    'text': item[data['text_field']],
                    'size': this_size,
                    'length': item[data['text_field']].length,
                    'level': this_level,
                    'width': this_box.width,
                    'height': this_box.height,
                    'index': i
                });
            }

            var cx = chart_area['top-left'][0] + chart_area['width'] / 2;
            var cy = chart_area['top-left'][1] + chart_area['height'] / 2;
            var rows = options['tagcloud']['row-count'], rows_map = [];

            // Initialize rows array.
            for (i = 0; i < rows; ++i) {
                rows_map.push({ 'node': [] });
            }

            // Make sure cy is in the middle.
            if (rows % 2 === 0) {
                cy -= options['tagcloud']['text-max-size'] / 2;
            }

            // Sort by size.
            text_map.sort(function(a, b) { return b['size'] - a['size']; });

            // Put text node into rows.
            for (i = 0; i < text_map.length; ++i) {
                rows_map[i % rows_map.length]['node'].push(text_map[i]);
            }

            var p_texts = [], this_text, todo = [];
            var last_max_height = 0, last_y1, last_y2, offset_x1, offset_x2, last_width1, last_width2;
            var dx, dy, index = 0;
            for (i = 0; i < rows_map.length; ++i) {
                if (i === 0) {
                    x = cx;
                    y = cy;
                    last_y1 = y;
                    last_y2 = y;
                } else {
                    x = cx;
                    if (i % 2 === 0) {
                        y = last_y1 - last_max_height;
                        last_y1 = y;
                    } else {
                        y = last_y2 + last_max_height;
                        last_y2 = y;
                    }
                }

                offset_x1 = 0;
                offset_x2 = 0;
                last_width1 = 0;
                last_width2 = 0;
                last_max_height = -Infinity;
                for (j = 0; j < rows_map[i]['node'].length; ++j) {
                    item = rows_map[i]['node'][j];
                    this_color = options['tagcloud']['color'][Math.floor((options['tagcloud']['color'].length - 1) * (item['level'] / (levels - 1)))];

                    if (j === 0) {
                        dx = x;
                        dy = y;
                        last_width1 = item['width'] + options['tagcloud']['horizontal-margin'];
                        last_width2 = item['width'] + options['tagcloud']['horizontal-margin'];
                    } else {
                        if (j % 2 === 0) {
                            offset_x1 -= last_width1 / 2 + item['width'] / 2;
                            dx = x + offset_x1;
                            last_width1 = item['width'] + options['tagcloud']['horizontal-margin'];
                        } else {
                            offset_x2 += last_width2 / 2 + item['width'] / 2;
                            dx = x + offset_x2;
                            last_width2 = item['width'] + options['tagcloud']['horizontal-margin'];
                        }
                    }

                    if (item['height'] > last_max_height) {
                        last_max_height = item['height'] + options['tagcloud']['vertical-margin'];
                    }

                    todo.push({ 'x': dx, 'y': dy, 'item': item, 'color': this_color, 'data': data['data'][item['index']] });
                    index++;
                }
            }

            // Draw text.
            for (i = todo.length - 1; i >= 0; --i) {
                this_text = paper.text(todo[i]['x'], todo[i]['y'], todo[i]['item']['text']).attr({
                    'font-size': todo[i]['item']['size'],
                    'fill': todo[i]['color']['color'],
                    'fill-opacity': todo[i]['color']['dark-alpha'],
                    'text-anchor': 'middle'
                }).translate(0.5, 0.5);
                p_texts.push(this_text);

                // Action.
                if (callback && typeof(callback) === 'function') {
                    this_text.data('info', {
                        'data': todo[i]['data'],
                        'item': todo[i]['item'],
                        'x': todo[i]['x'],
                        'y': todo[i]['y'],
                        'callback': callback,
                        'that': that
                    });
                    this_text.click(core.element_action);
                }

                // Tooltip.
                if (data['tooltip_title'] || data['tooltip_content']) {
                    var title = data['tooltip_title'];
                    var content = data['tooltip_content'];

                    for (var p in todo[i]['data']) {
                        title = title.replace('{' + p + '}', todo[i]['data'][p]);
                        content = content.replace('{' + p + '}', todo[i]['data'][p]);
                    }

                    this_text.data('tooltip', {
                        'id': i,
                        'title': title,
                        'content': content,
                        'color': this_color,
                        'x': todo[i]['x'],
                        'y': todo[i]['y'],
                        'element': this_text,
                        'options': options,
                        'paper': paper
                    });
                    this_text.hover(core.element_tooltip);
                }
            }

            // Animation.
            for (i = 0; i < p_texts.length; ++i) {
                (function(target) {
                    target.mouseover(function() {
                        target.animate({
                            'transform': 's1.5'
                        }, options['layout']['speed'], '>');
                    });
                    target.mouseout(function() {
                        target.animate({
                            'transform': ''
                        }, options['layout']['speed'], '<');
                    });
                })(p_texts[i]);
            }
        };
    });
});
