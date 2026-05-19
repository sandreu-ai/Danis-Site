#!/usr/bin/env python3
from __future__ import annotations

import json
import zipfile
from pathlib import Path

import fitz  # PyMuPDF
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
SRC = ROOT / "source"
DIST.mkdir(parents=True, exist_ok=True)
SRC.mkdir(parents=True, exist_ok=True)

PAGE_W, PAGE_H = letter
MARGIN = 54

PALETTE = {
    "cream": "#FBF7EF",
    "soft_cream": "#FFFDF8",
    "sage": "#9CAF88",
    "dusty_blue": "#8EA6B4",
    "terracotta": "#C47C65",
    "mustard": "#D5B15F",
    "clay": "#B58B7A",
    "espresso": "#2B211C",
    "cocoa": "#7A6256",
    "border": "#D9C8B9",
    "line": "#CBB9A8",
}

CHECKLISTS = [
    {
        "title": "Bedroom Reset Checklist",
        "subtitle": "A simple room reset before the next part of the day.",
        "icon": "bed",
        "accent": "sage",
        "items": [
            "Make my bed",
            "Put pajamas or clothes in the basket",
            "Put books and toys back where they belong",
            "Clear the floor",
            "Open or straighten curtains",
            "Check: Does my room feel ready?",
        ],
        "gentle_note": "Parent tip: Start with three items for younger children, then add the rest when the rhythm feels natural.",
    },
    {
        "title": "Bathroom Cleanup Checklist",
        "subtitle": "Small habits that make the bathroom peaceful for the next person.",
        "icon": "toothbrush",
        "accent": "dusty_blue",
        "items": [
            "Hang my towel",
            "Put toothbrush and toothpaste away",
            "Wipe the sink area if needed",
            "Put clothes in the basket",
            "Close cabinets or drawers",
            "Check: Is the bathroom ready for the next person?",
        ],
        "gentle_note": "Parent tip: Keep a small cloth within reach if wiping the sink is part of the routine.",
    },
    {
        "title": "After-Meal Checklist",
        "subtitle": "A calm routine for helping after snacks and meals.",
        "icon": "plate",
        "accent": "terracotta",
        "items": [
            "Bring my plate, cup, and utensils to the sink",
            "Throw away trash",
            "Wipe my spot at the table",
            "Push in my chair",
            "Put lunchbox or snack items away",
            "Check: Is my eating space clean?",
        ],
        "gentle_note": "Parent tip: Practice right after one meal each day before expecting it after every meal.",
    },
    {
        "title": "Living Room Reset",
        "subtitle": "A quick family-space reset so everyone can enjoy the room.",
        "icon": "basket",
        "accent": "mustard",
        "items": [
            "Put pillows back",
            "Fold or place blankets neatly",
            "Return books to the shelf",
            "Put toys or activities in their basket",
            "Look under the couch or table",
            "Check: Is the room ready for the family?",
        ],
        "gentle_note": "Parent tip: Use one basket for items that need to return to other rooms after the reset.",
    },
    {
        "title": "Morning Routine Checklist",
        "subtitle": "A visual rhythm for beginning the day without repeated reminders.",
        "icon": "sun",
        "accent": "clay",
        "items": [
            "Use the bathroom",
            "Get dressed",
            "Make my bed",
            "Brush teeth and hair",
            "Put pajamas away",
            "Come to breakfast or morning time",
        ],
        "gentle_note": "Parent tip: Keep this checklist near the bedroom or bathroom, not hidden in a binder.",
    },
    {
        "title": "Bedtime Routine Checklist",
        "subtitle": "A gentle end-of-day rhythm children can learn to follow.",
        "icon": "moon",
        "accent": "sage",
        "items": [
            "Put on pajamas",
            "Put clothes in the basket",
            "Brush teeth",
            "Choose tomorrow’s clothes or items",
            "Put away books or toys",
            "Get in bed for story, prayer, or goodnight",
        ],
        "gentle_note": "Parent tip: If evenings feel rushed, begin the checklist 15 minutes earlier for one week.",
    },
]


