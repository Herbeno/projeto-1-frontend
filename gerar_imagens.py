# -*- coding: utf-8 -*-
"""Gera imagens PNG, JPG e WebP otimizadas para o projeto frontend."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

IMG = Path(__file__).parent / "img"


def save_all(name: str, img: Image.Image) -> None:
    img.save(IMG / f"{name}.png", optimize=True)
    img.save(IMG / f"{name}.jpg", quality=82, optimize=True)
    img.save(IMG / f"{name}.webp", quality=82, method=6)


def texto(draw, xy, text, fill, size=22):
    try:
        font = ImageFont.truetype("arial.ttf", size)
    except OSError:
        font = ImageFont.load_default()
    draw.text(xy, text, fill=fill, font=font)


def logo():
    w, h = 360, 120
    img = Image.new("RGB", (w, h), "#1f6b4a")
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((8, 8, w - 8, h - 8), radius=12, outline="#d4f0e4", width=3)
    texto(d, (24, 28), "ONG Esperança", "#ffffff", 28)
    texto(d, (24, 68), "Solidária", "#d4f0e4", 24)
    save_all("logo", img)


def banner(titulo, subtitulo, cor, name, size=(800, 450)):
    img = Image.new("RGB", size, cor)
    d = ImageDraw.Draw(img)
    d.rectangle((0, size[1] - 120, size[0], size[1]), fill="#0f3d2e")
    texto(d, (40, 40), titulo, "#ffffff", 34)
    texto(d, (40, 90), subtitulo, "#e8f5ee", 22)
    texto(d, (40, size[1] - 80), "Imagem ilustrativa — projeto acadêmico", "#d4f0e4", 18)
    save_all(name, img)


def main():
    IMG.mkdir(exist_ok=True)
    logo()
    banner("Ação solidária", "Voluntários em campo — Gramado/RS", "#2d8a5e", "equipe")
    banner("Educação", "Reforço escolar comunitário", "#3a7ca5", "projeto-educacao", (400, 260))
    banner("Alimentação", "Cestas e cozinha solidária", "#c47a2c", "projeto-alimentacao", (400, 260))
    banner("Acolhimento", "Orientação e encaminhamento", "#6b4c9a", "projeto-acolhimento", (400, 260))
    print("Imagens geradas em", IMG)


if __name__ == "__main__":
    main()
