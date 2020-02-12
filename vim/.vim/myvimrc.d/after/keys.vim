" some leader key
let mapleader=","

nnoremap <leader>F :Files<CR>
nnoremap <leader>B :Buffers<CR>
nnoremap <leader>C :%s/\s\+$//e<CR>

nnoremap <leader>cc :CocCommand<CR>
nnoremap <leader>ca :CocAction<CR>
nnoremap <leader>cf :CocConfig<CR>

nnoremap <leader>vim :Files ~/.vim/myvimrc.d<CR>

nnoremap <leader>n :NERDTreeToggle<CR>

setlocal spell
set spelllang=en_us
inoremap <C-l> <c-g>u<Esc>[s1z=`]a<c-g>u