def hex_color(name: str):
    return colors.HexColor(PALETTE[name])


def register_fonts():
    fonts = {
        "DaniSerif": "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf",
        "DaniSerifBold": "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf",
        "DaniSans": "/usr/share/fonts/truetype/ubuntu/UbuntuSans[wdth,wght].ttf",
        "DaniSansItalic": "/usr/share/fonts/truetype/ubuntu/UbuntuSans-Italic[wdth,wght].ttf",
    }
    for name, path in fonts.items():
        if Path(path).exists():
            pdfmetrics.registerFont(TTFont(name, path))


def draw_text(c, text, x, y, font="DaniSans", size=10, color="espresso", leading=None, max_width=None):
    c.setFillColor(hex_color(color) if isinstance(color, str) and color in PALETTE else color)
    c.setFont(font, size)
    if not max_width:
        c.drawString(x, y, text)
        return y - (leading or size * 1.3)
    lines = simpleSplit(text, font, size, max_width)
    line_height = leading or size * 1.35
    for line in lines:
        c.drawString(x, y, line)
        y -= line_height
    return y


def draw_centered(c, text, y, font="DaniSans", size=10, color="espresso", max_width=None, leading=None):
    c.setFillColor(hex_color(color))
    c.setFont(font, size)
    lines = simpleSplit(text, font, size, max_width or (PAGE_W - 2*MARGIN))
    line_height = leading or size * 1.28
    for line in lines:
        c.drawCentredString(PAGE_W / 2, y, line)
        y -= line_height
    return y


def round_rect(c, x, y, w, h, r=12, fill="soft_cream", stroke="border", sw=1):
    c.setLineWidth(sw)
    c.setStrokeColor(hex_color(stroke))
    c.setFillColor(hex_color(fill))
    c.roundRect(x, y, w, h, r, fill=1, stroke=1)


def draw_brand_header(c):
    c.setFillColor(hex_color("cocoa"))
    c.setFont("DaniSans", 8.5)
    c.drawString(MARGIN, PAGE_H - 38, "RAISING CAPABLE KIDS")
    c.setFont("DaniSans", 7.5)
    c.drawRightString(PAGE_W - MARGIN, PAGE_H - 38, "Simple visual checklists for more independence at home")
    c.setStrokeColor(hex_color("border"))
    c.setLineWidth(0.75)
    c.line(MARGIN, PAGE_H - 50, PAGE_W - MARGIN, PAGE_H - 50)


def draw_footer(c, page_num=None):
    c.setStrokeColor(hex_color("border"))
    c.setLineWidth(0.5)
    c.line(MARGIN, 38, PAGE_W - MARGIN, 38)
    c.setFillColor(hex_color("cocoa"))
    c.setFont("DaniSans", 8)
    c.drawString(MARGIN, 24, "Daniela Cerrato | @Thedanicerrato")
    if page_num:
        c.drawRightString(PAGE_W - MARGIN, 24, f"{page_num}")


