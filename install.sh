#!/bin/bash

# this file should, at the very least, populate the dot files.
# if possible, it should install packages/clone repos that the 
#   current config requires.

stow_packages () {
    sudo apt install stow -y
    for pkg in $(ls)
    do
        if [ $pkg = "apt" ]
        then
            continue
        fi
        stow $pkg
    done
}

update_packages () {
    sudo apt update && sudo apt upgrade -y
}

install_programs () {
    # TODO: clean install
    # cd scripts # TODO: add a scripts folder
    # chmod +x *
    # # you can commented out unwanted lines.
    # ./install_zsh #zsh, oh-my-zsh, powerlevel10k, powerline, fontcache
    # ./install_alacritty #alacritty
    # ./install_i3wm #i3, fontawesome, i3lock, i3blocks
    # ./install_cli_alternatives #alternatives: rg, fzf, fasd, fd
    # ./install_nvim #vim, nvim, plugins
    # ./install_vscodium #vscodium
    
    ##### Below is dirty install #####
    sudo apt-key add ./apt/my_repo.keys
    sudo cp -R ./apt/sources.list* /etc/apt/
    sudo apt-get update
    sudo apt-get install dselect
    sudo dpkg --set-selections < ./apt/my_packages.list
    sudo dselect
}

main () {
    update_packages
    install_programs
    stow_packages
}

##### packages
# flameshot, peek, compton
