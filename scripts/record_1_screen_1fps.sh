ffmpeg -f x11grab -r 1 -video_size 1920x1080 -probesize 20M -threads 1 -i :1 -vcodec libx264 -b:v 128k -s hd720 ~/CS4231-midterm-A0190190L.mp4
