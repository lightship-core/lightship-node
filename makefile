.PHONY: start stop restart install development production types

start:
	docker-compose up --detach

stop:
	docker-compose down --remove-orphans --volumes --timeout 0

restart: stop start

install: start
	docker-compose exec node npm install

development: install
	docker-compose exec node npm run development

production: install
	docker-compose exec node npm run production

types: install
	docker-compose exec node npm run types
