#!/bin/bash

git_commit_push () {
    git add .
    git commit -am "Automated backup using backup.sh"
    git push origin master
}

main () {
    cd /home/titanx/dotfiles
    git_commit_push
}

main
