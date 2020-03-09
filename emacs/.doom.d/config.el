;;; .doom.d/config.el -*- lexical-binding: t; -*-

;; Place your private configuration here
(setq doom-theme 'doom-gruvbox
      doom-font (font-spec :family "Hack" :size 15)
      user-full-name "Tan Yee Jian"
      user-mail-address "tanyeejian@gmail.com"
      doom-unicode-font (font-spec :family "Noto" :size 15)
      )

;; (set-face-attribute 'default nil :height 130)
;; (custom-set-faces! '(default :height 130))

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
        )
  )

;; (after! rust ;; (setq rustic-format-on-save f))
(after! evil-snipe (evil-snipe-mode -1))
