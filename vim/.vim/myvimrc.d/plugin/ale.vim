" Ctrl-j and Ctrl-k to navigate between errors
nmap <silent> <C-k> <Plug>(ale_previous_wrap)
nmap <silent> <C-j> <Plug>(ale_next_wrap)

let g:ale_linters = {
            \ 'ruby': ['solargraph', 'rubocop'],
            \ 'python': ['black'],
            \ 'javascript': ['eslint', 'prettier'],
            \}

let g:ale_fixers = {
            \ 'ruby' : ['solargraph', 'rubocop'],
            \ 'python': ['black'],
            \ 'rust': ['rustfmt']
            \}

let g:ale_fix_on_save = 1
