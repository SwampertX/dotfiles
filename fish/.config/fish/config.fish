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

abbr -a doom "~/.emacs.d/bin/doom"

if not functions -q fisher
    set -q XDG_CONFIG_HOME; or set XDG_CONFIG_HOME ~/.config
    curl https://git.io/fisher --create-dirs -sLo $XDG_CONFIG_HOME/fish/functions/fisher.fish
    fish -c fisher
end

set -a PATH .
