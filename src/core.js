/**
 * Small input-state core for NexaController's local UI demo.
 * This tracks UI input only; it does not connect to a console or emulate hardware.
 */
export class ControllerCore {
  constructor() {
    this.buttonSources = new Map();
    this.sticks = {
      left: { x: 0, y: 0 },
      right: { x: 0, y: 0 }
    };
  }

  press(button, source = "default") {
    if (typeof button !== "string" || !button.trim()) {
      throw new TypeError("button must be a non-empty string");
    }
    if (typeof source !== "string" || !source) {
      throw new TypeError("source must be a non-empty string");
    }
    if (!this.buttonSources.has(button)) this.buttonSources.set(button, new Set());
    this.buttonSources.get(button).add(source);
    return this.isPressed(button);
  }

  release(button, source = "default") {
    const sources = this.buttonSources.get(button);
    if (!sources) return false;
    sources.delete(source);
    if (sources.size === 0) this.buttonSources.delete(button);
    return this.isPressed(button);
  }

  isPressed(button) {
    return (this.buttonSources.get(button)?.size ?? 0) > 0;
  }

  releaseAll(source) {
    if (source === undefined) {
      this.buttonSources.clear();
    } else {
      for (const [button, sources] of this.buttonSources) {
        sources.delete(source);
        if (sources.size === 0) this.buttonSources.delete(button);
      }
    }
    return this.snapshot();
  }

  setStick(name, x, y, deadzone = 0.12) {
    if (!(name in this.sticks)) throw new RangeError(`Unknown stick: ${name}`);
    if (![x, y, deadzone].every(Number.isFinite)) {
      throw new TypeError("stick values and deadzone must be finite numbers");
    }
    if (deadzone < 0 || deadzone >= 1) {
      throw new RangeError("deadzone must be at least 0 and less than 1");
    }

    let nx = Math.max(-1, Math.min(1, x));
    let ny = Math.max(-1, Math.min(1, y));
    const magnitude = Math.hypot(nx, ny);
    if (magnitude > 1) {
      nx /= magnitude;
      ny /= magnitude;
    }
    if (Math.hypot(nx, ny) < deadzone) {
      nx = 0;
      ny = 0;
    }
    this.sticks[name] = { x: nx, y: ny };
    return { ...this.sticks[name] };
  }

  snapshot() {
    return {
      buttons: [...this.buttonSources.entries()]
        .filter(([, sources]) => sources.size > 0)
        .map(([button]) => button)
        .sort(),
      sticks: {
        left: { ...this.sticks.left },
        right: { ...this.sticks.right }
      }
    };
  }
}
