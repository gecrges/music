import os

if os.listdir("public/news") or os.listdir("public/videos"):
    try:
        for i in os.listdir("public/news"):
            os.remove(f"public/news/{i}")
            print(f"removed {i}")
        for u in os.listdir("public/videos"):
            os.remove(f"public/videos/{u}")
            print(f"removed {u}")
    except Exception as e:
        raise e
else:
    print("no files to remove.")