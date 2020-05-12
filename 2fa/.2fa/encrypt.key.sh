#!/bin/bash
# Purpose: Encrypt the totp secret stored in $dir/$service/.key file
# Author: Vivek Gite {https://www.cyberciti.biz/} under GPL v 2.x or above
# --------------------------------------------------------------------------
# Path to gpg2 binary
_gpg2="/usr/bin/gpg2"

## run: gpg --list-secret-keys --keyid-format LONG to get uid and kid ##
# GnuPG user id
uid="tanyeejian@gmail.com"

# GnuPG key id
kid="C91BE39D72655810E7F5DB897EB00C343CF7932B"

# Directory that stores encrypted key for each service
dir="$HOME/.2fa"

# Now build CLI args
s="$1"
k="${dir}/${s}/.key"
kg="${k}.gpg"

# failsafe stuff
[ "$1" == "" ] && { echo "Usage: $0 service"; exit 1; }
[ ! -f "$k" ] && { echo "$0 - Error: $k file not found."; exit 2; }
[ -f "$kg" ] && { echo "$0 - Error: Encrypted file \"$kg\" exists."; exit 3; }

# Encrypt your service .key file
$_gpg2 -u "${kid}" -r "${uid}" --encrypt "$k" && rm -i "$k"
