import os
from datetime import datetime

file_path = '.Jules/palette.md'
new_entry = f"""
## {datetime.now().strftime('%Y-%m-%d')} - Hiding Redundant Directional Arrows
**Learning:** Text-based directional arrows (like `→` and `←`) used inline for visual affordance are read out loud by screen readers, creating annoying auditory clutter (e.g., reading "Start an inquiry rightwards arrow").
**Action:** Always wrap text-based decorative arrows in `<span aria-hidden="true">` or `<tspan aria-hidden="true">` (if inside an SVG `<text>` block) to hide them from screen readers while preserving the visual UX.
"""

if os.path.exists(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    if "Hiding Redundant Directional Arrows" not in content:
        with open(file_path, 'a') as f:
            f.write(new_entry)
else:
    with open(file_path, 'w') as f:
        f.write(new_entry)
