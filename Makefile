.PHONY: build
build:
	rm -rf build ||:
	yarn install
	yarn tsc
	cp package.json build
	cp .env build
	cp ecosystem.config.cjs build
	cd build
	yarn install --production
