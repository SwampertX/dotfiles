#!/usr/bin/fish

i3lock -t -i (random choice ~/.config/lockscreen/*.png) && echo mem > /sys/power/state
