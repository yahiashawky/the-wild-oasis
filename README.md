# The Wild Oasis

An internal hotel management application for cabin rentals, bookings, settings, and user management. It provides staff with an interactive dashboard, cabin inventory control, and guest booking tracking.

> [!NOTE]
> This repository currently contains a partially completed template. While core modules like Cabins and Settings are fully functional, several sections (such as user authentication, profile pages, and charts) are implemented as visual stubs or skeletons.

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Architecture & Design Patterns](#architecture--design-patterns)
5. [Project Structure](#project-structure)
6. [Installation](#installation)
7. [Environment Variables](#environment-variables)
8. [Running Locally](#running-locally)
9. [Build & Production](#build--production)
10. [Deployment](#deployment)
11. [API Integration](#api-integration)
12. [Database Schema](#database-schema)
13. [Authentication & Authorization](#authentication--authorization)
14. [Package Scripts](#package-scripts)
15. [Key Dependencies](#key-dependencies)
16. [Future Improvements & Bug Fixes](#future-improvements--bug-fixes)
17. [Needs Verification](#needs-verification)

---

## Overview
**The Wild Oasis** is a modern single-page application (SPA) built to streamline the operations of a luxury cabin resort. The app allows administrators and staff to keep track of bookings, manage cabin details (prices, capacity, discounts, and photos), edit global hotel configurations, and check guests in or out.

The database is powered by Supabase, and remote state management is handled via React Query, ensuring real-time UI updates and data cache efficiency.

---

## Features

### 1. Cabins Management
* **Inventory Overview**: Tabular view of cabins featuring images, names, occupancy, prices, and discounts.
* **Cabin Operations**:
  * **Create**: Add new cabins with properties and upload images directly to Supabase storage.
  * **Edit**: Modify properties of existing cabins and optionally upload new images.
  * **Duplicate**: Instantly copy an existing cabin configuration with a custom prefix (`Copy of [name]`).
  * **Delete**: Delete cabins with modal confirmations.
* **Sorting & Filtering**:
  * Filter cabins by discount status: *All*, *With Discount*, or *No Discount*.
  * Sort cabins by *Name*, *Max Capacity*, *Regular Price*, or *Discount* (ascending/descending).

### 2. Bookings Management
* **Detailed Logs**: View booking statuses (unconfirmed, checked-in, checked-out), totals, nightly stays, and guest details.
* **Pagination**: Interactive pagination (defaulting to 10 entries per page).
* **Pre-Fetching**: Background fetches the next page automatically using React Query to ensure zero-latency navigation.
* **Filter & Sort**: Filter bookings by status and sort chronologically or financially.

### 3. Settings Management
* **Global Configurations**: Control variables such as *minimum booking nights*, *maximum booking nights*, *maximum guests per cabin*, and *breakfast price*.
* **Live Update**: Fields save changes automatically on input `blur`, displaying visual toast alerts on success/failure.

### 4. Interactive Utilities
* **Sample Data Uploader**: A developer component (`Uploader.jsx`) that clears and re-seeds guest, cabin, and booking data into Supabase to maintain a predictable environment for testing.

---

## Tech Stack

| Category | Technology | Version | Description |
| :--- | :--- | :--- | :--- |
| **Core Framework** | [React](https://react.dev/) | `^18.2.0` | Frontend UI library |
| **Routing** | [React Router DOM](https://reactrouter.com/) | `^6.30.3` | Client-side routing and search param handling |
| **State Management** | [React Query (TanStack)](https://tanstack.com/query) | `^4.44.0` | Remote server-state caching, synchronization, and pre-fetching |
| **Database & Auth** | [Supabase Client](https://supabase.com/) | `^2.105.1` | Client integration for PostgreSQL database and storage bucket |
| **Styling** | [Styled Components](https://styled-components.com/) | `^6.4.1` | Component-level CSS-in-JS styling |
| **Form Management** | [React Hook Form](https://react-hook-form.com/) | `^7.75.0` | Performant form state and custom validation |
| **Alert System** | [React Hot Toast](https://react-hot-toast.com/) | `^2.6.0` | Notification popup system |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) | `^5.6.0` | Heroicons 2 rendering |
| **Date Utilities** | [date-fns](https://date-fns.org/) | `^4.1.0` | Formats dates and calculates durations |
| **Build & Tooling** | [Vite](https://vitejs.dev/) | `^4.4.5` | Next-generation frontend developer build tool |

---

## Architecture & Design Patterns

The codebase is engineered around highly reusable UI components and domain-driven design principles:

1. **Feature-Based Directory Structure**: Logic is organized by domain models (e.g., `bookings`, `cabins`, `settings`) in `src/features/`. Each folder encapsulates its respective forms, tables, rows, and custom React Query hooks.
2. **Compound Component Pattern**: Used to develop flexible and decoupled UI layouts:
   * **Modal** (`Modal.Open`, `Modal.Window`) using React Context and React Portals.
   * **Menus** (`Menus.Menu`, `Menus.Toggle`, `Menus.List`, `Menus.Button`) for contextual drop-down menus inside tables.
3. **Portal Pattern**: Modals and dropdown lists are rendered into `document.body` via `createPortal`, preventing clipping issues due to overflow restrictions of parent table containers.
4. **Custom Hooks Integration**: Data queries and mutations are isolated into domain hooks (e.g., `useCabins`, `useCreateCabin`, `useDeleteCabin`, `useUpdateSetting`), keeping presentation components completely free of direct database/API dependencies.

---

## Project Structure

```text
the-wild-oasis/
├── .eslintrc.cjs               # ESLint code style config
├── .eslintrc.json              # Extra validation configurations
├── .gitignore                  # Git excluded files and folder patterns
├── README.md                   # Project documentation
├── index.html                  # HTML entry point containing Vite scripts
├── package-lock.json           # Exact lockfile of project dependencies
├── package.json                # Project settings, dependencies, and execution scripts
├── vite.config.js              # Vite configuration (includes eslint execution wrapper)
├── public/                     # Static asset folder
│   ├── default-user.jpg        # Default fallback avatar image
│   ├── logo-dark.png           # Dark-themed logo image
│   ├── logo-light.png          # Light-themed logo image
│   └── vite.svg                # Vite logo icon
└── src/
    ├── App.jsx                 # Routes declarations, Global QueryClient, and Toast Provider
    ├── main.jsx                # Entry point script mounting App inside React StrictMode
    ├── data/                   # Initial local mock data and db seeding components
    │   ├── Uploader.jsx        # Development UI to wipe and re-seed Supabase database
    │   ├── data-bookings.js    # Array of preconfigured booking items
    │   ├── data-cabins.js      # Array of preconfigured cabin items
    │   ├── data-guests.js      # Array of preconfigured guest profiles
    │   └── cabins/             # Preset cabin images used during database seeding
    ├── features/               # Domain-centric feature modules
    │   ├── authentication/     # Signup, login, password and account forms (some stubs)
    │   ├── bookings/           # Booking log lists, table layouts, details and query hooks
    │   ├── cabins/             # Cabins listings, add/edit form modals and query hooks
    │   ├── check-in-out/       # Check-in and check-out components (stubs/skeletons)
    │   ├── dashboard/          # Analytics dashboards, layouts and charts (skeletons)
    │   └── settings/           # Forms and hooks to manage global hotel variables
    ├── hooks/                  # Global reusable React hooks
    │   ├── useLocalStorageState.js # Synchronizes React state inside LocalStorage
    │   ├── useMoveBack.js          # Navigate back in history
    │   └── useOutsideClick.js      # Detects pointer clicks outside a DOM node (used for modals/menus)
    ├── pages/                  # Top-level components mapped to react-router-dom routes
    │   ├── Account.jsx         # User account options wrapper (currently renders paragraph stubs)
    │   ├── Bookings.jsx        # Bookings page component
    │   ├── Cabins.jsx          # Cabins inventory page component
    │   ├── Dashboard.jsx       # Analytics dashboard page component (renders text stub "TEST")
    │   ├── Login.jsx           # Account login page wrapper (renders text stub "Login")
    │   ├── PageNotFound.jsx    # Fallback 404 page routing layout
    │   ├── Settings.jsx        # Hotel settings page component
    │   └── Users.jsx           # Staff creation page component (renders static heading stub)
    ├── services/               # REST API operations connecting with Supabase database
    │   ├── apiBookings.js      # Supabase operations for bookings querying/updating
    │   ├── apiCabins.js        # Supabase operations for cabin CRUD & storage file upload
    │   ├── apiSettings.js      # Supabase settings row retrieval & update mutations
    │   └── supabase.js         # Instantiation config of the Supabase client
    ├── styles/                 # Global UI style sheets
    │   └── GlobalStyles.js     # Styled Components global style rules, fonts, and dark/light variables
    ├── ui/                     # Reusable stateless UI layout wrappers
    │   ├── AppLayout.jsx       # Global application dashboard navigation shell
    │   ├── Button.jsx          # Button styled element supporting size and variations props
    │   ├── Modal.jsx           # Compound modal component using portals
    │   ├── Menus.jsx           # Compound context menus with portals
    │   ├── Table.jsx           # Reusable declarative tables
    │   └── ...                 # FormRow, Input, Spinner, Select, Tag, Pagination, etc.
    └── utils/                  # Core utility files
        ├── constants.js        # Hardcoded static constants (e.g. PAGE_SIZE = 10)
        └── helpers.js          # Currency formatting, date calculations, and duration parsing
```

---

## Installation

Follow these steps to run the application locally:

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd the-wild-oasis
   ```

2. **Install Project Dependencies**:
   ```bash
   npm install
   ```

---

## Environment Variables

Currently, there are **no environment variables** configured in this application. The connection configuration for Supabase is hardcoded within [supabase.js](file:///d:/yy/the-wild-oasis/src/services/supabase.js):

* `supabaseUrl`: `'https://vwxyndkashtnzktsyagl.supabase.co'`
* `supabaseKey`: `'sb_publishable_iAPbBrvUXd-l7sUes400Ng_htlb-c90'`

> [!WARNING]
> Storing database keys inside tracked files is not secure. It is highly recommended to move these settings into a `.env.local` file:
> ```env
> VITE_SUPABASE_URL=https://vwxyndkashtnzktsyagl.supabase.co
> VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
> ```
> Then access them in code via `import.meta.env.VITE_SUPABASE_URL`.

---

## Running Locally

To launch the project in development mode:

```bash
npm run dev
```

The app will compile and host a hot-reloaded dev server at [http://localhost:5173](http://localhost:5173).

---

## Build & Production

To compile the source code into static assets:

```bash
npm run build
```

The production bundle will be generated under the local `/dist` directory.

---

## Deployment

There are no preset deployment configurations (such as Docker, GitHub Actions, or server configurations) in the codebase. Since it is a static React application, the output of the `/dist` directory can be deployed directly to static hosts (e.g. Netlify, Vercel, Firebase Hosting, Cloudflare Pages). 

*Ensure client-side routing fallback is set up on the host to route all `/` requests to `/index.html`.*

---

## API Integration

* **Supabase REST and RPC client**: Queries, updates, inserts, and deletes records within tables hosted on the remote Supabase database.
* **Supabase Storage bucket**: Cabin photos are uploaded to the public bucket named `cabin-images`.
* **FlagCDN**: Nationality flags are loaded dynamically using the guest country codes (e.g., `https://flagcdn.com/pt.svg` for Portugal).

---

## Database Schema

The application operates on four main tables inside a Supabase Postgres database.

### 1. `cabins` Table
* `id`: Primary key (Integer)
* `name`: Identifier (Text)
* `maxCapacity`: Max occupancy limit (Integer)
* `regularPrice`: Booking rate per night (Integer)
* `discount`: Value deducted from price (Integer)
* `image`: Storage URL of the cabin illustration (Text)
* `description`: Overview text for the website listing (Text)

### 2. `guests` Table
* `id`: Primary key (Integer)
* `fullName`: Full name of guest (Text)
* `email`: Active email address (Text)
* `nationality`: Nation name (Text)
* `nationalId`: National identification number (Text)
* `countryFlag`: URL pointing to the country flag svg image (Text)

### 3. `bookings` Table
* `id`: Primary key (Integer)
* `created_at`: Row creation timestamp (Timestamptz)
* `startDate`: Start date of booking (Date)
* `endDate`: Checkout date of booking (Date)
* `numNights`: Duration of stay (Integer)
* `numGuests`: Total guests staying (Integer)
* `cabinPrice`: Base cost of cabin (Integer)
* `extrasPrice`: Cost of additional services like breakfast (Integer)
* `totalPrice`: Net bill total (`cabinPrice` + `extrasPrice`) (Integer)
* `status`: Current status (*unconfirmed*, *checked-in*, or *checked-out*) (Text)
* `hasBreakfast`: Breakfast requested (Boolean)
* `isPaid`: Settlement status (Boolean)
* `cabinId`: Foreign key reference to `cabins.id` (Integer)
* `guestId`: Foreign key reference to `guests.id` (Integer)

### 4. `settings` Table
* `id`: Primary key (Integer)
* `minBookingLength`: Lower limit of duration (Integer)
* `maxBookingLength`: Upper limit of duration (Integer)
* `maxGuestsPerBooking`: Cabin occupancy limit cap (Integer)
* `breakfastPrice`: Rate per night per guest (Integer)

---

## Authentication & Authorization

Authentication forms exist in the `src/features/authentication/` directory, but the integration is incomplete:

* **Page Stubs**: The Login page ([Login.jsx](file:///d:/yy/the-wild-oasis/src/pages/Login.jsx)) and Account profile page ([Account.jsx](file:///d:/yy/the-wild-oasis/src/pages/Account.jsx)) render static placeholder text rather than active interactive forms.
* **Missing Hooks**: Forms like `UpdatePasswordForm.jsx` and `UpdateUserDataForm.jsx` import the hooks `useUser` and `useUpdateUser` which are not present in the workspace. Thus, attempts to render these forms directly will raise compilation errors.
* **No Client Session Handlers**: The app currently does not verify user roles, route guards, or active session tokens.

---

## Package Scripts

Scripts declared in `package.json` are:

| Script Command | Purpose |
| :--- | :--- |
| `npm run dev` | Boots up the local hot-reloading Vite dev server |
| `npm run build` | Transpiles and optimizes codebase into a distribution folder (`dist/`) |
| `npm run lint` | Runs ESLint analysis check for style patterns and syntax warnings |
| `npm run preview` | Spins up a static local server hosting compiled build files from `/dist` |

---

## Key Dependencies

* **`@supabase/supabase-js`**: Serves as the primary data interface, managing all network communication and token management with Supabase.
* **`@tanstack/react-query`**: Stores server data client-side. Minimizes redundant data fetches by cache invalidation, query pre-fetching, and background sync.
* **`styled-components`**: Restricts CSS definitions to their respective components to eliminate global naming collision side-effects.
* **`react-hook-form`**: Simplifies form validation by binding states to input refs, avoiding heavy re-renders during text entry.
* **`date-fns`**: Handles relative timestamps (e.g. `2 days ago` via `formatDistanceFromNow`) and booking length subtractions.

---

## Future Improvements & Bug Fixes

The following issues and improvements were identified during static codebase analysis:

### 1. BookingTable Loading State Bug
In [BookingTable.jsx](file:///d:/yy/the-wild-oasis/src/features/bookings/BookingTable.jsx):
```javascript
if (!bookings) return <Empty resourceName="bookings" />;
if (isLoading) return <Spinner />;
```
Since `bookings` starts out undefined/null before the server query completes, the check `if (!bookings)` evaluates first, causing a flash of the "Empty" message before showing the data (or rendering it instead of a spinner). 
**Fix**: Invert the order of these checks:
```javascript
if (isLoading) return <Spinner />;
if (!bookings || bookings.length === 0) return <Empty resourceName="bookings" />;
```

### 2. Cancel Button Style Bypass in SignupForm
In [SignupForm.jsx](file:///d:/yy/the-wild-oasis/src/features/authentication/SignupForm.jsx):
```jsx
<Button variation="secondary" type="reset">
```
The styled button element in `Button.jsx` expects the prop `variations`, not `variation`. The cancel button will fallback to the primary theme because of this spelling error.
**Fix**: Rename the prop to:
```jsx
<Button variations="secondary" type="reset">
```

### 3. Missing Auth Hooks & View Wiring
* **Hooks Creation**: Create `useUser.js` and `useUpdateUser.js` in `src/features/authentication/` to wire up the Supabase auth client (`supabase.auth.getUser()` and `supabase.auth.updateUser()`).
* **View Integration**: Replace the text placeholders inside [Login.jsx](file:///d:/yy/the-wild-oasis/src/pages/Login.jsx) and [Account.jsx](file:///d:/yy/the-wild-oasis/src/pages/Account.jsx) with the interactive forms `LoginForm` and `UpdateUserDataForm` / `UpdatePasswordForm`.
* **Private Routing**: Implement a route guard wrapper component using React Router to block unauthenticated staff from accessing administrative dashboards.

### 4. Complete Dashboard Skeletons
* Import `SalesChart.jsx`, `DurationChart.jsx`, `TodayActivity.jsx`, and `Stat.jsx` into [Dashboard.jsx](file:///d:/yy/the-wild-oasis/src/pages/Dashboard.jsx) inside a complete layout grid to replace the text "TEST".

---

## Needs Verification

* **Authentication Policies (RLS)**: It is unknown whether the tables in the Supabase database require authenticated tokens, or if RLS policies are disabled/bypassable.
* **Storage Bucket Permissions**: The uploader writes files to the `cabin-images` public storage bucket. Check if anonymous write permission is permitted, or if bucket policies restrict it.
* **Code Typo "Dublicate"**: The function name `handleDublicate` in `CabinRow.jsx` contains a typo and should be renamed to `handleDuplicate` for clean maintenance.
