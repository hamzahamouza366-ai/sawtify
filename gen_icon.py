"""توليد أيقونة التطبيق (نغمتان بيضاوان على خلفية خضراء متدرجة)"""
from PIL import Image, ImageDraw
import os

S = 1024          # حجم الرسم الأولي (يُصغَّر لاحقاً لضماننعيم الحواف)
K = 4             # معامل التكبير (تصميم 256 × 4)
HERE = os.path.dirname(os.path.abspath(__file__))


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


# خلفية متدرجة (أخضر سبوتيفاي)
top = (30, 215, 96)     # #1ed760
bot = (16, 138, 60)     # أخضر أغمق
grad = Image.new('RGB', (S, S))
gd = ImageDraw.Draw(grad)
for y in range(S):
    gd.line([(0, y), (S, y)], fill=lerp(top, bot, y / (S - 1)))

# قناع مربع دائري الحواف
mask = Image.new('L', (S, S), 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, S - 1, S - 1], radius=56 * K, fill=255)

icon = Image.new('RGBA', (S, S), (0, 0, 0, 0))
icon.paste(grad, (0, 0), mask)

# طبقة النغمات البيضاء
notes = Image.new('RGBA', (S, S), (0, 0, 0, 0))
nd = ImageDraw.Draw(notes)
white = (255, 255, 255, 255)


def head(cx, cy):
    """رأس النغمة (بيضاوي مائل -18 درجة)"""
    w, h = 60 * K, 46 * K
    layer = Image.new('RGBA', (w + 12, h + 12), (0, 0, 0, 0))
    ImageDraw.Draw(layer).ellipse([6, 6, w + 5, h + 5], fill=white)
    layer = layer.rotate(-18, expand=True, resample=Image.BICUBIC)
    notes.alpha_composite(layer, (int(cx - layer.width / 2), int(cy - layer.height / 2)))


# رأسا النغمتين
head(92 * K, 178 * K)
head(172 * K, 158 * K)

# السيقان
nd.rectangle([116 * K, 62 * K, 126 * K, 178 * K], fill=white)
nd.rectangle([196 * K, 40 * K, 206 * K, 158 * K], fill=white)

# الجزء الرابط بين الساقين
nd.polygon([
    (116 * K, 62 * K),
    (206 * K, 40 * K),
    (206 * K, 74 * K),
    (116 * K, 96 * K)
], fill=white)

icon.alpha_composite(notes)

# تصغير ناعم
icon256 = icon.resize((256, 256), Image.LANCZOS)

ico_path = os.path.join(HERE, 'app.ico')
png_path = os.path.join(HERE, 'app.png')
icon256.save(png_path)
icon256.save(ico_path, sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])

# معاينة مكبّرة للفحص
icon.resize((512, 512), Image.LANCZOS).save(os.path.join(HERE, 'app_preview.png'))
print('OK', ico_path, os.path.getsize(ico_path), 'bytes')
