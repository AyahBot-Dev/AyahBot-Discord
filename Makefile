.PHONY: build
build:
	rm -rf build ||:
	yarn tsc
	cp package.json build
	cp .env build
	cp ecosystem.config.cjs build
	cd build
	sed -i "s/commonjs/module/" package.json
	yarn install --production
