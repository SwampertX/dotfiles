#!/bin/bash

# this file should, at the very least, populate the dot files.
# if possible, it should install packages/clone repos that the 
#   current config requires.

function stow_packages {
    sudo apt install stow -y
    for pkg in $(ls); do
        stow $pkg
    done
}

function update_packages {
    sudo apt update && sudo apt upgrade -y
}

function install_programs {
    cd scripts # TODO: add a scripts folder
    chmod +x *
    # you can commented out unwanted lines.
    ./install_zsh #zsh, oh-my-zsh, powerlevel10k, powerline, fontcache
    ./install_alacritty #alacritty
    ./install_i3wm #i3, fontawesome, i3lock, i3blocks
    ./install_cli_alternatives #alternatives: rg, fzf, fasd, fd
    ./install_nvim #vim, nvim, plugins
    ./install_vscodium #vscodium
}

function main {
    update_packages
    install_programs
    stow_packages
}
