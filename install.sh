#!/bin/bash

# Clean install. Uncomment to disable
# CLEAN_INSTALL=1

nice_keys () {
    echo "Stage 1: Map Caps Lock to Ctrl"
    sudo localectl set-x11-keymap us pc105 '' ctrl:nocaps
}

fix_broken () {
    sudo apt --fix-broken install --yes
}

update_packages () {
    "Stage 2: Update existing packages"
    fix_broken
    sudo apt update && sudo apt upgrade -y && sudo apt autoremove -y
}

install_programs () {
    echo "Stage 3: installing packages."
    if $CLEAN_INSTALL; then
        clean_install
    else
        dirty_install
    fi
}

dirty_install () {
    sudo apt-key add ./apt/my_repo.keys
    sudo cp -R ./apt/sources.list* /etc/apt/
    sudo apt-get update
    sudo apt-get install dselect && sudo dselect update
    sudo dpkg --set-selections < ./apt/my_packages.list
    sudo apt-get dselect-upgrade -y
}

install_fzf () {
    git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
    ~/.fzf/install --all
}

clean_install () {
    sudo add-apt-repository ppa:peek-developers/stable --yes
    sudo add-apt-repository ppa:mmstick76/alacritty --yes
    sudo add-apt-repository ppa:ubuntu-mozilla-daily/ppa --yes


    cli="fish neovim ripgrep fd-find python3 python ranger python3-pip"
    fonts="fonts-noto fonts-font-awesome fonts-powerline fonts-hack-ttf"
    daily="i3 i3blocks firefox-trunk emacs nm-tray xinit alacritty telegram-desktop"
    tools="flameshot compton htop zathura texlive pandoc"
    input="fcitx fcitx-googlepinyin"

    fix_broken
    sudo apt install $cli $fonts $daily $tools $input --yes

    install_fzf

    # neovim with python support
    pip3 install neovim
    # tldr
    sudo snap install tldr
}

stow_packages () {
    echo "Stage 4: stowing packages."
    fix_broken
    sudo apt install stow -y
    for pkg in $(echo */)
    do
        if [ $pkg = "apt/" ]
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

post_install () {
    echo "Stage 5: Post installation phase."
    # use fish
    sudo chsh -s $(which fish) $(whoami)
    # use nvim as vim
    sudo update-alternatives --config vim
    # use i3
    echo "exec i3" > ~/.xinitrc && startx
}

main () {
    nice_keys &&
    update_packages &&
    install_programs &&
    stow_packages
    post_install
}

main
