;;; .doom.d/config.el -*- lexical-binding: t; -*-
(setq doom-font (font-spec :family "Iosevka Term" :size 18)
      doom-unicode-font (font-spec :family "Noto Color Emoji" :size 15)
      doom-theme 'doom-gruvbox
      doom-variable-pitch-font (font-spec :family "Times New Roman" :size 15)
      user-full-name "Tan Yee Jian"
      user-mail-address "tanyeejian@gmail.com"
      )

;; (custom-set-faces! '(default :height 135))

;; (defun yeejian/org-start-work () "Start working on an item in Agenda."
;;        (org-agenda-todo "INPROGRESS")
;;        (org-agenda-clock-in))


;; (defun yeejian/org-stop-work () "Stop working on an item in Agenda."
;;        (org-agenda-todo "WAITING")
;;        (org-agenda-clock-out))

(after! org
  (map! :map org-mode-map
        :n "M-j" #'org-metadown
        :n "M-j" #'org-metaup
        :n "S-k" #'org-shiftup
        :n "S-j" #'org-shiftdown
        )
  ;; (map! :map org-agenda-mode-map
  ;;       :m "I" #'yeejian/org-start-work
  ;;       :m "O" #'yeejian/org-stop-work)
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
                                        "\\newtheorem{lemma}{Lemma}[section]"
                                        "\\newtheorem{note}{Note}[theorem]"
                                        "\\newtheorem{definition}{Definition}[section]"
                                        "\\newtheorem{ex}{Example}[section]"
                                        "\\newtheorem{observation}{Observation}[section]"
                                        "\\DeclareMathOperator{\\diam}{diam}"
                                        "\\linespread{1.1}")
        org-latex-packages-alist '(("" "amsthm" nil) ("" "minted" nil) ("" "hyperref" nil))
        bibtex-dialect 'biblatex
        org-latex-pdf-process '("latexmk -shell-escape -bibtex -pdf %f")
        org-latex-listings 'minted
        org-file-apps '((auto-mode . emacs)
                        (directory . emacs)
                        ("\\.mm\\'" . default)
                        ("\\.x?html?\\'" . default)
                        ("\\.pdf\\'" . "zathura %s"))
        ;; org-journal-dir "~/Dropbox/org/journal"
        org-roam-directory "~/Dropbox/org/roam"
        org-capture-templates
        '(("t" "Todo" entry (file "inbox.org")
           "* TODO %?\n  %i\n  %a")
          ("c" "org-protocol-capture" entry (file "inbox.org")
           "* TODO [[%:link][%:description]]\n\n %i" :immediate-finish t))
        org-agenda-custom-commands
        '(
          ("x" "Doing and Agenda" ((todo "INPROGRESS|WAITING")(agenda "")))
          )
        org-global-properties '(("Effort_ALL" . "0 0:10 0:30 1:00 2:00 3:00 4:00 5:00 6:00 7:00"))
        org-columns-default-format "%58ITEM %TODO %3PRIORITY %5Effort(Est.){:} %CLOCKSUM(Spent){:}"
        org-pomodoro-audio-player "paplay --volume=52000"
        ;; org-columns-default-format-for-agenda "%25ITEM %TODO %3PRIORITY %TAGS %17Effort(Estimated Effort){:} %CLOCKSUM"
        ;; org-columns-default-format-for-agenda nil
        org-download-method 'directory
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

;; (after! rustic
;;   (setq rustic-lsp-server 'rust-analyzer))

(after! evil-org
  (map! :map evil-org-mode-map
        :nv "j" #'evil-next-visual-line
        :nv "k" #'evil-previous-visual-line))

(add-hook 'text-mode-hook 'turn-on-auto-fill)

(after! lsp-python-ms
  (set-lsp-priority! 'mspyls 1))

(after! format
  (setq +format-on-save-enabled-modes
        '(not
          ;; emacs-lisp-mode  ; elisp's mechanisms are good enough
          ;; sql-mode         ; sqlformat is currently broken
          tex-mode         ; latexindent is broken
          latex-mode
          )
        ))

;; (after! latex-preview-pane
;;   (setq shell-escape-mode t))

;; (defun compile-latex ()
;;   "Compile the current file into pdf."
;;   (let ((command (concat "pdflatex -synctex 1 -shell-escape " (buffer-file-name))))
;;     (shell-command command)
;;     (message (concat "Done compiling " command))
;;     )
;;   )


;; (add-hook 'latex-mode-hook
;;           (lambda ()
;;             (add-hook 'after-save-hook 'compile-latex nil 'make-it-local)))

;; (add-hook 'c++-mode-hook #'clang-format+-mode)

;; (after! proof-general
;;   (map! :mode coq
;;         :n "C-c k" #'proof-undo-last-successful-command
;;         :n "C-c j" #'proof-assert-next-command-interactive
;;         ))

;; (after! lsp-mode
;;   (lsp-register-client
;;    (make-lsp-client
;;     :new-connection
;;     (lsp-stdio-connection (list "swipl"
;;                                 "-g" "use_module(library(lsp_server))."
;;                                 "-g" "lsp_server:main"
;;                                 "-t" "halt"
;;                                 "--" "stdio"))
;;     :major-modes '(prolog-mode)
;;     :priority 1
;;     :multi-root t
;;     :server-id 'prolog-ls)))

(after! fstar-mode
  (setq fstar-executable "/home/yeejian/Downloads/fstar/bin/fstar.exe")
  )

(after! mixed-pitch-mode
  (setq )
  )

(message "Done reloading config.")
