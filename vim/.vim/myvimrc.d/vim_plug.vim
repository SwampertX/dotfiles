" Auto install vim plug
if empty(glob('~/.vim/autoload/plug.vim'))
  silent !curl -fLo ~/.vim/autoload/plug.vim --create-dirs
    \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif

"""""""""""""""""""""""""""""" PLUGINS """""""""""""""""""""""""""""""""""""

call plug#begin('~/.config/vim/plugged')

" surround.vim
Plug 'tpope/vim-surround'

" FZF
Plug '~/.fzf'
Plug 'junegunn/fzf.vim'

" post install (yarn install | npm install) then load plugin only for editing supported files
Plug 'prettier/vim-prettier', {
  \ 'do': 'yarn install',
  \ 'for': ['javascript', 'typescript', 'css', 'less', 'scss', 'json', 'graphql', 'markdown', 'vue', 'yaml', 'html'] }

" Editorconfig
Plug 'editorconfig/editorconfig-vim'

" status and tabline
Plug 'vim-airline/vim-airline'

" let's try this massive boy
Plug 'neoclide/coc.nvim', {'branch': 'release'}

" rule them all, language!
Plug 'sheerun/vim-polyglot'

" The power of DNN
" Plug 'zxqfl/tabnine-vim'

" nerd tree
Plug 'scrooloose/nerdtree'

" one dark?
Plug 'joshdick/onedark.vim'

" gruvbox?
Plug 'morhetz/gruvbox'

" linter
Plug 'w0rp/ale'

" latex
Plug 'lervag/vimtex'
let g:tex_flavor='latex'
let g:vimtex_view_method='zathura'
let g:vimtex_quickfix_mode=0

" Use coc-snippets instead
" Plug 'sirver/ultisnips'
" let g:UltiSnipsSnippetDirectories=["~/.vim/myvimrc.d/ultisnips"]
" let g:UltiSnipsExpandTrigger = '<c-e>'
" let g:UltiSnipsJumpForwardTrigger = '<alt-f>'
" let g:UltiSnipsJumpBackwardTrigger = '<alt-f>'

Plug 'KeitaNakamura/tex-conceal.vim', {'for': 'tex'} " for VimPlug
set conceallevel=2
let g:tex_conceal="abdgm"


" comment
Plug 'tpope/vim-commentary'

" target
Plug 'wellle/targets.vim'

" git wrapper, by tim pope
Plug 'tpope/vim-fugitive'

Plug 'jceb/vim-orgmode'

call plug#end()
