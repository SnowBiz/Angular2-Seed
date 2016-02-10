#!/bin/bash
set -ex

MODE=$1

echo =============================================================================
# go to project dir
SCRIPT_DIR=$(dirname $0)
cd $SCRIPT_DIR/../..

git config --global user.name "Travis-CI"
git config --global user.email "travis@w3ctag.org"

#if [[ $TRAVIS_BRANCH == 'master' ]]

mkdir .publish
cd .publish
git init
git clone https://github.com/SnowBiz/Angular2-Seed.git
cd Angular2-Seed
git checkout gh-pages
rm -rf *
mv ../../dist/* .
git add -A
git commit -m "Deploy from Travis CI"
git push --set-upstream "https://${GH_TOKEN}@github.com/snowbiz/snowbiz.github.io.git" gh-pages

#fi