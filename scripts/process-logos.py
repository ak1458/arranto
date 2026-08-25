import os
import base64
from PIL import Image, ImageFilter
import numpy as np

src_dir = r"C:\Users\ashra\.gemini\antigravity-ide\brain\de243606-7a9b-49fc-8905-37c7e412ad9f\.user_uploaded"
brand_dir = r"d:\gravity\Arranto\site\public\brand"
app_dir = r"d:\gravity\Arranto\site\src\app"
os.makedirs(brand_dir, exist_ok=True)

# 1. WORDMARK
wm_orig = Image.open(os.path.join(src_dir, "media_1787638319348.png")).convert("RGBA")
wm_crop = wm_orig.crop(wm_orig.getbbox())
pad = 12
wm_light = Image.new("RGBA", (wm_crop.width + pad*2, wm_crop.height + pad*2), (0,0,0,0))
wm_light.paste(wm_crop, (pad, pad))
wm_light.save(os.path.join(brand_dir, "arranto-wordmark-light.png"))
wm_light.save(os.path.join(brand_dir, "arranto-wordmark-light.webp"))

wm_dark_arr = np.array(wm_light).copy()
wm_dark_arr[:, :, 0] = 255
wm_dark_arr[:, :, 1] = 255
wm_dark_arr[:, :, 2] = 255
wm_dark = Image.fromarray(wm_dark_arr)
wm_dark.save(os.path.join(brand_dir, "arranto-wordmark-dark.png"))
wm_dark.save(os.path.join(brand_dir, "arranto-wordmark-dark.webp"))
wm_dark.save(os.path.join(brand_dir, "arranto-wordmark.png"))
wm_dark.save(os.path.join(brand_dir, "arranto-wordmark.webp"))

# 2. SYMBOL
sym_orig = Image.open(os.path.join(src_dir, "media_1787638319495.png")).convert("RGBA")
sym_crop = sym_orig.crop(sym_orig.getbbox())
pad = 16
sym_padded = Image.new("RGBA", (sym_crop.width + pad*2, sym_crop.height + pad*2), (0,0,0,0))
sym_padded.paste(sym_crop, (pad, pad))
sym_padded.save(os.path.join(brand_dir, "arranto-symbol.png"))
sym_padded.save(os.path.join(brand_dir, "arranto-symbol.webp"))
sym_padded.save(os.path.join(brand_dir, "arranto-icon.png"))
sym_padded.save(os.path.join(brand_dir, "arranto-icon.webp"))

# 3. HORIZONTAL LOGO
hz_orig = Image.open(os.path.join(src_dir, "media_1787638319449.png")).convert("RGBA")
hz_crop = hz_orig.crop(hz_orig.getbbox())
pad = 12
hz_light = Image.new("RGBA", (hz_crop.width + pad*2, hz_crop.height + pad*2), (0,0,0,0))
hz_light.paste(hz_crop, (pad, pad))
hz_light.save(os.path.join(brand_dir, "arranto-logo-horizontal-light.png"))
hz_light.save(os.path.join(brand_dir, "arranto-logo-horizontal-light.webp"))

hz_dark_arr = np.array(hz_light).copy()
text_mask = np.zeros(hz_dark_arr.shape[:2], dtype=bool)
text_mask[:, 180:] = hz_dark_arr[:, 180:, 3] > 0
hz_dark_arr[text_mask, 0] = 255
hz_dark_arr[text_mask, 1] = 255
hz_dark_arr[text_mask, 2] = 255
hz_dark = Image.fromarray(hz_dark_arr)
hz_dark.save(os.path.join(brand_dir, "arranto-logo-horizontal-dark.png"))
hz_dark.save(os.path.join(brand_dir, "arranto-logo-horizontal-dark.webp"))
hz_dark.save(os.path.join(brand_dir, "arranto-logo-horizontal.png"))
hz_dark.save(os.path.join(brand_dir, "arranto-logo-horizontal.webp"))

# 4. VERTICAL / STACKED LOGO
vt_orig = Image.open(os.path.join(src_dir, "media_1787638319400.png")).convert("RGBA")
vt_crop = vt_orig.crop(vt_orig.getbbox())
pad = 20
vt_light = Image.new("RGBA", (vt_crop.width + pad*2, vt_crop.height + pad*2), (0,0,0,0))
vt_light.paste(vt_crop, (pad, pad))
vt_light.save(os.path.join(brand_dir, "arranto-logo-vertical-light.png"))
vt_light.save(os.path.join(brand_dir, "arranto-logo-vertical-light.webp"))
vt_light.save(os.path.join(brand_dir, "arranto-logo-stacked-light.png"))
vt_light.save(os.path.join(brand_dir, "arranto-logo-stacked-light.webp"))

