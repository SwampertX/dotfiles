#!/usr/bin/fish

i3lock -i (random choice ~/.config/lockscreen/*.png) && echo mem > /sys/power/state
