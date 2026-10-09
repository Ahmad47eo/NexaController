# NexaController

A responsive, touch-friendly virtual controller **interface demo** for phones, tablets, and desktop browsers. It tracks button and stick input locally and includes keyboard controls.

## Important limitation

This repository does **not** control a real PlayStation 4. It does not implement USB HID, Bluetooth controller emulation, PS Remote Play, or a hardware bridge. The status indicator intentionally says "Demo mode — no console connected."

A normal USB-A-to-USB-C cable and a webpage are not enough to make an iPhone act as a DualShock 4 controller. Do not assume that pressing buttons here sends anything to a console.

## Run on Windows

1. Install Python 3 if it is not already installed: <https://www.python.org/downloads/windows/>
2. Download or clone this repository.
3. Double-click `start-windows.bat`.
4. Open <http://localhost:8080> if it does not open automatically.
5. Keep the terminal window open while testing.

Alternatively, from this folder run:

```bash
python -m http.server 8080
```

Then open <http://localhost:8080>.

## Use from an iPhone on the same Wi-Fi

1. Start the server on your Windows PC.
2. Find the PC's local IPv4 address in Windows (run `ipconfig` in Command Prompt).
3. On the iPhone, open `http://YOUR-PC-IP:8080` in Safari or Brave, replacing the example with your PC's IPv4 address.
4. Keep both devices on the same local network. Windows Firewall may ask whether to allow Python on a private network.

This shares the demo webpage with your phone; it still does not connect the phone to a PS4.

## Controls

- D-pad: arrow keys or WASD
- Cross: Enter
- Circle: Backspace
- Square: Q
- Triangle: E
- L1 / R1: U / O
- L2 / R2: I / P
- PS: Space
- Touch buttons and analog-stick surfaces work with pointer input.
- Use **Release all buttons** if an input appears stuck.
- Button size can be adjusted with the slider.

## Tests

Requires Node.js 18 or newer:

```bash
npm test
```

The tests cover the input-state core only. They do not validate every browser layout, mobile browser behavior, haptics support, or any console connection.

## Project files

- `index.html` — responsive controller interface
- `src/core.js` — local input-state logic
- `test/core.test.js` — Node.js unit tests
- `start-windows.bat` — local Windows launcher
- `package.json` — scripts and project metadata