vt_dark_arr = np.array(vt_light).copy()
text_mask_v = np.zeros(vt_dark_arr.shape[:2], dtype=bool)
text_mask_v[480:, :] = vt_dark_arr[480:, :, 3] > 0
vt_dark_arr[text_mask_v, 0] = 255
vt_dark_arr[text_mask_v, 1] = 255
vt_dark_arr[text_mask_v, 2] = 255
vt_dark = Image.fromarray(vt_dark_arr)
vt_dark.save(os.path.join(brand_dir, "arranto-logo-vertical-dark.png"))
vt_dark.save(os.path.join(brand_dir, "arranto-logo-vertical-dark.webp"))
vt_dark.save(os.path.join(brand_dir, "arranto-logo-vertical.png"))
vt_dark.save(os.path.join(brand_dir, "arranto-logo-vertical.webp"))
vt_dark.save(os.path.join(brand_dir, "arranto-logo-stacked.png"))
vt_dark.save(os.path.join(brand_dir, "arranto-logo-stacked.webp"))

# SVGs with base64 embedded for 100% fidelity vector containers
def img_to_b64(path):
    with open(path, "rb") as f:
        return "data:image/png;base64," + base64.b64encode(f.read()).decode("utf-8")

sym_b64 = img_to_b64(os.path.join(brand_dir, "arranto-symbol.png"))
hz_dark_b64 = img_to_b64(os.path.join(brand_dir, "arranto-logo-horizontal-dark.png"))
vt_dark_b64 = img_to_b64(os.path.join(brand_dir, "arranto-logo-vertical-dark.png"))
wm_dark_b64 = img_to_b64(os.path.join(brand_dir, "arranto-wordmark-dark.png"))

# 1. arranto-icon.svg
sym_img = Image.open(os.path.join(brand_dir, "arranto-symbol.png"))
icon_svg = f"""<svg viewBox="0 0 {sym_img.width} {sym_img.height}" xmlns="http://www.w3.org/2000/svg">
  <image href="{sym_b64}" width="{sym_img.width}" height="{sym_img.height}" />
</svg>"""
with open(os.path.join(brand_dir, "arranto-icon.svg"), "w", encoding="utf-8") as f:
    f.write(icon_svg)

# 2. app/icon.svg (Favicon)
app_icon_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="28" fill="#000000" />
  <image href="{sym_b64}" x="14" y="14" width="100" height="100" />
</svg>"""
with open(os.path.join(app_dir, "icon.svg"), "w", encoding="utf-8") as f:
    f.write(app_icon_svg)

# 3. arranto-logo-horizontal.svg
hz_img = Image.open(os.path.join(brand_dir, "arranto-logo-horizontal-dark.png"))
hz_svg = f"""<svg viewBox="0 0 {hz_img.width} {hz_img.height}" xmlns="http://www.w3.org/2000/svg">
  <image href="{hz_dark_b64}" width="{hz_img.width}" height="{hz_img.height}" />
</svg>"""
with open(os.path.join(brand_dir, "arranto-logo-horizontal.svg"), "w", encoding="utf-8") as f:
    f.write(hz_svg)

# 4. arranto-logo-stacked.svg
vt_img = Image.open(os.path.join(brand_dir, "arranto-logo-vertical-dark.png"))
vt_svg = f"""<svg viewBox="0 0 {vt_img.width} {vt_img.height}" xmlns="http://www.w3.org/2000/svg">
  <image href="{vt_dark_b64}" width="{vt_img.width}" height="{vt_img.height}" />
</svg>"""
with open(os.path.join(brand_dir, "arranto-logo-stacked.svg"), "w", encoding="utf-8") as f:
    f.write(vt_svg)

# Favicon raster outputs in site/public/
sym_square = Image.new("RGBA", (128, 128), (0, 0, 0, 255))
sym_resized = sym_img.resize((100, 100), Image.Resampling.LANCZOS)
sym_square.paste(sym_resized, (14, 14), sym_resized)
sym_square.save(os.path.join(r"d:\gravity\Arranto\site\public", "icon.png"))
sym_square.save(os.path.join(r"d:\gravity\Arranto\site\public", "apple-touch-icon.png"))

print("All brand logo assets and vector representations successfully generated!")
