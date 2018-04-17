#!/bin/sh
cd ./content_builder
sudo yarn convert
cd ..
sudo yarn build
./deploy_production.sh
