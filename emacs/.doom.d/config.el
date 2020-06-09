;;; .doom.d/config.el -*- lexical-binding: t; -*-

;; Place your private configuration here
(setq doom-font (font-spec :family "Iosevka Term" :size 15)
      doom-unicode-font (font-spec :family "Noto Color Emoji" :size 15)
      doom-theme 'doom-gruvbox
      user-full-name "Tan Yee Jian"
      user-mail-address "tanyeejian@gmail.com"
      )

;; (custom-set-faces! '(default :height 135))

(after! org
  (map! :map org-mode-map
        :n "M-j" #'org-metadown
        :n "M-j" #'org-metaup
        :n "S-k" #'org-shiftup
        :n "S-j" #'org-shiftdown
        )
  (setq org-todo-keywords '((sequence "TODO(t)" "INPROGRESS(i)" "WAITING(w)" "|" "DONE(d!)" "CANCELLED(c@)"))
        org-agenda-files (list "~/Dropbox/org/")
        org-directory "~/Dropbox/org/"
        org-log-done-with-time t
        org-list-allow-alphabetical t
        org-format-latex-header (concat "\\documentclass{article}"
                                        "\\usepackage[usenames]{color}"
                                        "[PACKAGES]"
                                        "[DEFAULT-PACKAGES]"
                                        "\\pagestyle{empty}             % do not remove"
                                        "% The settings below are copied from fullpage.sty"
                                        "\\setlength{\\textwidth}{\\paperwidth}"
                                        "\\addtolength{\\textwidth}{-3cm}"
                                        "\\setlength{\\oddsidemargin}{1.5cm}"
                                        "\\addtolength{\\oddsidemargin}{-2.54cm}"
                                        "\\setlength{\\evensidemargin}{\\oddsidemargin}"
                                        "\\setlength{\\textheight}{\\paperheight}"
                                        "\\addtolength{\\textheight}{-\\headheight}"
                                        "\\addtolength{\\textheight}{-\\headsep}"
                                        "\\addtolength{\\textheight}{-\\footskip}"
                                        "\\addtolength{\\textheight}{-3cm}"
                                        "\\setlength{\\topmargin}{1.5cm}"
                                        "\\addtolength{\\topmargin}{-2.54cm}"
                                        "\\newtheorem{theorem}{Theorem}[section]"
                                        "\\newtheorem{corollary}{Corollary}[theorem]"
                                        "\\newtheorem{lemma}{Lemma}[theorem]"
                                        "\\newtheorem{note}{Note}[theorem]"
                                        "\\newtheorem{definition}{Definition}[section]"
                                        "\\newtheorem{ex}{Example}[section]"
                                        "\\newtheorem{observation}{Observation}[section]"
                                        "\\DeclareMathOperator{\\diam}{diam}")
        org-latex-packages-alist '(("" "amsthm" nil))
        bibtex-dialect 'biblatex
        org-latex-pdf-process '("latexmk -shell-escape -bibtex -pdf %f")
        org-file-apps '((auto-mode . emacs)
                       (directory . emacs)
                       ("\\.mm\\'" . default)
                       ("\\.x?html?\\'" . default)
                       ("\\.pdf\\'" . "zathura %s"))
        org-journal-dir "~/Dropbox/org/journal"
        org-roam-directory "~/Dropbox/org/roam"
        ;; org-journal-file-type 'weekly
        )
)


(after! pdf-tools
  (map! :map pdf-view-mode-map
        :n "J" #'pdf-view-next-page-command
        :n "K" #'pdf-view-previous-page-command))

;; (after! rust ;; (setq rustic-format-on-save f))
;; (after! evil-snipe (evil-snipe-mode -1))

(after! org-gcal
  (setq org-gcal-client-id "473532847251-hpakf41dv1dvqa9bjg9rd58hl9g4to89.apps.googleusercontent.com"
      org-gcal-file-alist '(("tanyeejian@gmail.com" .  "~/Dropbox/org/cal.org"))))

(after! rustic
  (setq rustic-lsp-server 'rust-analyzer))

(after! evil-org
  (map! :map evil-org-mode-map
      :nv "j" #'evil-next-visual-line
      :nv "k" #'evil-previous-visual-line))

(add-hook 'text-mode-hook 'turn-on-auto-fill)

(after! lsp-python-ms
  (set-lsp-priority! 'mspyls 1))

;; (after! format
;;   (setq +format-on-save-enabled-modes
;;         '(not emacs-lisp-mode  ; elisp's mechanisms are good enough
;;               sql-mode         ; sqlformat is currently broken
;;               tex-mode         ; latexindent is broken
;;               latex-mode
;;               )
;;         ))
