" some leader key
let mapleader=","

nnoremap <leader>F :Files<CR>
nnoremap <leader>B :Buffers<CR>
nnoremap <leader>C :%s/\s\+$//e<CR>

nnoremap <leader>cc :CocCommand<CR>
nnoremap <leader>ca :CocAction<CR>
nnoremap <leader>cconf :CocConfig<CR>
command! -nargs=0 Format :call CocAction('format')
nnoremap <leader>cf :Format<CR>


nnoremap <leader>vim :Files ~/.vim/myvimrc.d<CR>

nnoremap <leader>n :NERDTreeToggle<CR>

setlocal spell
set spelllang=en_us
inoremap <C-n> <c-g>u<Esc>[s1z=`]a<c-g>u

nnoremap <Tab> za

" <Esc> escapes terminal
" tnoremap <Esc> <C-\><C-n>
