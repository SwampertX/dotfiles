#!/bin/bash

stow_packages () {
    echo "Stage 4: stowing packages."
    fix_broken
    sudo apt install stow -y
    for pkg in $(echo */)
    do
        if [ $pkg = "apt/" ] || [ $pkg = "scripts/" ]
        then
            continue
        elif [ $pkg = "fish/" ]
        then
            rm -rf ~/.config/fish
            stow $pkg --restow
            echo "fisher" | fish
            install_fzf
        else
            stow $pkg --restow
        fi
    done
}

stow_packages
