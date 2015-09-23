#!/bin/env sh

# This script assumes:
# 1- There's a Git remote called "origin"
# 2- That remote contains a "gh-pages" branch

git branch -D gh-pages

git checkout -b gh-pages HEAD

mkdir dist

cp    demo.html dist/index.html
cp -r build     dist/build
cp -r lib       dist/lib

git add --force dist

git commit -m "Deploy to gh-pages"
git push --force origin `git subtree split --prefix dist gh-pages`:gh-pages
