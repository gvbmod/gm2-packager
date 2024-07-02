@echo off
node build.js
git init
git add .
git commit -m "Upload main source code."
git branch -M main
git remote add origin https://github.com/gvbmod/gm2-packager.git
git push -f --no-verify origin main
cd dist
git init
git add .
git commit -m "Upload build of gm2-player"
git branch -M website
git remote add origin https://github.com/gvbmod/gm2-packager.git
git push -f --no-verify origin website