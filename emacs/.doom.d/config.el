;;; .doom.d/config.el -*- lexical-binding: t; -*-

;; Place your private configuration here
(setq doom-theme 'doom-gruvbox
      doom-font (font-spec :family "Iosevka Term" :size 15)
      user-full-name "Tan Yee Jian"
      user-mail-address "tanyeejian@gmail.com"
      doom-unicode-font (font-spec :family "Noto" :size 15)
      )

;; (set-face-attribute 'default nil :height 130)
;; (custom-set-faces! '(default :height 130))
(map! :map evil-mode-map
      :n "g-e" #'eval-region
      :n "g-r" #'lsp-find-references)

(after! org
  (map! :map org-mode-map
        :n "M-j" #'org-metadown
        :n "M-j" #'org-metaup
        :n "S-k" #'org-shiftup
        :n "S-j" #'org-shiftdown
        )
  (setq org-todo-keywords '((sequence "TODO(t)" "INPROGRESS(i)" "WAITING(w)" "|" "DONE(d!)" "CANCELLED(c@)"))
        org-agenda-files (list "~/Dropbox/org/")
        org-directory "~/projects/org/"
        org-log-done-with-time t
        org-list-allow-alphabetical t
        org-format-latex-header "\\documentclass{article}
\\usepackage[usenames]{color}
[PACKAGES]
[DEFAULT-PACKAGES]
\\pagestyle{empty}             % do not remove
% The settings below are copied from fullpage.sty
\\setlength{\\textwidth}{\\paperwidth}
\\addtolength{\\textwidth}{-3cm}
\\setlength{\\oddsidemargin}{1.5cm}
\\addtolength{\\oddsidemargin}{-2.54cm}
\\setlength{\\evensidemargin}{\\oddsidemargin}
\\setlength{\\textheight}{\\paperheight}
\\addtolength{\\textheight}{-\\headheight}
\\addtolength{\\textheight}{-\\headsep}
\\addtolength{\\textheight}{-\\footskip}
\\addtolength{\\textheight}{-3cm}
\\setlength{\\topmargin}{1.5cm}
\\addtolength{\\topmargin}{-2.54cm}
\\newtheorem{theorem}{Theorem}[section]
\\newtheorem{corollary}{Corollary}[theorem]
\\newtheorem{lemma}{Lemma}[theorem]
\\newtheorem{note}{Note}[theorem]
\\newtheorem{definition}{Definition}[section]
\\newtheorem{ex}{Example}[section]
\\newtheorem{observation}{Observation}[section]
\\DeclareMathOperator{\\diam}{diam}
"
        org-latex-packages-alist '(("" "amsthm" nil)))

  )

(after! pdf-tools
  (map! :map pdf-view-mode-map
        :n "J" #'pdf-view-next-page-command
        :n "K" #'pdf-view-previous-page-command))
;; (after! rust ;; (setq rustic-format-on-save f))
(after! evil-snipe (evil-snipe-mode -1))
