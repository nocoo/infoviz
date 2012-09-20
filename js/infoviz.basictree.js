/*
	InfoViz, BasicTree
	@copyright 2012  Zheng Li <lizheng@lizheng.me>
	@github https://github.com/nocoo/InfoViz
	@license MIT
	@version 0.3.0
*/

define(function(require, exports, module) {
	seajs.use([ 'infoviz.core' ], function(core) {
		exports.draw_basictree = function(paper, chart_area, data, overwrite_options, callback, that) {
			if(!paper || !data) return idb('Paper or Data is empty.');
			
			var options = core.merge_options(overwrite_options), cache = [], x, y, i, j, item;

			/*var element_action = function(evt) { callback.call(that, this.data('info')); };
			var element_tooltip = function(evt) {
				x = this.data('tooltip')['x'];
				y = this.data('tooltip')['y'];
				core.draw_tooltip(paper, x, y, this.data('tooltip')['id'], this.data('tooltip')['title'], this.data('tooltip')['content'], this.data('tooltip')['color'], options);
			};*/

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
				while(queue.length > 0) {
					t = queue[0];
					queue = queue.slice(1);
					pid = t['_id'];

					if(!t['children']) t['children'] = [];
					for(i = 0; i < t['children'].length; ++i) {
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

				for(var id in dict) {
					level = 0;
					t = dict[id];

					while(t['parent_id'] !== undefined) {
						if(t['count_direct'] === 0) {
							var m = t;
							while(m['parent_id'] !== undefined) {
								dict[m['parent_id']]['count_leaf'] += 1;
								m = dict[m['parent_id']];
							}
						}
						
						t = dict[t['parent_id']]
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
			for(id in dict) {
				t = dict[id];
				if(!level_map[t['level']]) {
					level_map[t['level']] = { 'count_node': 0, 'nodes': [] };
					level_count++;
				}

				level_map[t['level']]['count_node']++;
				level_map[t['level']]['nodes'].push(set[t['index']]['_id']);
			}
			
			// Make sure these two data structures is correct.
			//console.log(node_map);
			//console.log(level_map);

			// Calculate space.
			var width = chart_area['width'] - options['basictree']['padding-left'] - options['basictree']['padding-right'];
			var height = chart_area['height'] - options['basictree']['padding-top'] - options['basictree']['padding-bottom'];
			//console.log(width);
			//console.log(height);
			
			var level_x = 0, level_y = 0, level, h_unit, v_unit;
			var this_radius, parent;

			if(level_count > 0) {
				v_unit = height / level_count;
			} else {
				v_unit = height;
			}
			
			for(i = 0; i < level_count; ++i) {
				level = level_map[i];
				
				if(level['count_node'] === 0) continue;

				h_unit = width / level['count_node'];
				x = chart_area['top-left'][0] + options['basictree']['padding-left'];
				y = level_y + options['basictree']['padding-top'] + options['basictree']['node-max-radius'];

				for(j = 0; j < level['count_node']; ++j) {

					//this_radius = options['basictree']['node-max-radius'];
					this_radius = 1;

					parent = dict[dict[level['nodes'][j]]['parent_id']];
					if(parent) {
						x = parent['_start'] + h_unit / 2;
						parent['_start'] += h_unit;
					} else {
						x += h_unit / 2;
					}
					
					paper.circle(x, y, this_radius).attr({
						'stroke-width': options['basictree']['node-border-width'],
						'stroke': 'red',
						'fill': 'red',
						'fill-opacity': 0.5
					}).translate(0.5, 0.5);

					// Log x and y.
					dict[level['nodes'][j]]['_x'] = x;
					dict[level['nodes'][j]]['_y'] = y;
					dict[level['nodes'][j]]['_start'] = x - h_unit / 2;

					x += h_unit;
				}

				level_y += v_unit;
			}
		};
	});
});