def draw_icon(c, name, x, y, size=42, color_name="sage"):
    col = hex_color(color_name)
    dark = hex_color("espresso")
    c.setStrokeColor(col)
    c.setFillColor(colors.white)
    c.setLineWidth(2)
    s = size
    if name == "bed":
        c.roundRect(x, y, s, s*0.45, 6, fill=0, stroke=1)
        c.roundRect(x+3, y+s*0.22, s*0.28, s*0.18, 4, fill=0, stroke=1)
        c.line(x+4, y-4, x+4, y)
        c.line(x+s-4, y-4, x+s-4, y)
    elif name == "toothbrush":
        c.line(x+s*0.25, y+s*0.1, x+s*0.68, y+s*0.82)
        c.roundRect(x+s*0.62, y+s*0.72, s*0.22, s*0.12, 4, fill=0, stroke=1)
        for i in range(4):
            c.line(x+s*(0.65+i*0.04), y+s*0.84, x+s*(0.65+i*0.04), y+s*0.95)
    elif name == "plate":
        c.circle(x+s/2, y+s/2, s*0.36, fill=0, stroke=1)
        c.circle(x+s/2, y+s/2, s*0.22, fill=0, stroke=1)
        c.line(x+s*0.1, y+s*0.15, x+s*0.1, y+s*0.85)
        c.line(x+s*0.85, y+s*0.15, x+s*0.85, y+s*0.85)
    elif name == "basket":
        c.roundRect(x+s*0.14, y+s*0.18, s*0.72, s*0.52, 8, fill=0, stroke=1)
        c.arc(x+s*0.24, y+s*0.5, x+s*0.76, y+s*1.02, 205, 130)
        for i in range(3):
            c.line(x+s*(0.28+i*0.18), y+s*0.22, x+s*(0.28+i*0.18), y+s*0.66)
    elif name == "sun":
        c.circle(x+s/2, y+s/2, s*0.2, fill=0, stroke=1)
        for dx, dy in [(0, .38),(0,-.38),(.38,0),(-.38,0),(.27,.27),(-.27,.27),(.27,-.27),(-.27,-.27)]:
            c.line(x+s/2+dx*s*0.55, y+s/2+dy*s*0.55, x+s/2+dx*s*0.78, y+s/2+dy*s*0.78)
    elif name == "moon":
        c.setFillColor(colors.white)
        c.circle(x+s*0.56, y+s*0.55, s*0.27, fill=0, stroke=1)
        c.setStrokeColor(colors.white)
        c.setFillColor(colors.white)
        c.circle(x+s*0.67, y+s*0.63, s*0.24, fill=1, stroke=0)
        c.setStrokeColor(col)
        c.circle(x+s*0.42, y+s*0.77, s*0.025, fill=1, stroke=0)
        c.circle(x+s*0.25, y+s*0.52, s*0.018, fill=1, stroke=0)
    c.setStrokeColor(dark)


def draw_cover(c):
    c.setFillColor(hex_color("cream"))
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    # top muted rainbow arcs
    arc_colors = ["sage", "dusty_blue", "terracotta", "mustard", "clay"]
    c.setLineCap(1)
    for idx, name in enumerate(arc_colors):
        c.setStrokeColor(hex_color(name))
        c.setLineWidth(7)
        x1 = PAGE_W/2 - 120 + idx*14
        y1 = PAGE_H - 258 + idx*12
        x2 = PAGE_W/2 + 120 - idx*14
        y2 = PAGE_H - 18 - idx*12
        c.arc(x1, y1, x2, y2, 0, 180)

    c.setFillColor(hex_color("cocoa"))
    c.setFont("DaniSans", 9)
    c.drawCentredString(PAGE_W/2, PAGE_H - 74, "RAISING CAPABLE KIDS")
    c.setFont("DaniSans", 10)
    c.drawCentredString(PAGE_W/2, PAGE_H - 91, "Simple visual checklists for more independence at home")

    c.setFillColor(hex_color("espresso"))
    c.setFont("DaniSerifBold", 37)
    y = PAGE_H - 185
    for line in ["The Independence-", "at-Home", "Checklist Pack"]:
        c.drawCentredString(PAGE_W/2, y, line)
        y -= 42

    c.setFont("DaniSans", 13)
    c.setFillColor(hex_color("cocoa"))
    y = draw_centered(c, "Printable + laminate-friendly routines to help kids learn responsibility without constant reminders.", y-8, "DaniSans", 13, "cocoa", PAGE_W-150, 18)

    # small included list card
    # Use a fixed 3-column grid so every item stays inside the rounded card.
    card_w, card_h = 432, 150
    card_x, card_y = (PAGE_W-card_w)/2, 158
    round_rect(c, card_x, card_y, card_w, card_h, 18, "soft_cream", "border", 1)
    c.setFont("DaniSans", 9)
    c.setFillColor(hex_color("cocoa"))
    c.drawCentredString(PAGE_W/2, card_y+card_h-28, "INCLUDED INSIDE")
    includes = [
        ("Bedroom", 0, 0),
        ("Bathroom", 1, 0),
        ("After-Meal", 2, 0),
        ("Living Room", 0, 1),
        ("Morning", 1, 1),
        ("Bedtime", 2, 1),
        ("Parent Guide", 1, 2),
    ]
    col_w = card_w / 3
    row_ys = [card_y + 91, card_y + 60, card_y + 29]
    for i, (label, col, row) in enumerate(includes):
        cname = arc_colors[i % len(arc_colors)]
        x = card_x + 28 + col * col_w
        y = row_ys[row]
        c.setFillColor(hex_color(cname))
        c.circle(x, y+3, 4, fill=1, stroke=0)
        c.setFillColor(hex_color("espresso"))
        c.setFont("DaniSans", 9.2)
        c.drawString(x+11, y, label)

    c.setFont("DaniSerif", 13)
    c.setFillColor(hex_color("espresso"))
    draw_centered(c, "“You don’t need an expensive system to raise independent kids. You need clear expectations, consistency, and visuals.”", 126, "DaniSerif", 13, "espresso", PAGE_W-145, 18.5)

    c.setFont("DaniSans", 9)
    c.setFillColor(hex_color("cocoa"))
    c.drawCentredString(PAGE_W/2, 47, "Daniela Cerrato | @Thedanicerrato")
    c.showPage()


