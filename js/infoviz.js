/*
    InfoViz, Main Module
    @copyright 2012 - 2013  Zheng Li <lizheng@lizheng.me>
    @github https://github.com/nocoo/InfoViz
    @license MIT
*/

/*global define, Raphael*/
define(function(require, exports, module) {

    exports.version = function() { return '0.3.6'; };

    if (InfoViz) { return; }

    var InfoViz = {}, loading;
    InfoViz.charts = {};

    InfoViz.options = {
        // 1. Chart layout configuration.
        'layout': {
            'padding-top': 1,                   // padding-top
            'padding-right': 1,                 // padding-right
            'padding-bottom': 1,                // padding-bottom
            'padding-left': 1,                  // padding-left

            'background-color': '#FFF',         // global background color
            'background-alpha': 1,              // background opacity, you may set this value to 0, and add your
                                                // customize background as DOM container's background in CSS.

            'logo-enabled': false,              // is InfoViz logo enabled
            'logo-url': './images/infoviz_logo_tiny.png',
                                                // logo image url
            'logo-link': 'http://infoviz.org',  // destination page link after user click the logo
            'logo-width': 50,                   // logo width
            'logo-height': 17,                  // logo height
            'logo-position': 'top-right',       // logo position, top-right | top-left | bottom-right | bottom-left
            'logo-horizontal-margin': 10,       // logo margin in horizontal direction
            'logo-vertical-margin': 0,          // logo margin in vertical direction

            'loading-speed': 1000,              // loading icon rotation interval
            'loading-width': 30,                // loading icon width
            'loading-height': 30,               // loading icon height
            'loading-border-width': 1,          // border thickness of the loading icon
            'loading-border-alpha': 1,          // border opacity of the loading icon
            'loading-border-color': '#FFF',     // border color of the loading icon
            'loading-fill-alpha': 1,            // fill opacity of the loading icon
            'loading-fill-color': '#CCC',       // fill color of the loading icon
            'loading-background-alpha': 0.6,    // background opacity of the loading icon
            'loading-background-color': '#000', // background color of the loading icon

            'shadow-enabled': false,            // is shadow enabled
            'shadow-width': 4,                  // shadow area width
            'shadow-alpha': 0.6,                // shadow opacity
            'shadow-offset-x': 0,               // shadow horizontal offset
            'shadow-offset-y': 0,               // shadow vertical offset
            'shadow-color': '#DDD',             // shadow color

            'speed': 300                        // animation speed
        },

        // 2. Grid and axis configuration.
        'grid': {
            'padding-top': 10,                  // padding-top
            'padding-right': 10,                // padding-right
            'padding-bottom': 10,               // padding-bottom
            'padding-left': 10,                 // padding-left

            'grid-width': 1,                    // grid line thickness
            'grid-color': '#CCC',               // grid line color
            'grid-alpha': 0.5,                  // grid line opacity

            'axis-width': 1,                    // axis line thickness
            'axis-color': '#999',               // axis line color
            'axis-alpha': 1,                    // axis line opacity
            'axis-dot-size': 2.4,               // axis dot radius.
                                                // There're 3 axis dot, at the end of each axis, and one at (0, 0)

            'border-width': 1,                  // chart border thichness
            'border-color': '#DDD',             // chart border color
            'border-alpha': 1,                  // chart border opacity
            'border-radius': 4,                 // chart border corner radius

            'background-color': '#FFF',         // chart area background-color
            'background-alpha': 1.0,            // chart area background opacity

            'vertical-label-count': 10,         // label count on the left vertical axis
            'vertical-label-count-right': 10,   // label count on the right vertical axis
            'vertical-label-round': 1,          // keep n decimal places
            'vertical-label-margin': 5,         // distance from axis to vertical label
            'vertical-label-spacing': 40,       // vertical label max width
            'vertical-label-size': 12,          // vertical label font size
            'vertical-label-color': '#555',     // vertical label font color
            'vertical-name-size': 12,           // vertical axis name font size
            'vertical-name-color': '#000',      // vertical axis name font color
            'vertical-bar-width': 5,            // period bar width of the left vertical axis
            'vertical-bar-width-right': 5,      // period bar width of the right vertical axis

            'horizontal-label-margin': 5,       // distance from axis to horizontal label
            'horizontal-label-spacing': 10,     // horizontal label max height
            'horizontal-label-size': 12,        // horizontal label font size
            'horizontal-label-color': '#555',   // horizontal label font color
            'horizontal-label-rotate': 0,       // horizontal label rotating, in degrees
            'horizontal-name-size': 12,         // horizontal axis name font size
            'horizontal-name-color': '#000',    // horizontal axis name font color

            'enable-right-axis': false          // if right axis is enabled
        },

        // 3. Legend configuration.
        'legend': {
            'legend-enabled': true,             // is legend enabled
            'legend-position': 'top-left',      // legend position, top-right | top-left | bottom-right | bottom-left

            'width': undefined,                 // legend width, set this option to undefined to use auto width
            'height': undefined,                // legend height, set this option to undefined to use auto height

            'margin-top': 10,                   // margin-top
            'margin-right': 10,                 // margin-right
            'margin-bottom': 10,                // margin-bottom
            'margin-left': 10,                  // margin-left

            'padding-top': 5,                   // padding-top
            'padding-right': 8,                 // padding-right
            'padding-bottom': 5,                // padding-bottom
            'padding-left': 8,                  // padding-left

            'indicator-size': 14,               // legend indicator size
            'indicator-border-width': 1,        // legend indicator brush thickness
            'indicator-margin-left': 0,         // legend indicator margin-left
            'indicator-margin-right': 10,       // legend indicator margin-right
            'indicator-margin-top': 2,          // legend indicator margin-top
            'indicator-margin-bottom': 2,       // legend indicator margin-bottom
            'indicator-sector-angle': 50,       // sector type legend indicator angle

            'label-color': undefined,           // legend label font color
            'label-alpha': 1,                   // legend label font opacity
            'label-size': 12,                   // legend label font size

            'border-width': 1,                  // legend border thickness
            'border-color': '#CCC',             // legend border color
            'border-alpha': 1,                  // legend border opacity
            'border-radius': 4,                 // legend border radius

            'background-color': '#FDFDFD',      // legend background color
            'background-alpha': 1               // legend background opacity
        },

        // 4. Tooltip configuration.
        'tooltip': {
            'padding-top': 6,                   // padding-top
            'padding-right': 8,                 // padding-right
            'padding-bottom': 6,                // padding-bottom
            'padding-left': 8,                  // padding-left

            'border-width': 1,                  // tooltip border thickness
            'border-color': '#CCC',             // tooltip border color
            'border-alpha': 1,                  // tooltip border opacity
            'border-radius': 4,                 // tooltip border radius

            'title-text-color': undefined,      // tooltip title text font color
            'title-text-alpha': 1,              // tooltip title text font opacity
            'title-text-weight': 'bold',        // tooltip title text weight
            'title-text-size': 12,              // tooltip title text font size

            'line-spacing': 2,                  // distance between title and content
            'hide-when': 'mouse-out',           // 'mouse-out': when mouse is away from target element,
                                                // tooltip timer start to count down
                                                // 'mouse-in': tooltip timer start to count down immediately after
                                                // tooltip is shown

            'hide-after': 500,                  // tooltip will automatic hide in seconds
                                                // undefined or 0, tooltip will always be visible

            'content-text-color': '#999',       // tooltip content text font color
            'content-text-alpha': 1,            // tooltip content text font opacity
            'content-text-weight': 'normal',    // tooltip content text weight
            'content-text-size': 12,            // tooltip content text font size

            'background-color': '#FDFDFD',      // tooltip background color
            'background-alpha': 1,              // tooltip background alpha

            'horizontal-offset': 0,             // tooltip horizontal offset
            'vertical-offset': -10,             // tooltip vertical offset

            'speed': 100                        // tooltip animation
        },

        // 5. LineChart configuration.
        'linechart': {
            'padding-top': 30,                  // padding-top
            'padding-right': 100,               // padding-right
            'padding-bottom': 20,               // padding-bottom
            'padding-left': 30,                 // padding-left

            'line-width': 2,                    // LineChart line thickness
            'circle-radius': 5,                 // LineChart node circle radius
            'custom-circle': undefined,         // if you want to use a customized circle image, set this to image url
            'label-size': 12,                   // label font size

            'area-enabled': false,              // if area is enabled, area under every line will be highlighted
            'area-alpha': 0.1                   // area fill opacity
        },

        // 6. BubbleChart configuration.
        'bubblechart': {
            'padding-top': 40,                  // padding-top
            'padding-right': 100,               // padding-right
            'padding-bottom': 40,               // padding-bottom
            'padding-left': 60,                 // padding-left

            'circle-border-width': 2,           // bubble circle border thickness
            'circle-min-radius': 15,            // bubble circle max radius
            'circle-max-radius': 40,            // bubble circle min radius
            'label-size': 12,                   // bubble circle label font size
            'label-color': '#FFF',              // bubble circle label text color

            'horizontal-label-count': 10,       // label count in the horizontal axis
            'horizontal-bar-width': 5           // period bar width of the horizontal axis
        },

        // 7. BarChart configuration.
        'barchart': {
            'padding-top': 30,                  // padding-top
            'padding-right': 30,                // padding-right
            'padding-bottom': 20,               // padding-bottom
            'padding-left': 30,                 // padding-left

            'border-width': 1,                  // Bar border thickness

            'group-margin': 40,                 // margin value between bar groups
            'bar-margin': 4                     // margin value between bars (in the same group)
        },

        // 8. PieChart configuration.
        'piechart': {
            'size-factor': 0.9,                 // size factor, 0.9 means using 90% area to draw the chart
            'sector-border-width': 1,           // border thickness of pie sectors
            'hole-radius': 0,                   // hold radius, set this value to a positive number to make a RingChart
            'tooltip-position': 0.9,            // tooltip will be shown at this percentage of radius

            'label-size': 11,                   // label font size
            'label-distance': 5,                // distance from the outer size of pir and label
            'label-bar-width': 1,               // label pointer line thickness
            'label-bar-color': '#555',          // label pointer line color
            'label-bar-alpha': 1,               // label pointer line opacity
            'label-bar-length1': 5,             // label pointer first part length
            'label-bar-length2': 10,            // label pointer second part length

            'horizontal-offset': 0,             // chart center horizontal offset
            'vertical-offset': 0                // chart center vertical offset
        },

        // 9. RadarChart configuration.
        'radarchart': {
            'size-factor': 0.9,                 // size factor, 0.9 means using 90% area to draw the chart

            'outer-border-width': 1,            // outer border thickness
            'outer-border-color': '#999',       // outer border color
            'outer-border-alpha': 1,            // outer border opacity
            'outer-background-color': '#FFF',   // outer background color
            'outer-background-alpha': 1,        // outer background opacity

            'inner-border-width': 1,            // inner border thickness
            'inner-border-color': '#CCC',       // inner border color
            'inner-border-alpha': 1,            // inner border opacity
            'inner-background-color': '#F9F9F9',// inner background color
            'inner-background-alpha': 1,        // inner background opacity

            'axis-width': 2,                    // radius axis thickness
            'axis-color': '#999',               // radius axis color
            'axis-alpha': 1,                    // radius axis opacity

            'circle-min-radius': 30,            // radar circle min radius
            'circle-border-width': 1.5,         // radar circle line thickness
            'circle-background-alpha': 0.2,     // radar circle background opacity
                                                // (use this value instead of light-alpha of the color)

            'label-distance': 15,               // distance between outer border to label
            'label-color': '#555',              // label font color
            'label-size': 12,                   // label font size
            'label-rotation': false,            // is label rotated

            'horizontal-offset': 0,             // chart center horizontal offset
            'vertical-offset': 0                // chart center vertical offset
        },

        // 10. HeatMap
        'heatmap': {
            'horizontal-margin': 4,             // horizontal margin between boxes
            'vertical-margin': 4,               // vertical margin between boxes
            'box-border-width': 1,              // box border thickness
            'label-size': 12,                   // box label font size
            'label-color': '#FFF',              // box label font color
            'label-alpha': 1,                   // box label font opacity
            'sort-enabled': false,              // whether sort boxes by value

            'horizontal-count': undefined,      // horizontal box count, set this value to undefined to use auto layout
            'vertical-count': undefined,        // vertical box count, set this value to undefined to use auto layout

            'color': [                          // color definition for HeatMap, from light to dark
                { 'color': '#339999', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#99CC99', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#99CC33', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#CCCC33', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#FFCC33', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#FF6633', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#FF3333', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#CC0066', 'dark-alpha': 1, 'light-alpha': 0.45 }
            ]
        },

        // 11. TagCloud
        'tagcloud': {
            'levels': 10,                       // size levels
            'text-min-size': 10,                // min font size
            'text-max-size': 55,                // max font size
            'row-count': 5,                     // row count
            'horizontal-margin': 5,             // horizontal margin value between texts
            'vertical-margin': -10,             // vertical margin value between text lines
            'color': [                          // color definition for TagCloud, from light to dark
                { 'color': '#339999', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#99CC99', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#99CC33', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#CCCC33', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#FFCC33', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#FF6633', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#FF3333', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#CC0066', 'dark-alpha': 1, 'light-alpha': 0.45 }
            ]
        },

        // 12. SmithGraph
        'smithgraph': {
            'size-factor': 1,                   // size factor, 0.9 means using 90% area to draw the chart
            'bar-width': undefined,             // radial bar width, in angle. set to undefined to use auto value
            'bar-border-width': 1,              // border thickness of radial bars
            'bar-min-height': 15,               // min bar height
            'edge-margin': 5,                   // distance between edge and node bar
            'edge-border-width': 1,             // border thickness of radial edges
            'edge-background-alpha': 0.2,       // edge background opacity
            'hole-radius': 300,                 // hole radius

            'horizontal-offset': 0,             // graph center horizontal offset
            'vertical-offset': 0,               // graph center vertical offset

            'edge-color': [                        // color definition for SmithGraph edges, from light to dark
                { 'color': '#339999', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#99CC99', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#99CC33', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#CCCC33', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#FFCC33', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#FF6633', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#FF3333', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#CC0066', 'dark-alpha': 1, 'light-alpha': 0.45 }
            ]
        },

        // 13. RadialChart
        'radialchart': {
            'size-factor': 0.9,                 // size factor, 0.9 means using 90% area to draw the chart
            'bar-width': undefined,             // radial bar width, in angle. set to undefined to use auto value
            'bar-border-width': 1,              // border thickness of radial bars
            'bar-min-height': 15,               // min bar height
            'hole-radius': 50,                  // hole radius
            'tooltip-position': 0.9,            // tooltip will be shown at this percentage of radius

            'label-enabled': true,              // if label is visible
            'label-size': 11,                   // label font size
            'label-distance': 5,                // distance from the outer size of pir and label
            'label-bar-width': 1,               // label pointer line thickness
            'label-bar-color': '#555',          // label pointer line color
            'label-bar-alpha': 1,               // label pointer line opacity
            'label-bar-length1': 5,             // label pointer first part length
            'label-bar-length2': 10,            // label pointer second part length

            'horizontal-offset': 0,             // chart center horizontal offset
            'vertical-offset': 0                // chart center vertical offset
        },

        // 14. StackChart configuration.
        'stackchart': {
            'padding-top': 30,                  // padding-top
            'padding-right': 30,                // padding-right
            'padding-bottom': 0,                // padding-bottom
            'padding-left': 30,                 // padding-left

            'border-width': 1,                  // Bar border thickness

            'group-margin': 40,                 // margin value between bar groups
            'bar-margin': 0                     // margin value between bars (in the same group)
        },

        // 15. BasicTree configuration.
        'basictree': {
            'padding-top': 0,                   // padding-top
            'padding-right': 0,                 // padding-right
            'padding-bottom': 0,                // padding-bottom
            'padding-left': 0,                  // padding-left

            'node-border-width': 1,             // border thickness of tree nodes
            'node-max-radius': 40,              // max radius of tree nodes
            'node-min-radius': 30,              // min radius of tree nodes
            'node-label-size': 12,              // tree node label font size
            'node-label-color': '#FFF',         // tree node label font color
            'node-label-alpha': 1,              // tree node label font opacity

            'edge-width': 2,                    // tree edge thickness
            'edge-color': '#555',               // tree edge color
            'edge-alpha': 1,                    // tree edge opacity
            'edge-label-size': 12,              // tree edge label font size
            'edge-label-color': '#555',         // tree edge label font color
            'edge-label-alpha': 1,              // tree edge label font opacity

            'edge-box-padding-top': 2,          // padding-top
            'edge-box-padding-right': 4,        // padding-right
            'edge-box-padding-bottom': 2,       // padding-bottom
            'edge-box-padding-left': 4,         // padding-left
            'edge-box-border-width': 1,         // label box border thickness
            'edge-box-border-color': '#555',    // label box border color
            'edge-box-border-alpha': 1,         // label box border opacity
            'edge-box-border-radius': 4,        // label box border radius
            'edge-box-background-color': '#FFF',// label box background color
            'edge-box-background-alpha': 1      // label box background opacity
        },

        // 16. StockChart configuration.
        'stockchart': {
            'padding-top': 20,                  // padding-top
            'padding-right': 30,                // padding-right
            'padding-bottom': 10,               // padding-bottom
            'padding-left': 30,                 // padding-left

            'border-width': 1,                  // Bar border thickness

            'middle-line-width': 2,             // middle line thickness
            'middle-line-color': undefined,     // middle line color. set to undefined to use theme color
            'middle-line-alpha': 1,             // middle line opacity

            'group-margin': 40,                 // margin value between bar groups
            'bar-margin': 4                     // margin value between bars (in the same group)
        },

        // 17. WorldMap configuration.
        'worldmap': {
            'padding-top': 0,                   // padding-top
            'padding-right': 0,                 // padding-right
            'padding-bottom': 0,                // padding-bottom
            'padding-left': 0,                  // padding-left

            'levels': 8,                        // value levels, will be colored with different colors

            'sea-color': '#FFF',                // ocean area background color
            'sea-alpha': 1,                     // ocean area background opacity

            'border-color': '#AAA',             // area border color
            'border-alpha': 0.8,                // area border opacity
            'border-width': 1,                  // area border thickness

            'area-normal-color': '#EEE',        // normal area color
            'area-normal-alpha': 1,             // normal area opacity
            'area-highlight-color': '#eb540a',  // hovered area color
            'area-highlight-alpha': 1,          // hovered area opacity

            'horizontal-offset': 0,             // horizontal offset of the map
            'vertical-offset': 0,               // vertical offset of the map

            'color': [                          // color definition for WorldMap, from light to dark
                { 'color': '#339999', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#99CC99', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#99CC33', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#CCCC33', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#FFCC33', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#FF6633', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#FF3333', 'dark-alpha': 1, 'light-alpha': 0.45 },
                { 'color': '#CC0066', 'dark-alpha': 1, 'light-alpha': 0.45 }
            ]
        },

        // 18. StreamChart configuration.
        'streamchart': {
            'padding-top': 30,                  // padding-top
            'padding-right': 0,                 // padding-right
            'padding-bottom': 1,                // padding-bottom
            'padding-left': 1,                  // padding-left

            'border-width': 0                   // border thickness
        },

        // 19. FolderTreeTree configuration.
        'foldertree': {
            'padding-top': 20,                  // padding-top
            'padding-right': 0,                 // padding-right
            'padding-bottom': 0,                // padding-bottom
            'padding-left': 20,                 // padding-left

            'vertical-spacing': 10,             // vertical margin between nodes
            'horizontal-spacing': 10,           // horizontal margin between levels

            'node-border-width': 1,             // border thickness of tree nodes
            'node-type': 'circle',              // visual style of tree nodes
                                                // [ 'circle', 'box', 'line', 'area' ]
            'node-size': 10,                    // radius of tree nodes
            'node-label-spacing': 4,            // tree node label margin
            'node-label-size': 12,              // tree node label font size
            'node-label-alpha': 1,              // tree node label font opacity

            'edge-width': 1,                    // tree edge thickness
            'edge-color': '#999',               // tree edge color
            'edge-alpha': 1,                    // tree edge opacity
            'edge-horizontal-spacing': 4,       // tree edge horizontal margin
            'edge-vertical-spacing': 4          // tree edge vertical margin
        },

        // 0. Global color definition.
        'color': [                              // color definition, from light to dark
            { 'color': '#3A89C9', 'dark-alpha': 1, 'light-alpha': 0.6 },
            { 'color': '#EB540A', 'dark-alpha': 1, 'light-alpha': 0.6 },
            { 'color': '#5AAD34', 'dark-alpha': 1, 'light-alpha': 0.6 },
            { 'color': '#FECC09', 'dark-alpha': 1, 'light-alpha': 0.6 },
            { 'color': '#6699FF', 'dark-alpha': 1, 'light-alpha': 0.6 },
            { 'color': '#14B694', 'dark-alpha': 1, 'light-alpha': 0.6 },
            { 'color': '#104386', 'dark-alpha': 1, 'light-alpha': 0.6 },
            { 'color': '#DA0101', 'dark-alpha': 1, 'light-alpha': 0.6 }
        ]
    };

    exports.chart = function(element, type, data, overwrite_options, callback) {
        require.async(['./infoviz.core'], function(core) {
            var paper, options = core.merge_options(overwrite_options);
            var logo, logo_front = function() { if (logo) logo.toFront(); };
            var dom_element = document.getElementById(element);

            // Register this chart in global variable.
            dom_element.innerHTML = '';
            paper = Raphael(element);
            InfoViz.charts[element] = {
                'paper':  paper,
                'type':   type,
                'data':   data,
                'option': overwrite_options
            };

            // Default area.
            var area = {
                'top-left': [options['layout']['padding-left'], options['layout']['padding-top']],
                'top-right': [paper.width - options['layout']['padding-right'], options['layout']['padding-top']],
                'bottom-left': [options['layout']['padding-left'], paper.height - options['layout']['padding-bottom']],
                'bottom-right': [paper.width - options['layout']['padding-right'], paper.height - options['layout']['padding-bottom']],
                'width': paper.width,
                'height': paper.height
            };

            // Default background.
            paper.rect(0, 0, paper.width, paper.height).attr({
                'stroke': 'none',
                'fill': options['layout']['background-color'],
                'fill-opacity': options['layout']['background-alpha']
            });

            switch (type) {
                case 'linechart': {
                    area = core.draw_axis_background(paper, data, options);

                    require.async(['./infoviz.linechart'], function(linechart) {
                        linechart.draw_linechart(paper, area, data, options, callback);
                        logo_front();
                    });

                    break;
                }
                case 'bubblechart': {
                    area = core.draw_axis_background(paper, data, options);

                    require.async(['./infoviz.bubblechart'], function(bubblechart) {
                        bubblechart.draw_bubblechart(paper, area, data, options, callback);
                        logo_front();
                    });

                    break;
                }
                case 'barchart': {
                    area = core.draw_axis_background(paper, data, options);

                    require.async(['./infoviz.barchart'], function(barchart) {
                        barchart.draw_barchart(paper, area, data, options, callback);
                        logo_front();
                    });

                    break;
                }
                case 'piechart': {
                    area = core.draw_empty_background(paper, data, options);

                    require.async(['./infoviz.piechart'], function(piechart) {
                        piechart.draw_piechart(paper, area, data, options, callback);
                        logo_front();
                    });

                    break;
                }
                case 'radarchart': {
                    area = core.draw_empty_background(paper, data, options);

                    require.async(['./infoviz.radarchart'], function(radarchart) {
                        radarchart.draw_radarchart(paper, area, data, options, callback);
                        logo_front();
                    });

                    break;
                }
                case 'heatmap': {
                    area = core.draw_empty_background(paper, data, options);

                    require.async(['./infoviz.heatmap'], function(heatmap) {
                        heatmap.draw_heatmap(paper, area, data, options, callback);
                        logo_front();
                    });

                    break;
                }
                case 'tagcloud': {
                    area = core.draw_empty_background(paper, data, options);

                    require.async(['./infoviz.tagcloud'], function(tagcloud) {
                        tagcloud.draw_tagcloud(paper, area, data, options, callback);
                        logo_front();
                    });

                    break;
                }
                case 'smithgraph': {
                    area = core.draw_empty_background(paper, data, options);

                    require.async(['./infoviz.smithgraph'], function(smithgraph) {
                        smithgraph.draw_smithgraph(paper, area, data, options, callback);
                        logo_front();
                    });

                    break;
                }
                case 'radialchart': {
                    area = core.draw_empty_background(paper, data, options);

                    require.async(['./infoviz.radialchart'], function(radialchart) {
                        radialchart.draw_radialchart(paper, area, data, options, callback);
                        logo_front();
                    });

                    break;
                }
                case 'stackchart': {
                    area = core.draw_axis_background(paper, data, options);

                    require.async(['./infoviz.stackchart'], function(stackchart) {
                        stackchart.draw_stackchart(paper, area, data, options, callback);
                        logo_front();
                    });

                    break;
                }
                case 'basictree': {
                    area = core.draw_empty_background(paper, data, options);

                    require.async(['./infoviz.basictree'], function(basictree) {
                        basictree.draw_basictree(paper, area, data, options, callback);
                        logo_front();
                    });

                    break;
                }
                case 'stockchart': {
                    area = core.draw_axis_background(paper, data, options);

                    require.async(['./infoviz.stockchart'], function(barchart) {
                        barchart.draw_stockchart(paper, area, data, options, callback);
                        logo_front();
                    });

                    break;
                }
                case 'worldmap': {
                    area = core.draw_empty_background(paper, data, options);

                    require.async(['./infoviz.worldmap'], function(barchart) {
                        barchart.draw_worldmap(paper, area, data, options, callback);
                        logo_front();
                    });

                    break;
                }
                case 'streamchart': {
                    area = core.draw_axis_background(paper, data, options);

                    require.async(['./infoviz.streamchart'], function(barchart) {
                        barchart.draw_streamchart(paper, area, data, options, callback);
                        logo_front();
                    });

                    break;
                }
                case 'foldertree': {
                    area = core.draw_empty_background(paper, data, options);

                    require.async(['./infoviz.foldertree'], function(foldertree) {
                        foldertree.draw_foldertree(paper, area, data, options, callback);
                        logo_front();
                    });

                    break;
                }
                default: {
                    paper.text(
                        area['width'] / 2,
                        area['height'] / 2,
                        'Chart type "' + type + '" is not supported.'
                    ).attr({
                        'font-size': 12, 'fill': '#000'
                    }).translate(0.5, 0.5);

                    break;
                }
            }

            // Draw InfoViz logo.
            if (options['layout']['logo-enabled']) {
                var x, y;
                var margin_h = options['layout']['logo-horizontal-margin'];
                var margin_v = options['layout']['logo-vertical-margin'];

                switch (options['layout']['logo-position']) {
                    default:
                    case 'top-right': {
                        x = area['top-right'][0] - options['layout']['logo-width'] - margin_h;
                        y = area['top-right'][1] + margin_v;
                        break;
                    }
                    case 'top-left': {
                        x = area['top-left'][0] + margin_h;
                        y = area['top-right'][1] + margin_v;
                        break;
                    }
                    case 'bottom-left': {
                        x = area['bottom-left'][0] + margin_h;
                        y = area['bottom-left'][1] - options['layout']['logo-height'] - margin_v;
                        break;
                    }
                    case 'bottom-right': {
                        x = area['bottom-right'][0] - options['layout']['logo-width'] - margin_h;
                        y = area['bottom-right'][1] - options['layout']['logo-height'] - margin_v;
                        break;
                    }
                }

                logo = paper.image(
                    options['layout']['logo-url'],
                    x, y,
                    options['layout']['logo-width'],
                    options['layout']['logo-height']).attr({ 'cursor': 'pointer' }).translate(0.5, 0.5);
                logo.click(function() { window.location.href = options['layout']['logo-link']; });
            }
        });
    };

    exports.clear = function(element, with_loading) {
        var paper = InfoViz.charts[element].paper;

        if (paper && typeof (paper.clear) === 'function') {
            var width = paper.width, height = paper.height;

            if (with_loading) {
                if (loading) {
                    loading.stop();
                }

                var loading_icon = 'M24.083,15.5c-0.009,4.739-3.844,8.574-8.583,8.583c-4.741-0.009-8.577-3.844-8.585-8.583c0.008-4.741,3.844-8.577,8.585-8.585c1.913,0,3.665,0.629,5.09,1.686l-1.782,1.783l8.429,2.256l-2.26-8.427l-1.89,1.89c-2.072-1.677-4.717-2.688-7.587-2.688C8.826,3.418,3.418,8.826,3.416,15.5C3.418,22.175,8.826,27.583,15.5,27.583S27.583,22.175,27.583,15.5H24.083z';
                var scale_h = InfoViz.options['layout']['loading-width'] / 25;
                var scale_v = InfoViz.options['layout']['loading-height'] / 25;
                var offset_x = (width - InfoViz.options['layout']['loading-width']) / 2;
                var offset_y = (height - InfoViz.options['layout']['loading-height']) / 2;
                var transform = 't' + offset_x + ',' + offset_y + 's' + scale_h + ',' + scale_v + ',0,0';

                // Background
                paper.rect(0, 0, width, height).attr({
                    'fill': InfoViz.options['layout']['loading-background-color'],
                    'fill-opacity': InfoViz.options['layout']['loading-background-alpha']
                }).translate(0.5, 0.5);

                // Loading indicator.
                loading = paper.path(loading_icon).attr({
                    'stroke': InfoViz.options['layout']['loading-border-color'],
                    'stroke-opacity': InfoViz.options['layout']['loading-border-alpha'],
                    'stroke-width': InfoViz.options['layout']['loading-border-width'],
                    'fill': InfoViz.options['layout']['loading-fill-color'],
                    'fill-opacity': InfoViz.options['layout']['loading-fill-alpha']
                }).translate(0.5, 0.5);
                loading.transform(transform);

                var animation = Raphael.animation({
                    'transform': transform + 'r360'
                }, InfoViz.options['layout']['loading-speed']);

                loading.animate(animation.repeat(Infinity));
            } else {
                paper.clear();
            }
        }
    };

    exports.redraw = function(element, callback) {
        if (element) {
            var paper = InfoViz.charts[element].paper;
            var type = InfoViz.charts[element].type;
            var data = InfoViz.charts[element].data;
            var option = InfoViz.charts[element].option || {};

            if (paper && type && data) {
                exports.clear(element);
                exports.chart(element, type, data, option, callback);
            }
        }
    };

    exports.redraw_all = function() {
        var charts = InfoViz.charts, element;
        for (var item in charts) {
            exports.redraw(item);
        }
    };

    exports.global_option = function(overwrite) {
        require.async(['./infoviz.core'], function(core) {
            InfoViz.options = core.merge_options(overwrite);
        });
    };

    exports.enable_logo = function() {
        InfoViz.options['layout']['logo-enabled'] = true;
    };

    window.InfoViz = InfoViz;
});
