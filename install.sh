#!/bin/bash

# this file should, at the very least, populate the dot files.
# if possible, it should install packages/clone repos that the
#   current config requires.

# Level 1:
# - able to stow everything
# Level 2:
# - CLI Tools (fish, rg, fzf, z, vim, git) working
# Level 3
# - WM working - with fonts, terminal ready to use
# Level 4
# - Daily apps working. non-exhaustive list:
# - firefox, telegram-desktop, spotify, vscodium, emacs
# Level 5
# - figure a way to replicate all packages from apt


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

##################
## Ubuntu Setup ##
##################
# sudo apt update && sudo apt upgrade -y sudo apt autoremove
# xinit, i3, neovim, zsh
# git clone https://github.com/swampertx/dotfiles.git
# cd ~/dotfiles && ./install.sh
# echo "exec i3" >> ~/.xinitrc && xstart #does not use config
