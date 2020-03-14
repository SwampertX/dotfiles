" Ctrl-j and Ctrl-k to navigate between errors
nmap <silent> <C-k> <Plug>(ale_previous_wrap)
nmap <silent> <C-j> <Plug>(ale_next_wrap)
nmap <silent> gd :ALEGoToDefinition<CR>

let g:ale_linters = {
            \ 'ruby': ['rubocop'],
            \ 'python': ['black'],
            \ 'javascript': ['eslint', 'prettier'],
            \ 'bash': ['eslint', 'prettier'],
            \ 'markdown': ['alex'],
            \ 'latex': ['texlab'],
            \ 'rust': ['rustfmt'],
            \}

let g:ale_fixers = {
            \ 'ruby' : ['rubocop'],
            \ 'python': ['black'],
            \ 'rust': ['rustfmt'],
            \ 'markdown': ['alex'],
            \ 'latex': ['texlab'],
            \}

let g:ale_fix_on_save = 1
