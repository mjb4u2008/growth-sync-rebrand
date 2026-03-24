#!/usr/bin/env python3

from __future__ import annotations

import sys
from collections import deque
from pathlib import Path

from PIL import Image


def is_background(pixel: tuple[int, int, int, int], threshold: int = 220) -> bool:
    red, green, blue, alpha = pixel
    return alpha > 0 and red >= threshold and green >= threshold and blue >= threshold


def build_background_mask(image: Image.Image) -> Image.Image:
    width, height = image.size
    source = image.load()
    mask = Image.new("L", image.size, 0)
    mask_pixels = mask.load()
    queue: deque[tuple[int, int]] = deque()

    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))

    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))

    while queue:
        x, y = queue.popleft()
        if x < 0 or y < 0 or x >= width or y >= height:
            continue
        if mask_pixels[x, y] == 255:
            continue
        if not is_background(source[x, y]):
            continue

        mask_pixels[x, y] = 255
        queue.append((x + 1, y))
        queue.append((x - 1, y))
        queue.append((x, y + 1))
        queue.append((x, y - 1))

    return mask


def strip_near_white_pixels(image: Image.Image, threshold: int = 236) -> Image.Image:
    source = image.load()
    cleaned = image.copy()
    target = cleaned.load()

    for y in range(image.height):
        for x in range(image.width):
            red, green, blue, alpha = source[x, y]
            if alpha > 0 and red >= threshold and green >= threshold and blue >= threshold:
                target[x, y] = (red, green, blue, 0)

    return cleaned


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Usage: remove-white-background.py <input> <output>")

    input_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])

    image = Image.open(input_path).convert("RGBA")
    background_mask = build_background_mask(image)
    alpha = Image.eval(background_mask, lambda value: 0 if value == 255 else 255)
    image.putalpha(alpha)
    image = strip_near_white_pixels(image)

    bbox = image.getbbox()
    if bbox is None:
        raise SystemExit(f"No foreground detected in {input_path}")

    x0, y0, x1, y1 = bbox
    pad_x = max(24, int((x1 - x0) * 0.08))
    pad_y = max(24, int((y1 - y0) * 0.08))
    cropped = image.crop(
        (
            max(0, x0 - pad_x),
            max(0, y0 - pad_y),
            min(image.width, x1 + pad_x),
            min(image.height, y1 + pad_y),
        )
    )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    cropped.save(output_path)


if __name__ == "__main__":
    main()
