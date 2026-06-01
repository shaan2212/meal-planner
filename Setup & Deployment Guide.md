🥗 Multi-Device Meal Planner: Setup & Deployment Guide

This guide provides a comprehensive walkthrough for deploying the real-time collaborative Meal Planner application and syncing it with your centralized database instance.
📋 System Prerequisites & Architecture

The application relies on a modern serverless stack to achieve instantaneous data synchronization across hardware devices without requiring user authentication loops.

    Frontend Framework: React 18+ bundled via Vite.

    Utility Layer: Tailwind CSS.

    Database Matrix: PostgreSQL hosted on Supabase.

    Subscription Protocol: Postgres Changes over WebSockets (Supabase Realtime).

    Hosting Node: Vercel Global Edge Network.

🛠️ Step 1: Initialize the Remote Database Schema

You must configure the PostgreSQL storage drawer and enable real-time change data capture (CDC) subscription streams.

    Log into your Supabase Dashboard.

    Select your target project organization workspace.

    Navigate to the left-hand menu sidebar and select the SQL Editor icon (>_).

    Click New Query to launch an empty data terminal tab.

    Paste the following database management block exactly into the workspace window:

SQL

-- 1. Create the synchronized rooms data table
create table if not exists meal_rooms (
  room_id text primary key,
  meals jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Supabase Realtime tracking for instant multi-device syncing
alter publication supabase_realtime add table meal_rooms;

    Click the Run button on the top right.

    Confirm the database console prints the execution receipt: Success. No rows returned.

💻 Step 2: Configure the Database Client

Your local repository codebase must be configured to target your designated cloud cluster infrastructure.

    Open a terminal terminal window inside your local repository workspace root directory.

    Install the core integration driver dependencies using the package manager wrapper:
    Bash

    npm install @supabase/supabase-js

    Navigate into your source code directory: src/

    Open or create a file named exactly supabaseClient.js.

    Input the following pre-configured initialization block:

JavaScript

import { createClient } from '@supabase/supabase-js';

// Fully authenticated initialization configurations targeting your specific database node
const supabaseUrl = 'https://mogszrmpyrfytlowrtom.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ3N6cm1weXJmeXRsb3dydG9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNTc5NDksImV4cCI6MjA5NTgzMzk0OX0.NYy_GO_uq-yWJWyhSNB4E3RA3bK3fDN0QHlcbdad8Ds';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

    Save all structural configurations, add the new dependencies to version control tracking, and push the snapshot directly up to your central GitHub repository:
    Bash

    git add .
    git commit -m "chore: integrate real-time cloud database configuration client"
    git push origin main

🚀 Step 3: Global Production Deployment via Vercel

Vercel reads your structural manifests, executes the PostCSS transformation pipelines, and serves the optimized components worldwide.

    Log into your Vercel Dashboard using your linked GitHub profile credentials.

    From the primary profile panel, select Add New... → Project.

    Locating your meal-planner repository workspace underneath the "Import Git Repository" registry listing and click Import.

    Verify the standard environmental build profile properties are assigned as follows:

        Framework Preset: Vite (Vercel identifies this automatically)

        Root Directory: ./

        Build & Output Settings: Leave default settings unaltered.

    Click the Deploy command button on the lower dashboard boundary. Vercel will process your configurations, compile your Tailwind CSS utility grids, and generate your live deployment link in about a minute.

🧪 Step 4: End-to-End Real-Time Validation

Follow these steps to confirm multi-device synchronization is fully functional:

    Launch the production URL generated on your Vercel project control console layout panel.

    Observe that the core engine appends a distinct, randomized room token signature tracking variable automatically to your browser query bar address matrix (for example: ?room=x7y2z).

    Click the 📋 Copy Sync Link action block on the dashboard panel header module.

    Open an independent web viewport profile (such as an Incognito browsing instance, an alternative web browser app, or forward the link directly to a mobile device).

    Input a meal configuration string into an empty slot grid element wrapper on one screen.

    Success Condition: The textual updates will instantly broadcast across web socket wrappers and mirror directly onto the secondary monitor dashboard grid position in real time without needing an interface page reload.
