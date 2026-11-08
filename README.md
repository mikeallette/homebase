# Hearth: thermostat control for your phone

A phone web app (PWA) for the Honeywell T6 Pro Z-Wave thermostat. You can add it to the Android home screen and it opens full screen like a normal app. Built 2026-11-08.

## What it does

- Shows the current indoor temperature, the setpoint, and whether the system is heating, cooling or idle
- Big + / − buttons for the setpoint. Taps are grouped, so pressing + three times sends one command.
- Mode: Off, Heat, Cool, Auto, Em Heat (only the modes the thermostat reports as supported)
- Fan: Auto, On, Circulate
- Auto mode: you can set heating and cooling targets separately, with a 3°F minimum gap
- Setpoints are kept within the T6 Pro limits: heat 40–90°F, cool 50–99°F
- Refreshes every 30 seconds and whenever you reopen the app
- Demo mode lets you try everything without a hub

## Why it doesn't connect to the ADT hub

ADT doesn't provide a public or local API that outside apps can use to control Z-Wave devices. The only ADT control path is ADT's own app and cloud.

So Hearth is built on the **SmartThings API**, which is the platform the **Aeotec Smart Home Hub** uses. Once the thermostat is moved to that hub, the app works with it.

### Moving the thermostat to the Aeotec hub (once you have it)
1. Set up the Aeotec hub in the SmartThings app.
2. In the ADT app, or by calling ADT, **remove (exclude) the thermostat** from the ADT system. A Z-Wave device can only belong to one hub at a time. If ADT runs any thermostat automations, let them know.
3. In the SmartThings app: Add device → Honeywell/Resideo T6 Pro Z-Wave, then put the thermostat into pairing mode. The installer menu on the thermostat has a Z-Wave option; check the T6 Pro manual for the exact steps.
4. Confirm you can change the temperature from the SmartThings app first.

## Connecting Hearth
1. Go to https://account.smartthings.com/tokens and create a token with **Devices: List, See, Control** turned on.
2. In Hearth, tap the gear → paste the token → **Find thermostats** → choose it → **Save and connect**.

**Important limit:** new SmartThings personal tokens **expire after 24 hours**. That's fine for testing, but for daily use the app needs SmartThings OAuth, which renews itself automatically. That's the planned next step once the hub is set up. Until then, an expired token shows "Token rejected" and you'd paste in a new one.

## Running it

Test on this PC:
```
node serve.js
```
Then open http://localhost:5173.

To use it on your phone, the app needs to be hosted on HTTPS so Android can install it. Options: GitHub Pages or Netlify (free, static files from the `app/` folder). Once it's hosted, open the address in Chrome on your phone → ⋮ → **Add to Home screen**.

## Files
- `app/index.html`: the whole app (layout, styling, logic)
- `app/manifest.json`, `app/sw.js`, `app/icon*`: home-screen install support
- `serve.js`: small local test server

## Name options
Currently called **Hearth**. To rename it, change `APP_NAME` in `app/index.html` and `name`/`short_name` in `app/manifest.json`.
- **Hearth**: warm, home-centered
- **Allette Home**: the family name on it
- **Steady**: about keeping the house comfortable
- **Haven**: the house as a place of rest
- **Comfort Keeper**: plain and descriptive
