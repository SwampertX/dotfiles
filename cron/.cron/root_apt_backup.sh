#!/bin/bash
# this file is to be run as root crontab

cd /home/titanx/dotfiles

dpkg --get-selections > ./apt/my_packages.list
cp -R /etc/apt/sources.list* ./apt/
apt-key exportall > ./apt/my_repo.keys

# TODO: not sure if this part is needed
# ensure user can read it, not just root
chown -R titanx apt
