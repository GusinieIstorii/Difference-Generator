install:
	npm ci

gendiff:
	node bin/gendiff.js

lint:
	npx eslint .

say-hello:
	echo Hello, World!

test:
	npx --experimental-vm-modules jest

test-coverage:
	npx jest --coverage