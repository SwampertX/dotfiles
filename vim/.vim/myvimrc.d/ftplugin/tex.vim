" Compilation
nmap <buffer> <leader>cl :VimtexCompile<CR>
nmap <buffer> <leader>cx :!latexmk -xelatex -shell-escape % && latexmk -c %
set wrap
set textwidth=80
set syntax=tex
