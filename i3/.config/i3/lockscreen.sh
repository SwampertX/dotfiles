#!/bin/bash

i3lock -t -i "$(random choice ~/.config/lockscreen/*" && echo mem > /sys/power/state
