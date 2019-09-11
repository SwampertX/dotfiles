" Compile markdown
nmap <buffer> <leader>cm :!pandoc % -o %:r.pdf
