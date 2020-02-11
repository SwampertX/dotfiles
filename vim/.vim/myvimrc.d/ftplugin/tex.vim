" Compilation
nmap <buffer> <leader>cl :VimtexCompile<CR>
nmap <buffer> <leader>cx :!latexmk -xelatex % && latexmk -c %
