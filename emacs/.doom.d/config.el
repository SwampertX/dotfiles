;;; .doom.d/config.el -*- lexical-binding: t; -*-

;; Place your private configuration here
(set-face-attribute 'default nil :height 120)

(after! org
  (map! :map org-mode-map
        :n "M-j" #'org-metadown
        :n "M-j" #'org-metaup
        :n "S-k" #'org-shiftup
        :n "S-j" #'org-shiftdown
        )
  (setq org-todo-keywords '((sequence "TODO(t)" "INPROGRESS(i)" "WAITING(w)" "|" "DONE(d)" "CANCELLED(c)"))
        org-agenda-files (list "~/projects/org/")
        org-directory "~/projects/org/")
  )
