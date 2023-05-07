#!/bin/bash
# To be run in root directory


define build_notification
    docker buildx build --platform=linux/amd64 -t notification-api .
	echo '================================'
	docker image tag notification-api eu.gcr.io/mdv1-313208/notification-api:$(shell cat './VERSION')
	docker image tag notification-api eu.gcr.io/mdv1-313208/notification-api:v2-latest
	docker push eu.gcr.io/mdv1-313208/notification-api:$(shell cat './VERSION')
	docker push eu.gcr.io/mdv1-313208/notification-api:v2-latest
endef

build_notification_api:
	$(call build_notification)


