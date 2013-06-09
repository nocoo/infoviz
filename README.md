![InfoViz](http://infoviz.org/images/infoviz_logo.png)

InfoViz is an information visualization library based on [Raphaël](http://raphaeljs.com/).
Raphaël currently supports Firefox 3.0+, Safari 3.0+, Chrome 5.0+, Opera 9.5+ and Internet Explorer 6.0+.

By the way, InfoViz supports iOS devices, include the new iPad with retina display.

[![Build Status](https://travis-ci.org/nocoo/infoviz.png)](https://travis-ci.org/nocoo/infoviz)

## Everything can be customized

You may overwrite almost every visual style in InfoViz charts. There's few magic numbers in InfoViz code, when we need a number, we add an option for you to overwrite.
Transparent background? Sure! Reverse color? Sure! Black and white? Sure!

See [Configurations](#8-configuration) to find out how.

## Introducing v0.3.x

We hate to change client APIs, but there's some changes you may have to do in your side to make it work with v0.3.x:

### New Module System

Since v0.3.x, InfoViz use [SeaJS](http://seajs.org/docs/) to seperate visualization controls into modules, you may use whatever you like, just make sure it supports CMD spec. Instead of load every control, it will load controls on demand.
It's a tradeoff between HTTP connections and one big big JavaScript file. We hope our module system could work well in most cases.

To use SeaJS module system:

```html
<script src="./js/raphael.min.js"></script>
<script src="./js/sea.min.js"></script>
<script>
    ;(function() {
        seajs.use([ './js/infoviz' ], function(InfoViz) {
            // Call InfoViz.chart here.
        });
    })();
</script>
```

or:

```html
<script src="./min/raphael.min.js"></script>
<script src="./min/sea.min.js"></script>
<script>
    ;(function() {
        seajs.use([ './min/infoviz' ], function(InfoViz) {
            // Use InfoViz.chart here.
        });
    })();
</script>
```

After you run the make command.

### jQuery is no longer needed

```javascript
InfoViz.chart(
    'i_linechart', // Give DOM element an id, and change this line from jQuery selector to id string, without #
    'linechart',
    {
        'vertical_axis_name': 'Vertical',
        'horizontal_axis_name': 'Horizontal',
        'horizontal_field': 'F2',
        'vertical_field': 'F1',
        'data': {
            // some data
        }
    }
);
```

Sorry for the inconvenient, but we think it was worth it.

# 1 AxisCharts

## 1.1 LineChart

### LineChart

![LineChart](http://infoviz.org/images/examples/linechart.png "LineChart")

A LineChart has a enumerable as horizontal field, and a value field as vertical field.

Demo: [Click Here](http://infoviz.org/test/linechart.html)

```javascript
InfoViz.chart(
    'i_linechart',
    'linechart',
    {
        'vertical_axis_name': 'Vertical',
        'horizontal_axis_name': 'Horizontal',
        'horizontal_field': 'F2',
        'vertical_field': 'F1',
        'data': {
            'line1': {
                'name': 'China',
                'data': [
                    { 'F1': 1,   'F2': 'A', 'F3': 3  },
                    { 'F1': 42,  'F2': 'B', 'F3': 6  },
                    { 'F1': 7,   'F2': 'C', 'F3': 9  },
                    { 'F1': 110, 'F2': 'D', 'F3': 12 }
                ]
            },
            'line2': {
                'name': 'Unite States',
                'data': [
                    { 'F1': 13, 'F2': 'A', 'F3': 15 },
                    { 'F1': 10, 'F2': 'B', 'F3': 12 },
                    { 'F1': 72, 'F2': 'C', 'F3': 9  },
                    { 'F1': 1,  'F2': 'D', 'F3': 3  },
                    { 'F1': 4,  'F2': 'E', 'F3': 6  }
                ]
            },
            'line3': {
                'name': 'Unite Kingdom',
                'data': [
                    { 'F1': 19, 'F2': 'A', 'F3': 15 },
                    { 'F1': 20, 'F2': 'B', 'F3': 12 },
                    { 'F1': 11, 'F2': 'D', 'F3': 3  },
                    { 'F1': 42, 'F2': 'E', 'F3': 6  }
                ]
            },
            'line4': {
                'name': 'Italy',
                'data': [
                    { 'F1': 29, 'F2': 'A', 'F3': 15 },
                    { 'F1': 70, 'F2': 'B', 'F3': 12 },
                    { 'F1': 42, 'F2': 'C', 'F3': 9  },
                    { 'F1': 51, 'F2': 'D', 'F3': 3  },
                    { 'F1': 22, 'F2': 'E', 'F3': 6  }
                ]
            },
            'line5': {
                'name': 'Russia',
                'data': [
                    { 'F1': 9,  'F2': 'A', 'F3': 15 },
                    { 'F1': 90, 'F2': 'B', 'F3': 12 },
                    { 'F1': 92, 'F2': 'C', 'F3': 9  },
                    { 'F1': 52, 'F2': 'E', 'F3': 6  }
                ]
            }
        }
    },
    { 'legend': { 'margin-top': 0 } }
);
```

### AreaChart

![AreaChart](http://infoviz.org/images/examples/areachart.png "AreaChart")

Some people may want to use an AreaChart to visualize their LineChart data. You can turn on area-enabled option in linechart configuration to enable it.

Demo: [Click Here](http://infoviz.org/test/linechart.html)

```javascript
InfoViz.chart(
    'i_linechart',
    'linechart',
    {
        'vertical_axis_name': 'Vertical',
        'horizontal_axis_name': 'Horizontal',
        'horizontal_field': 'F2',
        'vertical_field': 'F1',
        'data': {
            // ... Same with Normal LineChart
        }
    },
    { 'legend': { 'margin-top': 0 }, 'linechart': { 'area-enabled': true } }
);
```

### LineChart/AreaChart with right axis

LineChart now supports right axis, which provides second vertical field. Lines using right axis will be visualized as dotted lines.

![LineChart2](http://infoviz.org/images/examples/linechart2.png "LineChart2")

Demo: [Click Here](http://infoviz.org/test/linechart.html#test5)

To enable right axis in LineChart or AreaChart:

```javascript
InfoViz.chart(
    'i_linechart5',
    'linechart',
    {
        'vertical_axis_name': 'Left',
        'vertical_axis_name_right': 'Right', // Set right axis name here
        'horizontal_axis_name': 'Horizontal',
        'horizontal_field': 'F2',
        'vertical_field': [ 'F1', 'F3'], // Change single field name to array
        'tooltip_title': 'InfoViz {F2}',
        'tooltip_content': 'left: {F1}, right: {F3}',
        'data': {
            'line1': {
                'name': 'China(left)',
                'axis': 0, // Set axis index here
                'data': [
                    { 'F1': 1,   'F2': 'A', 'F3': 3  },
                    { 'F1': 42,  'F2': 'B', 'F3': 6  },
                    { 'F1': 7,   'F2': 'C', 'F3': 9  },
                    { 'F1': 110, 'F2': 'D', 'F3': 12 }
                ]
            },
            'line2': {
                'name': 'U.S.(left)',
                'axis': 0, // Set axis index here
                'data': [
                    { 'F1': 13, 'F2': 'A', 'F3': 15 },
                    { 'F1': 10, 'F2': 'B', 'F3': 12 },
                    { 'F1': 72, 'F2': 'C', 'F3': 9  },
                    { 'F1': 1,  'F2': 'D', 'F3': 3  },
                    { 'F1': 4,  'F2': 'E', 'F3': 6  }
                ]
            },
            'line3': {
                'name': 'U.K.(left)',
                'axis': 0, // Set axis index here
                'data': [
                    { 'F1': 19, 'F2': 'A', 'F3': 15 },
                    { 'F1': 20, 'F2': 'B', 'F3': 12 },
                    { 'F1': 11, 'F2': 'D', 'F3': 3  },
                    { 'F1': 42, 'F2': 'E', 'F3': 6  }
                ]
            },
            'line4': {
                'name': 'Italy(right)',
                'axis': 1, // Set axis index here
                'data': [
                    { 'F1': 29, 'F2': 'A', 'F3': 6  },
                    { 'F1': 70, 'F2': 'B', 'F3': 10 },
                    { 'F1': 42, 'F2': 'C', 'F3': 16 },
                    { 'F1': 51, 'F2': 'D', 'F3': 5  },
                    { 'F1': 22, 'F2': 'E', 'F3': 12 }
                ]
            },
            'line5': {
                'name': 'Russia(right)',
                'axis': 1, // Set axis index here
                'data': [
                    { 'F1': 9,  'F2': 'A', 'F3': 4  },
                    { 'F1': 90, 'F2': 'B', 'F3': 6  },
                    { 'F1': 92, 'F2': 'C', 'F3': 12 },
                    { 'F1': 52, 'F2': 'E', 'F3': 4 }
                ]
            }
        }
    },
    {
        'linechart': { 'area-enabled': true },
        'legend': { 'margin-top': 0 },
        'grid': { 'enable-right-axis': true } // Turn this option on
    },
    function(info) { console.log(info); }
);
```

## 1.2 BarChart

![BarChart](http://infoviz.org/images/examples/barchart.png "BarChart")

A BarChart has a enumerable as horizontal field, and a value field as vertical field.

Demo: [Click Here](http://infoviz.org/test/barchart.html)

```javascript
InfoViz.chart(
    'i_barchart',
    'barchart',
    {
        'vertical_axis_name': 'Vertical',
        'horizontal_axis_name': 'Horizontal',
        'horizontal_field': 'F2',
        'vertical_field': 'F1',
        'data': {
            'bar1': {
                'name': 'China',
                'data': [
                    { 'F1': 1,   'F2': 'A', 'F3': 3  },
                    { 'F1': 42,  'F2': 'B', 'F3': 6  },
                    { 'F1': 7,   'F2': 'C', 'F3': 9  },
                    { 'F1': 110, 'F2': 'D', 'F3': 12 }
                ]
            },
            'bar2': {
                'name': 'Unite States',
                'data': [
                    { 'F1': 13, 'F2': 'A', 'F3': 15 },
                    { 'F1': 10, 'F2': 'B', 'F3': 12 },
                    { 'F1': 72, 'F2': 'C', 'F3': 9  },
                    { 'F1': 1,  'F2': 'D', 'F3': 3  },
                    { 'F1': 4,  'F2': 'E', 'F3': 6  }
                ]
            },
            'bar3': {
                'name': 'Unite Kingdom',
                'data': [
                    { 'F1': 19, 'F2': 'A', 'F3': 15 },
                    { 'F1': 20, 'F2': 'B', 'F3': 12 },
                    { 'F1': 11, 'F2': 'D', 'F3': 3  },
                    { 'F1': 42, 'F2': 'E', 'F3': 6  }
                ]
            },
            'bar4': {
                'name': 'Italy',
                'data': [
                    { 'F1': 29, 'F2': 'A', 'F3': 15 },
                    { 'F1': 70, 'F2': 'B', 'F3': 12 },
                    { 'F1': 42, 'F2': 'C', 'F3': 9  },
                    { 'F1': 51, 'F2': 'D', 'F3': 3  },
                    { 'F1': 22, 'F2': 'E', 'F3': 6  }
                ]
            },
            'bar5': {
                'name': 'Russia',
                'data': [
                    { 'F1': 9,  'F2': 'A', 'F3': 15 },
                    { 'F1': 90, 'F2': 'B', 'F3': 12 },
                    { 'F1': 92, 'F2': 'C', 'F3': 9  },
                    { 'F1': 52, 'F2': 'E', 'F3': 6  }
                ]
            }
        }
    },
    { 'legend': { 'margin-top': 0 } }
);
```

### BarChart with right axis

BarChart now supports right axis, which provides second vertical field. Bars using right axis will be visualized with dotted border. To enable right axis in BarChart:

![BarChart2](http://infoviz.org/images/examples/barchart2.png "BarChart2")

Demo: [Click Here](http://infoviz.org/test/barchart.html#test5)

```javascript
InfoViz.chart(
    'i_barchart5',
    'barchart',
    {
        'vertical_axis_name': 'Left',
        'vertical_axis_name_right': 'Right', // Set right axis name here
        'horizontal_axis_name': 'Horizontal',
        'horizontal_field': 'F2',
        'vertical_field': [ 'F1', 'F3' ], // Change single field name to array
        'tooltip_title': 'InfoViz {F2}, {F3}',
        'tooltip_content': 'left: {F1}, right: {F3}',
        'data': {
            'bar1': {
                'name': 'China',
                'axis': 0, // Set axis index here
                'data': [
                    { 'F1': 1,   'F2': 'A', 'F3': 3  },
                    { 'F1': 42,  'F2': 'B', 'F3': 6  },
                    { 'F1': 7,   'F2': 'C', 'F3': 9  },
                    { 'F1': 110, 'F2': 'D', 'F3': 12 }
                ]
            },
            'bar2': {
                'name': 'Unite States',
                'axis': 0, // Set axis index here
                'data': [
                    { 'F1': 13, 'F2': 'A', 'F3': 15 },
                    { 'F1': 10, 'F2': 'B', 'F3': 12 },
                    { 'F1': 72, 'F2': 'C', 'F3': 9  },
                    { 'F1': 1,  'F2': 'D', 'F3': 3  },
                    { 'F1': 4,  'F2': 'E', 'F3': 6  }
                ]
            },
            'bar3': {
                'name': 'Unite Kingdom',
                'axis': 0, // Set axis index here
                'data': [
                    { 'F1': 19, 'F2': 'A', 'F3': 15 },
                    { 'F1': 20, 'F2': 'B', 'F3': 12 },
                    { 'F1': 11, 'F2': 'D', 'F3': 3  },
                    { 'F1': 42, 'F2': 'E', 'F3': 6  }
                ]
            },
            'bar4': {
                'name': 'Italy',
                'axis': 1, // Set axis index here
                'data': [
                    { 'F1': 29, 'F2': 'A', 'F3': 1 },
                    { 'F1': 70, 'F2': 'B', 'F3': 2 },
                    { 'F1': 42, 'F2': 'C', 'F3': 3 },
                    { 'F1': 51, 'F2': 'D', 'F3': 4 },
                    { 'F1': 22, 'F2': 'E', 'F3': 5 }
                ]
            },
            'bar5': {
                'name': 'Russia',
                'axis': 1, // Set axis index here
                'data': [
                    { 'F1': 9,  'F2': 'A', 'F3': 5 },
                    { 'F1': 90, 'F2': 'B', 'F3': 4 },
                    { 'F1': 92, 'F2': 'C', 'F3': 3 },
                    { 'F1': 52, 'F2': 'E', 'F3': 2 }
                ]
            }
        }
    },
    {
        'legend': { 'margin-top': 0 },
        'grid': { 'enable-right-axis': true } // Turn this option on
    },
    function(info) { console.log(info); }
);
```

## 1.3 BubbleChart

A BubbleChart has a value as horizontal field, and a value field as vertical field, also with a value field indicates its size.

![BubbleChart](http://infoviz.org/images/examples/bubblechart.png "BubbleChart")

Demo: [Click Here](http://infoviz.org/test/bubblechart.html)

```javascript
InfoViz.chart(
    'i_bubblechart',
    'bubblechart',
    {
        'vertical_axis_name': 'Vertical',
        'horizontal_axis_name': 'Horizontal',
        'horizontal_field': 'F1',
        'vertical_field': 'F2',
        'size_field': 'F3',
        'label_field': 'F4',
        'data': [
            { 'F1': 1,   'F2': 18, 'F3': 9, 'F4': 'CHN' },
            { 'F1': 42,  'F2': 30, 'F3': 6, 'F4': 'USA' },
            { 'F1': 7,   'F2': 35, 'F3': 9, 'F4': 'RUS' },
            { 'F1': 110, 'F2': 12, 'F3': 9, 'F4': 'CAN' },
            { 'F1': 50,  'F2': 19, 'F3': 2, 'F4': 'FRA' },
            { 'F1': 29,  'F2': 22, 'F3': 4, 'F4': 'VET' },
            { 'F1': 2,   'F2': 3,  'F3': 1, 'F4': 'JPN' }
        ]
    },
    {
        'bubblechart': { 'padding-right': 200 },
        'legend': { 'legend-position': 'top-right', 'margin-top': 40, 'margin-right': 0 }
    }
);
```

## 1.4 StackChart

A StackChart has a enumerable as horizontal field, and a value field as vertical field.

![StackChart](http://infoviz.org/images/examples/stackchart.png "StackChart")

Demo: [Click Here](http://infoviz.org/test/stackchart.html)

```javascript
InfoViz.chart(
    'i_stackchart',
    'stackchart',
    {
        'vertical_axis_name': 'Vertical',
        'horizontal_axis_name': 'Horizontal',
        'horizontal_field': 'F2',
        'vertical_field': 'F1',
        'tooltip_title': 'InfoViz {F2}, {F3}',
        'tooltip_content': 'Value: {F1}',
        'data': {
            'bar1': {
                'name': 'China',
                'data': [
                    { 'F1': 10, 'F2': 'A', 'F3': 3  },
                    { 'F1': 20, 'F2': 'B', 'F3': 6  },
                    { 'F1': 30, 'F2': 'C', 'F3': 9  },
                    { 'F1': 40, 'F2': 'D', 'F3': 12 }
                ]
            },
            'bar2': {
                'name': 'Unite States',
                'data': [
                    { 'F1': 40, 'F2': 'A', 'F3': 15 },
                    { 'F1': 30, 'F2': 'B', 'F3': 12 },
                    { 'F1': 20, 'F2': 'C', 'F3': 9  },
                    { 'F1': 10, 'F2': 'D', 'F3': 3  },
                    { 'F1': 15, 'F2': 'E', 'F3': 6  }
                ]
            },
            'bar3': {
                'name': 'Unite Kingdom',
                'data': [
                    { 'F1': 20, 'F2': 'A', 'F3': 15 },
                    { 'F1': 30, 'F2': 'B', 'F3': 12 },
                    { 'F1': 10, 'F2': 'D', 'F3': 3  },
                    { 'F1': 40, 'F2': 'E', 'F3': 6  }
                ]
            },
            'bar4': {
                'name': 'Italy',
                'data': [
                    { 'F1': 29, 'F2': 'A', 'F3': 15 },
                    { 'F1': 70, 'F2': 'B', 'F3': 12 },
                    { 'F1': 42, 'F2': 'C', 'F3': 9  },
                    { 'F1': 51, 'F2': 'D', 'F3': 3  },
                    { 'F1': 22, 'F2': 'E', 'F3': 6  }
                ]
            },
            'bar5': {
                'name': 'Russia',
                'data': [
                    { 'F1': 29,  'F2': 'A', 'F3': 15 },
                    { 'F1': 50, 'F2': 'B', 'F3': 12 },
                    { 'F1': 52, 'F2': 'C', 'F3': 9  },
                    { 'F1': 52, 'F2': 'E', 'F3': 6  }
                ]
            }
        }
    },
    { 'legend': { 'margin-top': 0 } }
);
```

## 1.5 StockChart

A StockChart is like a BarChart. In BarChart, each bar has only one vertical value, but in StockChart, each bar has three: max, middle and min value.

![StockChart](http://infoviz.org/images/examples/stockchart.png "StockChart")

Demo: [Click Here](http://infoviz.org/test/stockchart.html)

```javascript
InfoViz.chart(
    'i_stockchart',
    'stockchart',
    {
        'vertical_axis_name': 'Vertical',
        'horizontal_axis_name': 'Horizontal',
        'horizontal_field': 'F2',
        'vertical_field': { 'min': 'F4', 'middle': 'F5', 'max': 'F6' },
        'tooltip_title': 'InfoViz {F2}, {F3}',
        'tooltip_content': 'Tooltip: max={F6}, middle={F5}, min={F4}',
        'data': {
            'bar1': {
                'name': 'China',
                'data': [
                    { 'F1': 1,   'F2': 'A', 'F3': 3,  'F4': 1, 'F5': 2, 'F6': 5 },
                    { 'F1': 42,  'F2': 'B', 'F3': 6,  'F4': 3, 'F5': 4, 'F6': 4 },
                    { 'F1': 7,   'F2': 'C', 'F3': 9,  'F4': 2, 'F5': 3, 'F6': 4 },
                    { 'F1': 110, 'F2': 'D', 'F3': 12, 'F4': 4, 'F5': 5, 'F6': 6 }
                ]
            },
            'bar2': {
                'name': 'Unite States',
                'data': [
                    { 'F1': 13, 'F2': 'A', 'F3': 15, 'F4': 4, 'F5': 7,  'F6': 8  },
                    { 'F1': 10, 'F2': 'B', 'F3': 12, 'F4': 9, 'F5': 12, 'F6': 13 },
                    { 'F1': 72, 'F2': 'C', 'F3': 9,  'F4': 4, 'F5': 10, 'F6': 15 },
                    { 'F1': 1,  'F2': 'D', 'F3': 3,  'F4': 6, 'F5': 9,  'F6': 18 },
                    { 'F1': 4,  'F2': 'E', 'F3': 6,  'F4': 5, 'F5': 7,  'F6': 10 }
                ]
            },
            'bar3': {
                'name': 'Unite Kingdom',
                'data': [
                    { 'F1': 19, 'F2': 'A', 'F3': 15, 'F4': 1, 'F5': 7,  'F6': 12 },
                    { 'F1': 20, 'F2': 'B', 'F3': 12, 'F4': 2, 'F5': 8,  'F6': 15 },
                    { 'F1': 11, 'F2': 'D', 'F3': 3,  'F4': 3, 'F5': 9,  'F6': 17 },
                    { 'F1': 42, 'F2': 'E', 'F3': 6,  'F4': 4, 'F5': 10, 'F6': 11 }
                ]
            },
            'bar4': {
                'name': 'Italy',
                'data': [
                    { 'F1': 29, 'F2': 'A', 'F3': 15, 'F4': 5, 'F5': 8,  'F6': 10 },
                    { 'F1': 70, 'F2': 'B', 'F3': 12, 'F4': 8, 'F5': 10, 'F6': 12 },
                    { 'F1': 42, 'F2': 'C', 'F3': 9,  'F4': 2, 'F5': 11, 'F6': 15 },
                    { 'F1': 51, 'F2': 'D', 'F3': 3,  'F4': 4, 'F5': 7,  'F6': 17 },
                    { 'F1': 22, 'F2': 'E', 'F3': 6,  'F4': 3, 'F5': 7,  'F6': 19 }
                ]
            },
            'bar5': {
                'name': 'Russia',
                'data': [
                    { 'F1': 9,  'F2': 'A', 'F3': 15, 'F4': 1, 'F5': 5,  'F6': 13 },
                    { 'F1': 90, 'F2': 'B', 'F3': 12, 'F4': 3, 'F5': 13, 'F6': 16 },
                    { 'F1': 92, 'F2': 'C', 'F3': 9,  'F4': 5, 'F5': 15, 'F6': 18 },
                    { 'F1': 52, 'F2': 'E', 'F3': 6,  'F4': 9, 'F5': 10, 'F6': 15 }
                ]
            }
        }
    },
    { 'legend': { 'margin-top': 0 } }
);
```

## 1.6 StreamChart

A StreamChart is like an AreaChart. StreamChart shows percentage changes in different data fields.

![StreamChart](http://infoviz.org/images/examples/streamchart.png "StreamChart")

Demo: [Click Here](http://infoviz.org/test/streamchart.html)

```javascript
InfoViz.chart(
    'i_streamchart',
    'streamchart',
    {
        'vertical_axis_name': 'Vertical',
        'horizontal_axis_name': 'Horizontal',
        'horizontal_field': 'F1',
        'value_field': 'F2',
        'stream_field': 'F3',
        'tooltip_title': 'InfoViz {F3} {F1}',
        'tooltip_content': 'Tooltip: {F2}',
        'data': [
            {
                'F3': 'stream1',
                'data': [
                    { 'F1': 'No.1', 'F2': 1 },
                    { 'F1': 'No.2', 'F2': 2 },
                    { 'F1': 'No.3', 'F2': 3 },
                    { 'F1': 'No.4', 'F2': 4 },
                    { 'F1': 'No.5', 'F2': 5 }
                ]
            },
            {
                'F3': 'stream2',
                'data': [
                    { 'F1': 'No.1', 'F2': 2 },
                    { 'F1': 'No.2', 'F2': 3 },
                    { 'F1': 'No.3', 'F2': 4 },
                    { 'F1': 'No.4', 'F2': 5 },
                    { 'F1': 'No.5', 'F2': 6 }
                ]
            },
            {
                'F3': 'stream3',
                'data': [
                    { 'F1': 'No.1', 'F2': 7 },
                    { 'F1': 'No.2', 'F2': 5 },
                    { 'F1': 'No.3', 'F2': 2 },
                    { 'F1': 'No.4', 'F2': 1 },
                    { 'F1': 'No.5', 'F2': 2 }
                ]
            }
        ]
    }
);
```

# 2 Round Stuff

## 2.1 PieChart

![PieChart](http://infoviz.org/images/examples/piechart.png "PieChart")

A PieChart has a value as horizontal field.

Demo: [Click Here](http://infoviz.org/test/piechart.html)

```javascript
InfoViz.chart(
    'i_piechart1',
    'piechart',
    {
        'value_field': 'F2',
        'label_field': 'F4',
        'data': [
            { 'F1': 1,   'F2': 9, 'F3': 9, 'F4': 'CHN' },
            { 'F1': 42,  'F2': 9, 'F3': 6, 'F4': 'USA' },
            { 'F1': 7,   'F2': 9, 'F3': 9, 'F4': 'RUS' },
            { 'F1': 110, 'F2': 8, 'F3': 9, 'F4': 'CAN' },
            { 'F1': 50,  'F2': 3, 'F3': 2, 'F4': 'FRA' },
            { 'F1': 29,  'F2': 1, 'F3': 4, 'F4': 'VET' },
            { 'F1': 2,   'F2': 1, 'F3': 1, 'F4': 'JPN' }
        ]
    },
    { 'legend': { 'legend-enabled': false } }
);
```

## 2.2 RadarChart

![RadarChart](http://infoviz.org/images/examples/radarchart.png "RadarChart")

A RadarChart has a group of value fields.

Demo: [Click Here](http://infoviz.org/test/radarchart.html)

```javascript
InfoViz.chart(
    'i_radarchart1',
    'radarchart',
    {
        'value_fields': [ 'F1', 'F2', 'F3', 'F4', 'F5', 'F6' ],
        'name_field': 'F7',
        'value_maxs': [ 8, 8, 8, 8, 8, 8 ],
        'value_mins': [ 1, 1, 1, 1, 1, 1 ],
        'data': [
            { 'F1': 7, 'F2': 7, 'F3': 7, 'F4': 7, 'F5': 7, 'F6': 7, 'F7': 'China' },
            { 'F1': 6, 'F2': 6, 'F3': 6, 'F4': 6, 'F5': 6, 'F6': 6, 'F7': 'Unite States' },
            { 'F1': 5, 'F2': 5, 'F3': 5, 'F4': 5, 'F5': 5, 'F6': 5, 'F7': 'Unite Kingdom' },
            { 'F1': 4, 'F2': 4, 'F3': 4, 'F4': 4, 'F5': 4, 'F6': 4, 'F7': 'France' },
            { 'F1': 3, 'F2': 3, 'F3': 3, 'F4': 3, 'F5': 3, 'F6': 3, 'F7': 'Japan' },
            { 'F1': 2, 'F2': 2, 'F3': 2, 'F4': 2, 'F5': 2, 'F6': 2, 'F7': 'South Korea' },
            { 'F1': 1, 'F2': 1, 'F3': 1, 'F4': 1, 'F5': 1, 'F6': 1, 'F7': 'Russia' }
        ]
    },
    {
        'radarchart': { 'horizontal-offset': 60 },
        'legend': { 'legend-position': 'bottom-left', 'margin-left': 0, 'margin-bottom': 0 }
    }
);
```

Update:

In v0.3.3, we fix a bug in RadarChart, when there's only one or two circles in RadarChart. You must provide max and min value of each series, pass them in as value_maxs and value_mins.


## 2.3 RadialChart

![RadialChart](http://infoviz.org/images/examples/radialchart.png "RadialChart")

A RadialChart has a value field.

Demo: [Click Here](http://infoviz.org/test/radialchart.html)

```javascript
InfoViz.chart(
    'i_radialchart2',
    'radialchart',
    {
        'value_field': 'F1',
        'label_field': 'F2',
        'tooltip_title': 'Country: {F2}',
        'tooltip_content': 'Tooltip: {F2}',
        'data': [
            { 'F1': 6, 'F2': 'China' },
            { 'F1': 5, 'F2': 'Unite States' },
            { 'F1': 6, 'F2': 'Russia' },
            { 'F1': 5, 'F2': 'Japan' },
            { 'F1': 5, 'F2': 'Botswana' },
            { 'F1': 6, 'F2': 'Finland' },
            { 'F1': 5, 'F2': 'France' },
            { 'F1': 4, 'F2': 'Cape Verde' },
            { 'F1': 3, 'F2': 'Belize' },
            { 'F1': 4, 'F2': 'Georgia' },
            { 'F1': 5, 'F2': 'Haiti' },
            { 'F1': 6, 'F2': 'Hungary' },
            { 'F1': 3, 'F2': 'India' },
            { 'F1': 4, 'F2': 'Laos' },
            { 'F1': 5, 'F2': 'Kuwait' },
            { 'F1': 4, 'F2': 'Namibia' },
            { 'F1': 3, 'F2': 'Peru' }
        ]
    },
    {
        'legend': { 'margin-left': 0, 'margin-top': 5 },
        'radialchart': { 'horizontal-offset': 40, 'label-enabled': false }
    }
);
```

## 2.4 SmithGraph

![SmithGraph](http://infoviz.org/images/examples/smithgraph.png "SmithGraph")

A SmithGraph is a complex visulization graph offten been uesd to visualize many nodes and edges between them.
Each node has a value field, which will be visualized as bars with different height. Each node may also has one or more edges.
Each edge has a value field, and a destination node. Its value field will be visualized as color of the edge.

Demo: [Click Here](http://infoviz.org/test/smithgraph.html)

```javascript
InfoViz.chart(
    'i_smithgraph',
    'smithgraph',
    {
        'node_id_field': 'F1',
        'node_label_field': 'F1',
        'node_value_field': 'F2',
        'edge_value_field': 'F3',
        'node_tooltip_title': 'Node #{F1}',
        'node_tooltip_content': 'Value: {F2}. Edges: {F4}.',
        'data': [
            {
                'F1': 'item1',
                'F2': 1,
                'F4': 3,
                'edges': [
                    { 'to': 'item2', 'F3': 1 },
                    { 'to': 'item3', 'F3': 2 },
                    { 'to': 'item4', 'F3': 3 }
                ]
            },
            {
                'F1': 'item2',
                'F2': 2,
                'F4': 2,
                'edges': [
                    { 'to': 'item1', 'F3': 1 },
                    { 'to': 'item4', 'F3': 2 }
                ]
            },
            {
                'F1': 'item3',
                'F2': 3,
                'F4': 1,
                'edges': [
                    { 'to': 'item1', 'F3': 1 }
                ]
            },
            {
                'F1': 'item4',
                'F2': 4,
                'F4': 3,
                'edges': [
                    { 'to': 'item1', 'F3': 1 },
                    { 'to': 'item2', 'F3': 2 },
                    { 'to': 'item3', 'F3': 3 }
                ]
            }
        ]
    },
    { 'legend': { 'legend-enabled': false } }
);
```

# 3 Map

## 3.1 WorldMap

![WorldMap](http://infoviz.org/images/examples/worldmap.png "WorldMap")

A WorldMap is a global map, each area can has a value field indicates counts or frequency.

Demo: [Click Here](http://infoviz.org/test/worldmap.html)

```javascript
InfoViz.chart(
    'i_worldmap',
    'worldmap',
    {
        'value_field': 'F1',
        'tooltip_title': 'InfoViz: {area}',
        'tooltip_content': '{area}: value = {F1}',
        'data': [
            { 'area': 'BR', 'F1': 1 },
            { 'area': 'CH', 'F1': 2 },
            { 'area': 'CL', 'F1': 3 },
            { 'area': 'US', 'F1': 4 },
            { 'area': 'JP', 'F1': 7 },
            { 'area': 'MX', 'F1': 6 },
            { 'area': 'PE', 'F1': 7 },
            { 'area': 'ZA', 'F1': 8 },
            { 'area': 'ZW', 'F1': 9 },
            { 'area': 'RU', 'F1': 3 },
            { 'area': 'QA', 'F1': 2 },
            { 'area': 'NO', 'F1': 8 },
            { 'area': 'ML', 'F1': 4 },
            { 'area': 'KR', 'F1': 5 },
            { 'area': 'CN', 'F1': 8 },
            { 'area': 'TW', 'F1': 8 },
            { 'area': 'CU', 'F1': 7 },
            { 'area': 'ER', 'F1': 8 },
            { 'area': 'GH', 'F1': 9 },
            { 'area': 'HN', 'F1': 1 },
            { 'area': 'IN', 'F1': 2 },
            { 'area': 'AU', 'F1': 9 },
            { 'area': 'CA', 'F1': 7 },
            { 'area': 'IT', 'F1': 7 },
            { 'area': 'GB', 'F1': 5 },
            { 'area': 'FR', 'F1': 8 },
            { 'area': 'DE', 'F1': 6 },
            { 'area': 'PT', 'F1': 9 },
            { 'area': 'ES', 'F1': 5 },
            { 'area': 'SE', 'F1': 7 }
        ]
    }
);
```

In data of WorldMap, you must provide a two-letter short name to identify an area. A cheat sheet is available at global variable:

```javascript
console.log(InfoViz.WorldMap.names);
```

or

```javascript
console.log(InfoViz.WorldMap.areas);
```

## 3.2 HeatMap

![HeatMap](http://infoviz.org/images/examples/heatmap.png "HeatMap")

A HeatMap has a value field which indicator its load etc.

Demo: [Click Here](http://infoviz.org/test/heatmap.html)

```javascript
InfoViz.chart(
    'i_heatmap2',
    'heatmap',
    {
        'value_field': 'F1',
        'label_field': 'F4',
        'data': [
            { 'F1': 14, 'F2': 1,  'F3': 9, 'F4': 'M1'  },
            { 'F1': 42, 'F2': 1,  'F3': 6, 'F4': 'USA' },
            { 'F1': 7,  'F2': 1,  'F3': 9, 'F4': 'RUS' },
            { 'F1': 11, 'F2': 12, 'F3': 9, 'F4': 'CAN' },
            { 'F1': 50, 'F2': 19, 'F3': 2, 'F4': 'FRA' },
            { 'F1': 29, 'F2': 22, 'F3': 4, 'F4': 'VET' },
            { 'F1': 2,  'F2': 3,  'F3': 1, 'F4': 'JPN' },
            { 'F1': 1,  'F2': 1,  'F3': 9, 'F4': 'M1'  },
            { 'F1': 42, 'F2': 1,  'F3': 6, 'F4': 'USA' },
            { 'F1': 7,  'F2': 1,  'F3': 9, 'F4': 'RUS' },
            { 'F1': 11, 'F2': 12, 'F3': 9, 'F4': 'CAN' },
            { 'F1': 50, 'F2': 19, 'F3': 2, 'F4': 'FRA' },
            { 'F1': 29, 'F2': 22, 'F3': 4, 'F4': 'VET' },
            { 'F1': 2,  'F2': 3,  'F3': 1, 'F4': 'JPN' },
            { 'F1': 1,  'F2': 1,  'F3': 9, 'F4': 'M1'  },
            { 'F1': 42, 'F2': 1,  'F3': 6, 'F4': 'USA' },
            { 'F1': 7,  'F2': 1,  'F3': 9, 'F4': 'RUS' },
            { 'F1': 11, 'F2': 12, 'F3': 9, 'F4': 'CAN' },
            { 'F1': 50, 'F2': 19, 'F3': 2, 'F4': 'FRA' },
            { 'F1': 29, 'F2': 22, 'F3': 4, 'F4': 'VET' }
        ]
    },
    {
        'layout': { 'logo-position': 'bottom-right' },
        'heatmap': { 'label-size': 20 }
    }
);
```

Note there's an option in heatmap section named sort-enabled. Turn this option to true, you will get this:

![HeatMap](http://infoviz.org/images/examples/heatmap2.png "HeatMap")

# 4 Tree

## 4.1 BasicTree

![BasicTree](http://infoviz.org/images/examples/basictree.png "BasicTree")

A BasicTree can visualize tree structure data. BasicTree has a top-down layout, root node is in the top.

Demo: [Click Here](http://infoviz.org/test/basictree.html)

```javascript
InfoViz.chart(
    'i_basictree',
    'basictree',
    {
        'node_label_field': 'F1',
        'node_value_field': 'F2',
        'edge_value_field': 'F3',
        'node_tooltip_title': 'Node #{F1}',
        'node_tooltip_content': 'Value: {F1}.{F2}',
        'edge_tooltip_title': 'Edge #{F1}',
        'edge_tooltip_content': 'Value: {F2}.{F3}',
        'data': {
            'F1': 'Frankfurt', 'F2': 1, 'children': [
                {
                    'F1': 'Mannheim', 'F2': 2, 'F3': 85, 'children': [
                        {
                            'F1': 'Karlsruhe', 'F2': 3, 'F3': 80, 'children': [
                                { 'F1': 'Augsburg', 'F2': 1, 'F3': 250 },
                                { 'F1': 'Augsburg', 'F2': 1, 'F3': 250 }
                            ]
                        }
                    ]
                },
                {
                    'F1': 'Würzburg', 'F2': 3, 'F3': 217, 'children': [
                        { 'F1': 'Erfurt', 'F2': 4, 'F3': 186 },
                        { 'F1': 'Nürnberg', 'F2': 2, 'F3': 103 },
                        { 'F1': 'Erfurt', 'F2': 4, 'F3': 186, 'children': [
                                { 'F1': 'München', 'F2': 5, 'F3': 167 }
                            ]
                        }
                    ]
                },
                {
                    'F1': 'Kassel', 'F2': 2, 'F3': 173, 'children': [
                        { 'F1': 'Stuggart', 'F2': 3, 'F3': 99, 'children': [
                                { 'F1': 'München', 'F2': 5, 'F3': 167 },
                                { 'F1': 'Augsburg', 'F2': 1, 'F3': 250 }
                            ]
                        }
                    ]
                }
            ]
        }
    }
);
```

## 4.2 FolderTree

![FolderTree](http://infoviz.org/images/examples/foldertree.png "FolderTree")

A FolderTree can visualize tree structure data. FolderTree has a top-down layout, just like folder layout file system.

Demo: [Click Here](http://infoviz.org/test/foldertree.html)

```javascript
InfoViz.chart(
    'i_foldertree1',
    'foldertree',
    {
        'node_label_field': 'F1',
        'node_value_field': 'F2',
        'edge_value_field': 'F3',
        'node_tooltip_title': 'Node #{F1}',
        'node_tooltip_content': 'Value: {F1}.{F2}',
        'node_text': 'NodeText #{F1}',
        'data': {
            'F1': 'Frankfurt', 'F2': 1, 'children': [
                {
                    'F1': 'Mannheim', 'F2': 2, 'F3': 85, 'children': [
                        {
                            'F1': 'Karlsruhe', 'F2': 3, 'F3': 80, 'children': [
                                { 'F1': 'Augsburg', 'F2': 1, 'F3': 250 },
                                { 'F1': 'Augsburg', 'F2': 1, 'F3': 250 }
                            ]
                        }
                    ]
                },
                {
                    'F1': 'Würzburg', 'F2': 3, 'F3': 217, 'children': [
                        { 'F1': 'Erfurt', 'F2': 4, 'F3': 186 },
                        { 'F1': 'Nürnberg', 'F2': 2, 'F3': 103 },
                        { 'F1': 'Erfurt', 'F2': 4, 'F3': 186, 'children': [
                                { 'F1': 'München', 'F2': 5, 'F3': 167 }
                            ]
                        }
                    ]
                },
                {
                    'F1': 'Kassel', 'F2': 2, 'F3': 173, 'children': [
                        { 'F1': 'Stuggart', 'F2': 3, 'F3': 99, 'children': [
                                { 'F1': 'München', 'F2': 5, 'F3': 167 },
                                { 'F1': 'Augsburg', 'F2': 1, 'F3': 250 }
                            ]
                        }
                    ]
                }
            ]
        }
    }, {},
    function(info) { console.log(info); }
);
```

# 5 Cloud

## 5.1 TagCloud

![TagCloud](http://infoviz.org/images/examples/tagcloud.png "TagCloud")

A TagCloud has a text string, and a value field to indicator its frequency.

Demo: [Click Here](http://infoviz.org/test/tagcloud.html)

```javascript
InfoViz.chart(
    'i_tagcloud1',
    'tagcloud',
    {
        'value_field': 'F1',
        'text_field': 'F2',
        'data': [
            { 'F1': 24, 'F2': 'China' },
            { 'F1': 23, 'F2': 'Unite States' },
            { 'F1': 22, 'F2': 'Russia' },
            { 'F1': 21, 'F2': 'Japan' },
            { 'F1': 20, 'F2': 'Botswana' },
            { 'F1': 19, 'F2': 'Finland' },
            { 'F1': 18, 'F2': 'France' },
            { 'F1': 17, 'F2': 'Cape Verde' },
            { 'F1': 16, 'F2': 'Belize' },
            { 'F1': 15, 'F2': 'Georgia' },
            { 'F1': 14, 'F2': 'Haiti' },
            { 'F1': 13, 'F2': 'Hungary' },
            { 'F1': 12, 'F2': 'India' },
            { 'F1': 11, 'F2': 'Laos' },
            { 'F1': 10, 'F2': 'Kuwait' },
            { 'F1': 9,  'F2': 'Namibia' },
            { 'F1': 8,  'F2': 'Peru' },
            { 'F1': 7,  'F2': 'Qatar' },
            { 'F1': 6,  'F2': 'Spain' },
            { 'F1': 5,  'F2': 'Thailand' },
            { 'F1': 4,  'F2': 'Ukraine' },
            { 'F1': 3,  'F2': 'Vanuatu' },
            { 'F1': 2,  'F2': 'Zambia' },
            { 'F1': 1,  'F2': 'Palestine' }
        ]
    }
);
```

# 6 Flow

# 7 Chart Accessories

## 7.1 Legend

Legend is enabled by default. Legend visual style can be customized in legend section.
Check out legend section in [Configurations](#8-configuration) to find out how to customize a legend.

## 7.2 Interaction Callback

You may define a event handler as the 5 parametor of InfoViz.chart. This handler will be called when user click on a chart element.

```javascript
InfoViz.chart(
    element,
    type,
    data,
    overwrite_option,
    function(info) {
        console.log(info);
    }
);
```

## 7.3 Tooltip

You may pass 'tooltip_title' and/or 'tooltip_content' into data to enable tooltip. Tooltip visual style can be customized in tooltip section.
Check out tooltip section in [Configurations](#8-configuration) to find out how to customize a tooltip.

```javascript
InfoViz.chart(
    'i_bubblechart',
    'bubblechart',
    {
        'vertical_axis_name': 'Vertical',
        'horizontal_axis_name': 'Horizontal',
        'horizontal_field': 'F1',
        'vertical_field': 'F2',
        'size_field': 'F3',
        'label_field': 'F4',

        'tooltip_title': 'InfoViz {F2}, {F3}',
        'tooltip_content': 'Tooltip: {F1}, {F2} | {F3}',

        'data': [
            { 'F1': 1,   'F2': 18, 'F3': 9, 'F4': 'CHN' },
            { 'F1': 42,  'F2': 30, 'F3': 6, 'F4': 'USA' },
            { 'F1': 7,   'F2': 35, 'F3': 9, 'F4': 'RUS' },
            { 'F1': 110, 'F2': 12, 'F3': 9, 'F4': 'CAN' },
            { 'F1': 50,  'F2': 19, 'F3': 2, 'F4': 'FRA' },
            { 'F1': 29,  'F2': 22, 'F3': 4, 'F4': 'VET' },
            { 'F1': 2,   'F2': 3,  'F3': 1, 'F4': 'JPN' }
        ]
    },
    {
        'tooltip': { 'speed': 300 }
    }
);
```

## 7.4 Refresh a InfoViz chart data

![Loading](http://infoviz.org/images/examples/loading.png "Loading")

When you what to visualize a different data set in a HTML element, you can call InfoViz.chart again with new data:

```javascript
InfoViz.chart(
    element,
    type,
    data,
    overwrite_option,
    function(info) {
        console.log(info);
    }
);
```

If you want to empty target HTML element, you can call:

```javascript
InfoViz.clear(element);
```

There's also a parameter in clear, to enable loading animation:

```javascript
InfoViz.clear(element, true);
```

Check out layout section in [Configurations](#8-configuration) to find out how to customize loading effect.

# 8 Configuration

## 8.1 How to overwrite a style

### Global

Call InfoViz.global_option, and pass in your option object to change options globally.

```javascript
InfoViz.global_option({
    'layout': { 'background-color': '#CDCDCD' }
});
```

### Single

When you using InfoViz.chart to create a chart, you may pass in your option object as the last parametor. This option will effect this chart only.

```javascript
InfoViz.chart(
    'i_piechart1',
    'piechart',
    {
        'value_field': 'F2',
        'label_field': 'F4',
        'data': [
            { 'F1': 1,   'F2': 18, 'F3': 9, 'F4': 'CHN' },
            { 'F1': 42,  'F2': 30, 'F3': 6, 'F4': 'USA' },
            { 'F1': 7,   'F2': 35, 'F3': 9, 'F4': 'RUS' },
            { 'F1': 110, 'F2': 12, 'F3': 9, 'F4': 'CAN' },
            { 'F1': 50,  'F2': 19, 'F3': 2, 'F4': 'FRA' },
            { 'F1': 29,  'F2': 22, 'F3': 4, 'F4': 'VET' },
            { 'F1': 2,   'F2': 3,  'F3': 1, 'F4': 'JPN' }
        ]
    },
    {
        'layout': { 'background-color': '#CDCDCD' }
    }
);
```

## 8.2 Options

```javascript
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
        'border-color': '#AAA',             // chart border color
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
```

## 8.3 Dependencies

* Raphaël: [http://raphaeljs.com/](http://raphaeljs.com/)
* Any CMD loader, such as [SeaJS](http://seajs.org/docs/)

# 9 License

(The MIT License)

Copyright (c) 2012 - 2013 Zheng Li

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
