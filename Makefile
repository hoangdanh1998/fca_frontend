NAME = Talara
VERSION = 1.0

bootstrap:
	npm install

dev:
	npm run dev

test:
	yarn test

.PHONY: start bootstrap dev

build:
	make bootstrap
	@echo "Building project ..."
	npm run build

build-quick:
	@echo "Building project ..."
	npm run-script build

server:
	yarn build
	scp -r dist root@45.77.171.60:/usr/share/frontend
	rm -rf dist
deploy-production:
	tar cvf dist_frontend.tgz dist
	scp dist_frontend.tgz scripts/deploy_frontend.sh ubuntu@gu.talaria_production:/opt/talaria/deployment/
	ssh gu.talaria_production 'bash /opt/talaria/deployment/deploy_frontend.sh'
	rm dist_frontend.tgz
