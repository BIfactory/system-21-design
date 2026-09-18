#!/usr/bin/env python3
"""tokens/tokens.json -> tokens/tokens.css (CSS custom properties + type classes)."""
import json, re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
t = json.loads((root / "tokens/tokens.json").read_text())
L = ["/* System 21 — design tokens (generated from tokens/tokens.json by scripts/tokens-to-css.py) */", ":root {"]
for c in t["color"]["tokens"]:
    v = c["value"] if isinstance(c["value"], str) else c["value"]["light"]
    v = re.sub(r"^\{(.+)\}$", r"var(--\1)", v)
    L.append(f"  --{c['name']}: {v};")
for fam in ["spacing", "radius", "shadow", "size"]:
    for x in t.get(fam, {}).get("tokens", []):
        L.append(f"  --{x['name']}: {x['value']};")
for k, s in t["type"]["families"].items():
    L.append(f"  --font-{k}: {s};")
L.append("}")
for g in t["type"]["groups"]:
    for st in g["styles"]:
        r = [f"font-family: var(--font-{st.get('family', g['family'])})", f"font-size: {st['fontSize']}",
             f"line-height: {st['lineHeight']}", f"font-weight: {st['fontWeight']}"]
        if "letterSpacing" in st: r.append(f"letter-spacing: {st['letterSpacing']}")
        if g["name"] == "Mono" and st["name"] in ("label", "eyebrow"): r.append("text-transform: uppercase")
        L.append(f".{st['name']} {{ " + "; ".join(r) + "; }")
(root / "tokens/tokens.css").write_text("\n".join(L) + "\n")
print("tokens/tokens.css written")
