#!/bin/bash

backup_apt () {
    dpkg --get-selections > ./apt/my_packages.list
    sudo cp -R /etc/apt/sources.list* ./apt/
    sudo apt-key exportall > ~/my_repo.keys
}

git_commit_push () {
    git add .
    git commit -m "Automated backup"
    git push origin master
}

main () {
    backup_apt
    git_commit_push
}

main
