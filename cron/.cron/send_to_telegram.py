#!/usr/bin/env python3
import requests
import sys

params = {"chat_id": "591402320", "text": "".join(sys.stdin.readlines())}
requests.get(
    "https://api.telegram.org/bot936700026:AAHit5wsveJGUOXIiMXvMdkwbjgVgftEKxc/sendMessage",
    params,
)
