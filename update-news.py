import os
import re

if os.path.exists("news.md"):
    news = ""
    with open("news.md", "r") as n:
        news = n.read()
    if os.path.exists("public/news.md"):  
        with open("public/news.md", "w") as f:
            f.write(news)