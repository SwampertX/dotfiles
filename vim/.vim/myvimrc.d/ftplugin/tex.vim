" Compilation
nmap <buffer> <leader>cl :!latexmk -pdf % && latexmk -c
nmap <buffer> <leader>cx :!latexmk -xelatex % && latexmk -c %
