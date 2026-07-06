# MyFamily — Intelligent Parental Control & Website Whitelisting System

**MyFamily** is a parental control and website whitelisting system built for the Telkom ecosystem (MyTelkom). It gives parents an easy, non-technical way to manage their children's internet access — approving educational sites, blocking harmful or distracting ones, setting study schedules, and monitoring usage — with AI assisting in classifying new websites so parents don't have to review every site manually.

## Problem

Parents struggle to monitor and manage their children's online activity while keeping a healthy balance between safety and learning:

- Children spend excessive time on entertainment/social apps during study hours
- Parents can't easily tell which websites are educational vs. harmful
- Existing parental control tools are complex to configure
- Children can unknowingly hit phishing, scam, or inappropriate sites
- Parents have little visibility into browsing activity and usage patterns

## How It Works

1. **Whitelisted site** (e.g. `khanacademy.org`) → checked against the approved list → access granted.
2. **Blacklisted site** (e.g. `tiktok.com`) → not on the whitelist, found on the blacklist → access denied, parent notified.
3. **New/unknown site** → AI analyzes content, domain reputation, and keywords → assigns a category (Educational, Social Media, Entertainment, Gaming, News, Suspicious, Adult Content) → sends a recommendation to the parent to approve or block.

## Features

**Parent**
- Registration & secure login
- Child profile & device registration
- Website whitelisting / blacklisting
- Internet schedule ("Study Mode") management
- Activity monitoring dashboard & usage reports
- Real-time notifications and website approval requests
- Data usage monitoring

**AI-assisted**
- Automatic educational-website detection
- Harmful-website classification
- Website recommendation engine

**Child**
- Access to approved websites
- Ability to request access to a blocked site
- Educational Game Zone

## Current Implementation

This repo is the frontend prototype of MyFamily, built with mock data to validate the UX before wiring up a real backend/AI service:

| Component | Purpose |
|---|---|
| `MyFamilyDashboard` | Family member management & overview |
| `WhitelistManager` ("Blue Mode") | Approve/block websites, AI category suggestions |
| `StudyModeControl` | Focus/study session scheduling and timers |
| `UsageAnalytics` | Screen time, study time, and blocked-attempt reporting |
| `GameZone` | Educational games for children |

Planned/roadmap items (not yet implemented): real AI classification service, multi-factor auth, role-based access control (Parent / Child / Administrator), encryption of stored credentials and logs, mobile app, ISP/router-level integration, and cyberbullying/scam detection.

## Tech Stack

- React + TypeScript + Vite
- shadcn/ui + Tailwind CSS
- lucide-react icons

## Live Demo

[myTelkomFamilyHub on Netlify](https://68d8ebdefcc42f715adc4356--telkom-family-hub.netlify.app/)

## Running Locally

```bash
git clone https://github.com/Mwelase-bit/telkom-family-hub.git
cd telkom-family-hub
npm install
npm run dev
```

Open `http://localhost:8080` in your browser.

## Building for Production

```bash
npm run build
```

Production-ready files are generated in the `dist/` folder.

## License

MIT
