#!/bin/bash

# Clean install. Uncomment to disable
# CLEAN_INSTALL=1

stow_packages () {
    echo "Stage 4: stowing packages."
    fix_broken
    sudo apt install stow -y
    for pkg in $(echo */)
    do
        if [ $pkg = "apt/" ]
        then
            continue
        fi
        stow $pkg --restow
    done
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

install_alacritty () {
    curl "https://github.com/jwilm/alacritty/releases/download/v0.4.0/Alacritty-v0.4.0-ubuntu_18_04_amd64.deb" -o alacritty.deb
    sudo dpkg -i alacritty.deb
    rm alacritty.deb
}

clean_install () {
    sudo add-apt-repository ppa:peek-developers/stable --yes
    sudo add-apt-repository ppa:mmstick76/alacritty --yes
    sudo add-apt-repository ppa:ubuntu-mozilla-daily/ppa --yes


    cli="fish neovim ripgrep fd-find python3 python ranger python3-pip"
    fonts="fonts-noto fonts-font-awesome fonts-powerline fonts-hack-ttf"
    daily="i3 i3blocks firefox-trunk emacs nm-tray xinit alacritty"
    tools="flameshot compton htop zathura texlive pandoc"
    input="fcitx fcitx-googlepinyin"

    fix_broken
    sudo apt install $cli $fonts $daily $tools $input -y

    install_fzf

    # neovim with python support
    pip3 install neovim
}

fix_broken () {
    sudo apt --fix-broken install --yes
}

nice_keys () {
    echo "Stage 1: Map Caps Lock to Ctrl"
    localectl set-x11-keymap us pc105 '' ctrl:nocaps
}

post_install () {
    echo "Stage 5: Post installation phase."
    # use fish
    chsh -s $(which fish) $(whoami)
    # use i3
    echo "exec i3" > ~/.xinitrc && startx
    # TODO: use nvim as vim
}

main () {
    nice_keys &&
    update_packages &&
    install_programs &&
    stow_packages &&
    post_install
}

##### packages
# flameshot, peek, compton

##################
## Ubuntu Setup ##
##################
main
