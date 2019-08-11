#!/bin/bash

backup_apt () {
    dpkg --get-selections > ./apt/my_packages.list
    sudo cp -R /etc/apt/sources.list* ./apt/
    sudo apt-key exportall > ./apt/my_repo.keys
}

git_commit_push () {
    git add .
    sudo -u titanx git commit -m "Automated backup using backup.sh"
    sudo -u titanx git push origin master
}

main () {
    backup_apt
    git_commit_push
}

main
