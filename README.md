# Modern Portfolio

A professional, high-performance portfolio website built with Next.js, TypeScript, and MongoDB. This project features a robust admin dashboard, blog management, project showcase, and a newsletter system.

## 🚀 Features

-   **Dynamic Portfolio**: Showcase your projects with detailed descriptions, tech stacks, and live links.
-   **Blog Engine**: Full-featured blog with category filtering and dynamic routing.
-   **Admin Dashboard**: Secure management interface for projects, blogs, contact messages, and newsletter subscribers.
-   **Interactive Contact Form**: Real-time message notifications via email.
-   **Newsletter System**: Subscription management with unsubscribe functionality.
-   **Responsive Design**: Modern, premium UI built with Tailwind CSS and shadcn/ui.
-   **Fully Containerized**: Ready for production deployment using Docker and Docker Compose.

## 🛠 Tech Stack

-   **Framework**: Next.js (App Router)
-   **Language**: TypeScript
-   **Database**: MongoDB (Mongoose)
-   **Styling**: Tailwind CSS, shadcn/ui
-   **Forms & Validation**: React Hook Form, Zod
-   **Email**: Nodemailer
-   **Containerization**: Docker, Docker Compose

## 🏁 Getting Started

### Local Development

1.  **Clone the repository**:
    ```bash
    git clone <your-repository-url>
    cd portfolio
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure environment variables**:
    Create a `.env.local` file in the root directory and add the following:
    ```env
    MONGODB_URI=mongodb://localhost:27017/portfolio
    ADMIN_JWT_SECRET=your-secret-key
    NEXT_PUBLIC_SITE_URL=http://localhost:3000

    # Email (Optional)
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=your-email@gmail.com
    SMTP_PASS=your-app-password
    NOTIFY_EMAIL=your-email@gmail.com
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🐳 Docker Setup (Recommended)

Run the entire stack (App + Database) effortlessly.

### Prerequisites
-   Docker and Docker Compose installed.

### Quick Start
1.  **Launch the containers**:
    ```bash
    docker-compose up -d --build
    ```
2.  **Access the application**:
    -   **Web App**: `http://localhost:3000`
    -   **MongoDB**: `mongodb://localhost:27017/portfolio`

### Management Commands
-   **View Logs**: `docker-compose logs -f app`
-   **Stop Services**: `docker-compose down`
-   **Rebuild**: `docker-compose up -d --build` (use after code changes)

## 📁 Project Structure

-   `app/`: Next.js pages and layouts (App Router).
-   `components/`: Reusable UI components.
-   `lib/`: Utility functions, database connection, and server actions.
-   `models/`: Mongoose schemas for MongoDB.
-   `public/`: Static assets and uploads.
-   `styles/`: Global styles and Tailwind configuration.

## ⚖️ License

This project is licensed under the MIT License - see the LICENSE file for details.
