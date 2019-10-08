set nocompatible
set ignorecase

set tabstop=4 shiftwidth=4 expandtab
set path+="./**/*"

filetype on
syntax on

autocmd Filetype ruby setlocal ts=2 sw=2 expandtab
autocmd Filetype yaml setlocal ts=2 sw=2 expandtab
autocmd Filetype typescript setlocal ts=2 sw=2 expandtab

set termguicolors
colorscheme gruvbox

highlight ExtraWhitespace ctermbg=red guibg=red
match ExtraWhitespace /\s\+$/

" sane cursor
" default
" set guicursor=n-v-c-sm:block
" set guicursor+=i-ci-ve:ver25
" set guicursor+=r-cr-o:hor20
" just block
set guicursor=

set confirm
set hidden
set cmdheight=2

" enable folding, but unfold at first
set foldmethod=syntax
au BufRead * normal zR

" sane navigation - move by visual line instead of linebreaks
nnoremap j gj
nnoremap k gk

set number
set relativenumber
set cursorline