def draw_checklist_page(c, spec, page_num):
    c.setFillColor(colors.white)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_brand_header(c)

    accent = spec["accent"]
    # side accent tab
    c.setFillColor(hex_color(accent))
    c.roundRect(MARGIN, PAGE_H-112, 12, 52, 6, fill=1, stroke=0)
    draw_icon(c, spec["icon"], PAGE_W - MARGIN - 54, PAGE_H-116, 46, accent)

    c.setFillColor(hex_color("espresso"))
    c.setFont("DaniSerifBold", 27)
    c.drawString(MARGIN + 22, PAGE_H - 86, spec["title"])
    draw_text(c, spec["subtitle"], MARGIN + 22, PAGE_H - 109, "DaniSans", 10.5, "cocoa", max_width=390)

    # checklist rows
    start_y = PAGE_H - 175
    row_h = 63
    for idx, item in enumerate(spec["items"]):
        y = start_y - idx * row_h
        round_rect(c, MARGIN, y - 44, PAGE_W - 2*MARGIN, 48, 12, "soft_cream", "border", 0.8)
        # checkbox
        c.setStrokeColor(hex_color(accent))
        c.setLineWidth(2.0)
        c.roundRect(MARGIN + 18, y - 29, 19, 19, 4, fill=0, stroke=1)
        c.setFillColor(hex_color("espresso"))
        c.setFont("DaniSans", 13)
        c.drawString(MARGIN + 52, y - 24, item)

    # laminate-friendly note / repeat space
    note_y = 128
    c.setFillColor(hex_color("cream"))
    c.setStrokeColor(hex_color("border"))
    c.setLineWidth(0.8)
    c.roundRect(MARGIN, note_y-24, PAGE_W-2*MARGIN, 56, 12, fill=1, stroke=1)
    c.setFont("DaniSans", 8.5)
    c.setFillColor(hex_color("cocoa"))
    c.drawString(MARGIN+18, note_y+10, "GENTLE NOTE")
    draw_text(c, spec["gentle_note"], MARGIN+18, note_y-7, "DaniSans", 9.6, "espresso", max_width=PAGE_W-2*MARGIN-36, leading=13)

    draw_footer(c, page_num)
    c.showPage()


