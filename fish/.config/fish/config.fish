abbr -a gc "git checkout"
abbr -a gpl "git pull"
abbr -a gpo "git push origin -u"
abbr -a gph "git push"
abbr -a gst "git status"
abbr -a ga "git add"
abbr -a gm "git commit"
abbr -a gmg "git merge"
abbr -a gd "git diff"
abbr -a glog "git log"
abbr -a grb "git rebase"
abbr -a gb "git branch"

abbr -a py "python"
abbr -a py3 "python3"
abbr -a xclip "xclip -sel clip"
abbr -a mkdir "mkdir -p"
abbr -a zathura "zathura --fork"
abbr -a sshnus "env TERM=xterm ssh -J sunfire"

# some default flags
abbr -a valgrind "valgrind --leak-check=full --show-leak-kinds=all -s"
abbr -a gcc "gcc -g -Wall -Wextra"

abbr -a doom "~/.emacs.d/bin/doom"

if not functions -q fisher
    set -q XDG_CONFIG_HOME; or set XDG_CONFIG_HOME ~/.config
    curl https://git.io/fisher --create-dirs -sLo $XDG_CONFIG_HOME/fish/functions/fisher.fish
    fish -c fisher
end

set -a PATH . ~/bin /snap/bin ~/.cargo/bin
set FZF_DEFAULT_COMMAND 'fd'
set GTYPIST_PATH ~/usr/share/gtypist
set XDG_DATA_HOME --append /var/lib/flatpak/exports/share
set GOOGLE_APPLICATION_CREDENTIALS ~/.config/gcloud/credentials.json
set -e JAVA_HOME

# thefuck --alias | source
starship init fish | source

cd ~/gojek && source bin/activate.fish && cd -

# The next line updates PATH for the Google Cloud SDK.
if [ -f '/home/titanx/google-cloud-sdk/path.fish.inc' ]
    . '/home/titanx/google-cloud-sdk/path.fish.inc'
end
