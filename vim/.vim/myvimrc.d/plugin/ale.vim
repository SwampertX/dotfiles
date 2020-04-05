" Ctrl-j and Ctrl-k to navigate between errors
nmap <silent> <C-k> <Plug>(ale_previous_wrap)
nmap <silent> <C-j> <Plug>(ale_next_wrap)
nmap <silent> gd :ALEGoToDefinition<CR>

let g:ale_linters = {
            \ 'cpp': ['clang'],
            \ 'ruby': ['rubocop'],
            \ 'python': ['flake8'],
            \ 'javascript': ['eslint', 'prettier'],
            \ 'bash': ['eslint', 'prettier'],
            \ 'markdown': ['alex'],
            \ 'tex': ['latexindent'],
            \ 'latex': ['latexindent'],
            \ 'rust': ['rls'],
            \}

let g:ale_fixers = {
            \ '*' : ['remove_trailing_lines', 'trim_whitespace'],
            \ 'cpp' : ['clangtidy'],
            \ 'ruby' : ['rubocop'],
            \ 'python': ['black'],
            \ 'rust': ['rustfmt'],
            \ 'markdown': ['alex'],
            \ 'tex': ['latexindent'],
            \ 'latex': ['latexindent'],
            \}

let g:ale_fix_on_save = 1