def draw_parent_guide(c, page_num):
    c.setFillColor(colors.white)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_brand_header(c)

    c.setFillColor(hex_color("espresso"))
    c.setFont("DaniSerifBold", 28)
    c.drawString(MARGIN, PAGE_H - 91, "Parent Guide")
    c.setFont("DaniSans", 12)
    c.setFillColor(hex_color("cocoa"))
    c.drawString(MARGIN, PAGE_H - 113, "How to Build Independence Without Constant Reminders")

    y = PAGE_H - 155
    intro = "These pages are designed to help your child see what is expected, practice the same rhythm consistently, and build confidence through simple visual routines."
    y = draw_text(c, intro, MARGIN, y, "DaniSans", 11, "espresso", leading=16, max_width=PAGE_W - 2*MARGIN)
    y -= 8

    blocks = [
        ("1. Start smaller than you think", "Choose one checklist and practice it together for a few days. If your child is young or easily overwhelmed, begin with only two or three items."),
        ("2. Model it before expecting independence", "Walk through the routine out loud: ‘First we make the bed, then clothes go in the basket, then we clear the floor.’ Children learn the rhythm before they own the rhythm."),
        ("3. Keep the checklist where the routine happens", "A bathroom checklist belongs near the sink. A bedroom checklist belongs where your child gets ready. Visuals work best when they are visible at the moment they are needed."),
        ("4. Use consistency instead of constant talking", "Point to the checklist before repeating directions. Over time, the visual becomes the reminder instead of your voice becoming the system."),
        ("5. Celebrate follow-through, not perfection", "The goal is not a perfectly managed home. The goal is a child who is learning to notice, participate, and take the next step."),
    ]
    for title, body in blocks:
        round_rect(c, MARGIN, y-68, PAGE_W-2*MARGIN, 63, 12, "soft_cream", "border", 0.8)
        c.setFont("DaniSans", 11.5)
        c.setFillColor(hex_color("espresso"))
        c.drawString(MARGIN+18, y-25, title)
        draw_text(c, body, MARGIN+18, y-43, "DaniSans", 9.5, "cocoa", leading=12.5, max_width=PAGE_W-2*MARGIN-36)
        y -= 79

    draw_footer(c, page_num)
    c.showPage()


def draw_parent_guide_2(c, page_num):
    c.setFillColor(colors.white)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_brand_header(c)
    c.setFillColor(hex_color("espresso"))
    c.setFont("DaniSerifBold", 25)
    c.drawString(MARGIN, PAGE_H - 88, "How to Adapt the Checklists")

    y = PAGE_H - 135
    columns = [
        ("For younger children", [
            "Use one checklist at a time.",
            "Cover extra items with a sticky note if needed.",
            "Point to the icon or first word as you read it aloud.",
            "Praise one completed step before correcting another.",
        ], "sage"),
        ("For older children", [
            "Let them self-check before asking for help.",
            "Add a time anchor, such as before breakfast or after dinner.",
            "Invite them to choose the order when the order does not matter.",
            "Use the final check question to build ownership.",
        ], "dusty_blue"),
    ]
    col_w = (PAGE_W - 2*MARGIN - 18) / 2
    for i, (title, bullets, accent) in enumerate(columns):
        x = MARGIN + i * (col_w + 18)
        round_rect(c, x, y-232, col_w, 232, 16, "soft_cream", "border", 0.9)
        c.setFillColor(hex_color(accent))
        c.roundRect(x+17, y-38, 38, 8, 4, fill=1, stroke=0)
        c.setFillColor(hex_color("espresso"))
        c.setFont("DaniSerifBold", 17)
        c.drawString(x+17, y-66, title)
        yy = y-99
        for b in bullets:
            c.setStrokeColor(hex_color(accent))
            c.setLineWidth(1.4)
            c.circle(x+23, yy+4, 3, fill=0, stroke=1)
            draw_text(c, b, x+36, yy, "DaniSans", 9.6, "espresso", leading=12.5, max_width=col_w-55)
            yy -= 34

    # simple implementation rhythm
    y2 = 328
    c.setFillColor(hex_color("cream"))
    c.setStrokeColor(hex_color("border"))
    c.roundRect(MARGIN, y2-162, PAGE_W-2*MARGIN, 162, 16, fill=1, stroke=1)
    c.setFillColor(hex_color("espresso"))
    c.setFont("DaniSerifBold", 19)
    c.drawString(MARGIN+22, y2-35, "A Simple 5-Day Start")
    days = [
        ("Day 1", "Choose one checklist and do it together."),
        ("Day 2", "Let your child lead while you stay nearby."),
        ("Day 3", "Point to the checklist instead of repeating every step."),
        ("Day 4", "Ask, ‘What comes next?’ before helping."),
        ("Day 5", "Celebrate the routine and decide what to practice next."),
    ]
    yy = y2 - 65
    for day, text in days:
        c.setFillColor(hex_color("terracotta"))
        c.setFont("DaniSans", 8.8)
        c.drawString(MARGIN+24, yy, day.upper())
        c.setFillColor(hex_color("espresso"))
        c.setFont("DaniSans", 9.8)
        c.drawString(MARGIN+79, yy, text)
        yy -= 21

    draw_footer(c, page_num)
    c.showPage()


