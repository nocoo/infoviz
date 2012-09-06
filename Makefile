all: js/infoviz.min.js
	@echo "All done."

.PHONY: clean

js/infoviz.min.js: js/infoviz.js
	java -jar bin/yuicompressor-2.4.7.jar -o $@ $^

clean:
	-rm -rf js/infoviz.min.js;
