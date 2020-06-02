#!/bin/bash

wallpaper=$(ls ~/.config/wallpapers/*.jpg | sort -R | head -n 1)
feh --bg-scale "$wallpaper" --bg-scale "$wallpaper"
