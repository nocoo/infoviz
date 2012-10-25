srcdir = js/
destdir = min/

js_modules = 	${destdir}infoviz.barchart.js\
				${destdir}infoviz.basictree.js\
				${destdir}infoviz.bubblechart.js\
				${destdir}infoviz.core.js\
				${destdir}infoviz.foldertree.js\
				${destdir}infoviz.heatmap.js\
				${destdir}infoviz.js\
				${destdir}infoviz.linechart.js\
				${destdir}infoviz.piechart.js\
				${destdir}infoviz.radarchart.js\
				${destdir}infoviz.radialchart.js\
				${destdir}infoviz.smithgraph.js\
				${destdir}infoviz.stackchart.js\
				${destdir}infoviz.stockchart.js\
				${destdir}infoviz.streamchart.js\
				${destdir}infoviz.tagcloud.js\
				${destdir}infoviz.worldmap.js

.PHONY: clean prepare

all: prepare ${js_modules}
	@echo "All Done."

prepare:
	-mkdir ${destdir};
	cp ${srcdir}raphael.min.js ${destdir};
	cp ${srcdir}sea.min.js ${destdir};
	cp ${srcdir}html5.js ${destdir};

${destdir}infoviz.barchart.js: ${srcdir}infoviz.barchart.js
	java -jar bin/yuicompressor-2.4.7.jar -o $@ $^

${destdir}infoviz.basictree.js: ${srcdir}infoviz.basictree.js
	java -jar bin/yuicompressor-2.4.7.jar -o $@ $^

${destdir}infoviz.bubblechart.js: ${srcdir}infoviz.bubblechart.js
	java -jar bin/yuicompressor-2.4.7.jar -o $@ $^

${destdir}infoviz.core.js: ${srcdir}infoviz.core.js
	java -jar bin/yuicompressor-2.4.7.jar -o $@ $^

${destdir}infoviz.foldertree.js: ${srcdir}infoviz.foldertree.js
	java -jar bin/yuicompressor-2.4.7.jar -o $@ $^

${destdir}infoviz.heatmap.js: ${srcdir}infoviz.heatmap.js
	java -jar bin/yuicompressor-2.4.7.jar -o $@ $^

${destdir}infoviz.js: ${srcdir}infoviz.js
	java -jar bin/yuicompressor-2.4.7.jar -o $@ $^

${destdir}infoviz.linechart.js: ${srcdir}infoviz.linechart.js
	java -jar bin/yuicompressor-2.4.7.jar -o $@ $^

${destdir}infoviz.piechart.js: ${srcdir}infoviz.piechart.js
	java -jar bin/yuicompressor-2.4.7.jar -o $@ $^

${destdir}infoviz.radarchart.js: ${srcdir}infoviz.radarchart.js
	java -jar bin/yuicompressor-2.4.7.jar -o $@ $^

${destdir}infoviz.radialchart.js: ${srcdir}infoviz.radialchart.js
	java -jar bin/yuicompressor-2.4.7.jar -o $@ $^

${destdir}infoviz.smithgraph.js: ${srcdir}infoviz.smithgraph.js
	java -jar bin/yuicompressor-2.4.7.jar -o $@ $^

${destdir}infoviz.stackchart.js: ${srcdir}infoviz.stackchart.js
	java -jar bin/yuicompressor-2.4.7.jar -o $@ $^

${destdir}infoviz.stockchart.js: ${srcdir}infoviz.stockchart.js
	java -jar bin/yuicompressor-2.4.7.jar -o $@ $^

${destdir}infoviz.streamchart.js: ${srcdir}infoviz.streamchart.js
	java -jar bin/yuicompressor-2.4.7.jar -o $@ $^

${destdir}infoviz.tagcloud.js: ${srcdir}infoviz.tagcloud.js
	java -jar bin/yuicompressor-2.4.7.jar -o $@ $^

${destdir}infoviz.worldmap.js: ${srcdir}infoviz.worldmap.js
	java -jar bin/yuicompressor-2.4.7.jar -o $@ $^

clean:
	-rm -rf ${destdir}*.js;
