import os
import urllib.parse

gallery_dir = r"c:\Users\USUARIO\Desktop\hbd\assets\gallery"
files = [f for f in os.listdir(gallery_dir) if os.path.isfile(os.path.join(gallery_dir, f))]

html = '      <div class="polaroid-grid">\n'

rots = ['-3deg', '2.5deg', '-1.5deg', '3deg', '-2deg', '1.5deg']
emojis = ['✨', '❤️', '🫶', '🥰', '💫', '💜']
delay = [0, 50, 100, 150, 200, 250]

for i, f in enumerate(files):
    f_enc = urllib.parse.quote(f)
    rot = rots[i % len(rots)]
    emoji = emojis[i % len(emojis)]
    d = delay[i % len(delay)]
    
    html += f'''        <div class="polaroid-card" style="--rot:{rot};" data-aos="zoom-in" data-aos-delay="{d}">
          <img class="polaroid-photo" src="./assets/gallery/{f_enc}" alt="Momento" loading="lazy" />
          <p class="polaroid-caption">{emoji}</p>
        </div>\n'''

html += '      </div>'

with open("c:\\Users\\USUARIO\\Desktop\\hbd\\polaroids.txt", "w", encoding="utf-8") as f:
    f.write(html)
print("Done")