def build_pdf(path: Path, pages="all"):
    c = canvas.Canvas(str(path), pagesize=letter)
    c.setTitle("The Independence-at-Home Checklist Pack")
    c.setAuthor("Daniela Cerrato")
    if pages == "all":
        draw_cover(c)
        p = 2
        for spec in CHECKLISTS:
            draw_checklist_page(c, spec, p)
            p += 1
        draw_parent_guide(c, p)
        draw_parent_guide_2(c, p+1)
    else:
        draw_checklist_page(c, pages, 1)
    c.save()


def render_cover(pdf_path: Path, png_path: Path):
    doc = fitz.open(str(pdf_path))
    pix = doc[0].get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    pix.save(str(png_path))
    doc.close()


def write_copy_files():
    copy = ROOT / "product-page-copy.md"
    copy.write_text("""# The Independence-at-Home Checklist Pack\n\n**Simple visual routines that help kids follow through without constant reminders.**\n\nYou don’t need an expensive system to raise independent kids. You need clear expectations, consistency, and visuals.\n\nThe Independence-at-Home Checklist Pack gives your child calm, easy-to-follow routines for the everyday moments that often turn into repeated reminders: bedrooms, bathrooms, mealtimes, living spaces, mornings, and bedtime.\n\n## What’s included\n\n- Cover Page\n- Bedroom Reset Checklist\n- Bathroom Cleanup Checklist\n- After-Meal Checklist\n- Living Room Reset\n- Morning Routine Checklist\n- Bedtime Routine Checklist\n- Parent Guide: How to Build Independence Without Constant Reminders\n\n## Who it’s for\n\nThis pack is designed for families who want a simple, visual way to help children participate in home routines with more confidence and less nagging. The checklists are universal and adaptable: start with a few steps for younger children, or use the full routine for older children.\n\n## Format\n\nPrintable PDF. Laminate-friendly. Minimal color. Plenty of white space.\n\n## Short description\n\nA printable checklist pack with calm, visual home routines that help kids learn responsibility without constant reminders. Includes bedroom, bathroom, after-meal, living room, morning, bedtime, and parent guide pages.\n""", encoding="utf-8")

    upload = ROOT / "upload-notes.md"
    upload.write_text("""# Upload Notes — Independence-at-Home Checklist Pack\n\n## Suggested product fields\n\n- Product title: The Independence-at-Home Checklist Pack\n- Slug: independence-at-home-checklist-pack\n- Suggested price: $17 launch / $27 standard\n- File to upload: `dist/independence-at-home-checklist-pack.zip`\n- Main preview image: `dist/cover-preview.png`\n- Category: Parenting / Home Routines / Printables\n\n## Buyer promise\n\nHelp children follow simple home routines with clear visual expectations instead of repeated verbal reminders.\n\n## QA before publishing\n\n- Open the bundle ZIP.\n- Confirm the combined PDF has 9 pages.\n- Print one checklist page in grayscale.\n- Confirm checkboxes are large enough to use with dry-erase marker after laminating.\n- Confirm product page promises match the delivered files.\n""", encoding="utf-8")

    readme = ROOT / "README.md"
    readme.write_text("""# The Independence-at-Home Checklist Pack\n\nPrintable + laminate-friendly routines to help kids learn responsibility without constant reminders.\n\nCreated for Daniela Cerrato / @Thedanicerrato.\n\n## Files\n\n- `dist/the-independence-at-home-checklist-pack.pdf` — full 9-page product PDF\n- `dist/cover-preview.png` — product cover preview image\n- `dist/independence-at-home-checklist-pack.zip` — customer-ready delivery bundle\n- `dist/individual-checklists/*.pdf` — separate checklist pages for flexible use\n- `product-page-copy.md` — sales copy and short description\n- `upload-notes.md` — publishing checklist and product metadata\n- `source/product-spec.json` — product structure, colors, and checklist content\n\n## Design direction\n\nSoft muted rainbow palette, clean cozy fonts, minimal line icons, generous white space, laminate-friendly checklist rows, Montessori-inspired calm visuals.\n""", encoding="utf-8")

    spec = {
        "title": "The Independence-at-Home Checklist Pack",
        "tagline": "Printable + laminate-friendly routines to help kids learn responsibility without constant reminders.",
        "brand_top": "Raising Capable Kids — Simple visual checklists for more independence at home",
        "brand_bottom": "Daniela Cerrato | @Thedanicerrato",
        "positioning": "You don’t need an expensive system to raise independent kids. You need clear expectations, consistency, and visuals.",
        "palette": PALETTE,
        "checklists": CHECKLISTS,
    }
    (SRC / "product-spec.json").write_text(json.dumps(spec, indent=2), encoding="utf-8")


