all: infoviz.min.js
	@echo "All done."

.PHONY: clean

infoviz.min.js: js/infoviz.js
	java -jar bin/yuicompressor-2.4.7.jar -o $@ $^

clean:
	-rm -rf infoviz.min.js;
