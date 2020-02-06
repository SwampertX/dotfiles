" some leader key
let mapleader=","

nnoremap <leader>F :Files<CR>
nnoremap <leader>B :Buffers<CR>
nnoremap <leader>C :%s/\s\+$//e<CR>

nnoremap <leader>cc :CocCommand<CR>
nnoremap <leader>ca :CocAction<CR>
nnoremap <leader>cf :CocConfig<CR>

nnoremap <leader>vim :Files ~/.vim/myvimrc.d<CR>

setlocal spell
set spelllang=en_us
inoremap <C-l> <c-g>u<Esc>[s1z=`]a<c-g>u

" For navigation in help
nnoremap <buffer> <CR> <C-]>
nnoremap <buffer> <BS> <C-T>
nnoremap <buffer> o /'\l\{2,\}'<CR>
nnoremap <buffer> O ?'\l\{2,\}'<CR>
nnoremap <buffer> s /\|\zs\S\+\ze\|<CR>
nnoremap <buffer> S ?\|\zs\S\+\ze\|<CR>
