import os
import re

if os.path.exists("videos.md"):
    videos = ""
    with open("videos.md", "r", encoding="utf8") as n:
        videos = n.read()
    if os.path.exists("public/videos.md"):  
        with open("public/videos.md", "w", encoding="utf8") as f:
            f.write(videos)