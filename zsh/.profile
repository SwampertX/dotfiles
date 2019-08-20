# ~/.profile: executed by the command interpreter for login shells.
# This file is not read by bash(1), if ~/.bash_profile or ~/.bash_login
# exists.
# see /usr/share/doc/bash/examples/startup-files for examples.
# the files are located in the bash-doc package.

# the default umask is set in /etc/profile; for setting the umask
# for ssh logins, install and configure the libpam-umask package.
#umask 022

# if running bash
if [ -n "$BASH_VERSION" ]; then
    # include .bashrc if it exists
    if [ -f "$HOME/.bashrc" ]; then
	. "$HOME/.bashrc"
    fi
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/.local/bin" ] ; then
    PATH="$HOME/.local/bin:$PATH"
fi

##########################################################################
##################  MY OWN VARIABLES #####################################
##########################################################################

##############################
######## Languages ###########
##############################

# RUBY
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
# RUST
export PATH="$HOME/.cargo/bin:$PATH"
# GO
export GOPATH="$HOME/go"
export GOBIN="$GOPATH/bin"
export PATH="$PATH:/usr/local/go/bin:/home/titanx/go/bin"
# JAVASCRIPT (NODE)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# PYTHON (Conda)
export PATH="$PATH:/home/titanx/miniconda3/bin"


##############################
######## Installed ###########
##############################
# Nix (not in use)
if [ -e /home/titanx/.nix-profile/etc/profile.d/nix.sh ]; then . /home/titanx/.nix-profile/etc/profile.d/nix.sh; fi # added by Nix installer
# Flatpak
export XDG_DATA_DIRS="$XDG_DATA_DIRS:/var/lib/flatpak/exports/share:/home/titanx/.local/share/flatpak/exports/share"

##############################
############## CLI ###########
##############################

setxkbmap -option ctrl:nocaps

export PAGER="less"
export EDITOR="nvim"
export PKG_CONFIG="/usr/bin/pkg-config"
export TERM="xterm-256color"

export XDG_CONFIG_HOME="$HOME/.config"

export PATH="$PATH:/opt"
export PATH="$PATH:$HOME/opt"

##############################
########### MISC #############
##############################
# Mozilla
export PATH="/home/titanx/.mozbuild/git-cinnabar:$PATH"

