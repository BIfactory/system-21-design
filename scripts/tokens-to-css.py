#!/usr/bin/env python3
"""tokens/tokens.json -> tokens/tokens.css (CSS custom properties + type classes).

Multi-brand: `brand.themes[]` v tokens.json generuje `[data-brand="<id>"]` overlay
pro každý brand kromě prvního (ten je default v :root, protože jeho hodnoty už
jsou v `color.tokens`). Dark mode zůstává v src/components/bundle.css.
"""
import json, re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
t = json.loads((root / "tokens/tokens.json").read_text())

def resolve(value):
    if isinstance(value, dict):
        value = value.get("light", value)
    return re.sub(r"^\{(.+)\}$", r"var(--\1)", value)

L = ["/* System 21 — design tokens (generated from tokens/tokens.json by scripts/tokens-to-css.py) */", ":root {"]
for c in t["color"]["tokens"]:
    L.append(f"  --{c['name']}: {resolve(c['value'])};")
for fam in ["spacing", "radius", "shadow", "size", "motion", "blur"]:
    for x in t.get(fam, {}).get("tokens", []):
        L.append(f"  --{x['name']}: {x['value']};")
for k, s in t["type"]["families"].items():
    L.append(f"  --font-{k}: {s};")
L.append("}")

# Brand overlays — vše kromě prvního theme generuje [data-brand="<id>"] { ... }
for theme in t.get("brand", {}).get("themes", []):
    if theme.get("default"):
        continue
    L.append("")
    L.append(f'/* Brand overlay: {theme.get("name", theme["id"])} */')
    L.append(f'[data-brand="{theme["id"]}"] {{')
    for tok in theme.get("tokens", []):
        L.append(f"  --{tok['name']}: {resolve(tok['value'])};")
    L.append("}")
for g in t["type"]["groups"]:
    for st in g["styles"]:
        r = [f"font-family: var(--font-{st.get('family', g['family'])})", f"font-size: {st['fontSize']}",
             f"line-height: {st['lineHeight']}", f"font-weight: {st['fontWeight']}"]
        if "letterSpacing" in st: r.append(f"letter-spacing: {st['letterSpacing']}")
        if g["name"] == "Mono" and st["name"] in ("label", "eyebrow", "overline"): r.append("text-transform: uppercase")
        L.append(f".{st['name']} {{ " + "; ".join(r) + "; }")
(root / "tokens/tokens.css").write_text("\n".join(L) + "\n")
print("tokens/tokens.css written")
