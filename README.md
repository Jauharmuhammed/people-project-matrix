# People Project Matrix

A web-based interface to streamline the creation and management of a People Project Matrix (PPM) for proposal managers in the AEC industry. see demo [here](https://people-project-matrix.vercel.app/)

## Getting Started

First, install the dependencies (use legacy peer deps due to some package compatibility issues):

```bash
npm install --legacy-peer-deps
# or
yarn install --legacy-peer-deps
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

### Functional Features
- Project Overview
  - View all projects in a tabular format
  - Sort and basic filter functionality
  - Responsive design for various screen sizes
  - Inline editing of details
  - Add custom fields off different types

- Member Management
  - Add/Edit team members
  - Role-based member management
  - Add more roles
  - 
### UI-Only Features (Non-Functional)
- Advanced Filtering System (UI only)
- New Project Creation Dialog (UI only)
- Project Details Modal (UI only)

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: 
  - shadcn/ui
  - Radix UI primitives
- **Deployment**: Vercel
