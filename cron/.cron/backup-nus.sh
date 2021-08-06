#!/bin/bash
set -euxo pipefail

notify-send "Beginning to backup NUS directory."
cd /home/yeejian/nus
git add .
git commit -m "Automated backup"
git push origin main
cd /home/yeejian/nus/nus-notes
git add .
git commit -m "Automated backup"
git push origin master
notify-send "Done backing up NUS directory."
