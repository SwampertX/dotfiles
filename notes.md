1. Use localectl to manage state of X11 server.
   `localectl set-x11-keymap us pc105 '' ctrl:swapcaps`

2. Install synaptics driver with `xserver-xorg-input-synaptics`

3. Checkout vim runtime path using `:help rtp` to allow customized paths. Also install vim plugins (using vim-plug) in vim runtime to enable compliant with non nvim systems.

4.

Existing problems:

- dselect is gui. change it to apt-get
- vim is nvim, unable to find 'gruvbox', coc does not start properly
