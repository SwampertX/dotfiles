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

export PATH="$HOME/.cargo/bin:$PATH"
if [ -e /home/titanx/.nix-profile/etc/profile.d/nix.sh ]; then . /home/titanx/.nix-profile/etc/profile.d/nix.sh; fi # added by Nix installer

# Environment variables. Force ZSH to source this file
export PATH="$HOME/.rbenv/bin:$PATH"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

eval "$(rbenv init -)"

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

setxkbmap -option ctrl:nocaps

export XDG_CONFIG_HOME="$HOME/.config"
export PAGER="less"
export PATH="/home/titanx/.mozbuild/git-cinnabar:$PATH"
export FZF_DEFAULT_COMMAND="fd --type f --hidden --follow --exclude .git"
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"

export EDITOR="nvim"
export GOPATH="$HOME/go"
export GOBIN="$GOPATH/bin"
export PATH="$PATH:/usr/local/go/bin:/home/titanx/go/bin"
export PATH="$PATH:/opt"
export PATH="$PATH:$HOME/opt"

export PKG_CONFIG="/usr/bin/pkg-config"
export TERM="xterm-256color"
export XDG_DATA_DIRS="$XDG_DATA_DIRS:/var/lib/flatpak/exports/share:/home/titanx/.local/share/flatpak/exports/share"
