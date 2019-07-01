set nocompatible
set ignorecase

set tabstop=4 shiftwidth=4 expandtab
set path+="./**/*"

filetype on
syntax on

autocmd Filetype ruby setlocal ts=2 sw=2 expandtab
autocmd Filetype yaml setlocal ts=2 sw=2 expandtab

set termguicolors
colorscheme gruvbox

" sane cursor
" default
" set guicursor=n-v-c-sm:block,i-ci-ve:ver25,r-cr-o:hor20
" just block
set guicursor=

set confirm
set hidden
set cmdheight=2
