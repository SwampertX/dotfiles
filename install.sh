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
# - figure a way to clean install required apps

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
        stow $pkg
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
    ##### Below is dirty install #####
    sudo apt-key add ./apt/my_repo.keys
    sudo cp -R ./apt/sources.list* /etc/apt/
    sudo apt-get update
    sudo apt-get install dselect && sudo dselect update
    sudo dpkg --set-selections < ./apt/my_packages.list
    sudo apt-get dselect-upgrade -y
}

# # List of packages to install
# base=(git neovim python python-pynvim neovim-symlinks emacs stow curl diffutils man-db man-pages less)
# maintenance=(pkgfile pacman-contrib expac pacmatic lostfiles)
# monitoring=(htop sysstat acpi net-tools lsof ncdu)
# cli_utils=(bash-completion openssh tree exa xclip fish fd ripgrep fzf ranger w3m fasd bat thefuck tldr direnv expect tmux)
# # audio=(pulseaudio pulseaudio-alsa alsa-utils)
# gui=(xorg-server xorg-xinit xorg-xrdb xorg-xset xorg-xrandr gtk2 gtk3)
# fonts=(adobe-source-code-pro-fonts ttf-iosevka otf-fira-code noto-fonts noto-fonts-cjk noto-fonts-emoji otf-font-awesome nerd-fonts-source-code-pro)
# # Window manager and packages that come with most DEs but do not come with WMs
# WM=(i3-gaps i3blocks betterlockscreen compton networkmanager network-manager-applet gparted acpilight dunst eom feh udiskie)
# terminal_emulator=(kitty termite)
# launcher=(rofi rofi-dmenu rofimoji rofi-pass buku_run-git rofi-greenclip)
# gui_utils=(xdg-utils perl-file-mimeinfo desktop-file-utils sxhkd flameshot)
# misc_utils=(pass gnome-keyring unzip buku nextcloud-client bitwarden-bin)
# coding=(ctags shellcheck-static diff-so-fancy zeal)
# documents=(zathura zathura-pdf-poppler pandoc-bin texlive-core texlive-latexextra texlive-science words hunspell hunspell-en_GB)
# browser=(firefox-developer-edition)
# input_methods=(fcitx-im fcitx-configtool fcitx-googlepinyin)

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
    # 08/12/19 - alacritty eoan package has terminfo that clashes
    #   with ncurses. trying manual download
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
    # install_alacritty

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
