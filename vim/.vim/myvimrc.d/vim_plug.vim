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
Plug 'zxqfl/tabnine-vim'

" nerd tree
Plug 'scrooloose/nerdtree'

" one dark?
Plug 'joshdick/onedark.vim'

" gruvbox?
Plug 'morhetz/gruvbox'

" linter
Plug 'w0rp/ale'

" latex
" Plug 'lervag/vimtex'

" comment
Plug 'tpope/vim-commentary'

" target
Plug 'wellle/targets.vim'

" git wrapper, by tim pope
Plug 'tpope/vim-fugitive'

"
Plug 'fatih/vim-go', { 'do': ':GoUpdateBinaries' }

call plug#end()
