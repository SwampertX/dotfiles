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
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'

" post install (yarn install | npm install) then load plugin only for editing supported files
" Plug 'prettier/vim-prettier', {
"   \ 'do': 'yarn install',
"   \ 'for': ['javascript', 'typescript', 'css', 'less', 'scss', 'json', 'graphql', 'markdown', 'vue', 'yaml', 'html'] }

" Editorconfig
" Plug 'editorconfig/editorconfig-vim'

" status and tabline
Plug 'vim-airline/vim-airline'

" let's try this massive boy
Plug 'neoclide/coc.nvim', {'branch': 'release'}

" rule them all, language!
" Plug 'sheerun/vim-polyglot'

" The power of DNN
" Plug 'zxqfl/tabnine-vim'

" gruvbox?
Plug 'morhetz/gruvbox'

" linter
Plug 'w0rp/ale'

" latex
Plug 'lervag/vimtex'
let g:tex_flavor='latex'
let g:vimtex_view_method='zathura'
let g:vimtex_quickfix_mode=0
let g:vimtex_compiler_latexmk = {
            \ 'build_dir' : 'tmp',
            \ 'options' : [
            \   '-verbose',
            \   '-file-line-error',
            \   '-synctex=1',
            \   '-interaction=nonstopmode',
            \   '--shell-escape',
            \ ],
            \}
let g:vimtex_fold_enabled=1

" Use coc-snippets instead
" Plug 'sirver/ultisnips'
" let g:UltiSnipsSnippetDirectories=["~/.vim/myvimrc.d/UltiSnips"]
" let g:UltiSnipsExpandTrigger = '<Tab>'
" let g:UltiSnipsJumpForwardTrigger = '<C-j>'
" let g:UltiSnipsJumpBackwardTrigger = '<C-k>'

Plug 'KeitaNakamura/tex-conceal.vim', {'for': 'tex'} " for VimPlug
set conceallevel=0
let g:tex_conceal="abdgm"

" Plug 'honza/vim-snippets'

" comment
Plug 'tpope/vim-commentary'

" target
Plug 'wellle/targets.vim'

" git wrapper, by tim pope
" Plug 'tpope/vim-fugitive'

" Plug 'jceb/vim-orgmode'

Plug 'jiangmiao/auto-pairs'
let g:autopairs={'(':'*', '[':']', '{':'}',"'":"'",'"':'"', '`':'`','$':'$'}

Plug 'preservim/nerdtree'

" Plug 'gisraptor/vim-lilypond-integrator'

call plug#end()
