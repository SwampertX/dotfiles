#!/bin/bash

i3lock -i "$(random choice ~/.config/lockscreen/*" && echo mem > /sys/power/state