def create_zip():
    zip_path = DIST / "independence-at-home-checklist-pack.zip"
    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as z:
        z.write(DIST / "the-independence-at-home-checklist-pack.pdf", "the-independence-at-home-checklist-pack.pdf")
        z.write(ROOT / "README.md", "README.txt")
        for f in sorted((DIST / "individual-checklists").glob("*.pdf")):
            z.write(f, f"individual-checklists/{f.name}")
    return zip_path


def main():
    register_fonts()
    full_pdf = DIST / "the-independence-at-home-checklist-pack.pdf"
    build_pdf(full_pdf)
    render_cover(full_pdf, DIST / "cover-preview.png")

    indiv = DIST / "individual-checklists"
    indiv.mkdir(exist_ok=True)
    for idx, spec in enumerate(CHECKLISTS, 1):
        slug = spec["title"].lower().replace(" checklist", "").replace(" ", "-").replace("–", "-")
        build_pdf(indiv / f"{idx:02d}-{slug}.pdf", pages=spec)

    write_copy_files()
    zip_path = create_zip()

    doc = fitz.open(str(full_pdf))
    info = {
        "root": str(ROOT),
        "full_pdf": str(full_pdf),
        "full_pdf_pages": doc.page_count,
        "cover_preview": str(DIST / "cover-preview.png"),
        "zip": str(zip_path),
        "individual_checklists": [str(p) for p in sorted(indiv.glob("*.pdf"))],
        "product_page_copy": str(ROOT / "product-page-copy.md"),
        "upload_notes": str(ROOT / "upload-notes.md"),
        "source_spec": str(SRC / "product-spec.json"),
    }
    doc.close()
    print(json.dumps(info, indent=2))

if __name__ == "__main__":
    main()
