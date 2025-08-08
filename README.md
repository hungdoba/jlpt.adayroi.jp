# 🎌 JLPT - Adayroi

A comprehensive platform for JLPT (Japanese Language Proficiency Test) preparation with interactive quizzes, vocabulary training, and test materials.

## ✨ Features

- 📚 **Complete JLPT Materials**: Access to N1-N3 level test papers and vocabulary
- 🧠 **Interactive Quizzes**: Practice with real JLPT questions
- 📖 **Mimikara Oboeru**: Vocabulary learning system
- 📊 **Progress Tracking**: Monitor your learning journey with heatmaps
- 🔖 **Bookmarks**: Save important questions for later review
- 📝 **Memo System**: Take notes during practice
- 🌙 **Dark Mode**: Comfortable studying in any lighting

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Radix UI
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: React Context + Local Storage
- **Package Manager**: pnpm

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL database

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/hungdoba/jlpt.adayroi.jp.git
   cd jlpt.adayroi.jp
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your database credentials and other required variables.

4. **Set up the database**

   ```bash
   pnpm db:generate
   pnpm db:push
   ```

5. **Run the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── features/           # Feature-based modules
│   ├── bookmarks/      # Bookmark functionality
│   ├── jlpt/          # JLPT test materials
│   ├── mimikara/      # Vocabulary system
│   └── quiz/          # Quiz functionality
├── shared/            # Shared utilities
│   ├── components/    # Common components
│   ├── config/        # App configuration
│   ├── constants/     # Constants and enums
│   ├── hooks/         # Custom React hooks
│   └── types/         # TypeScript definitions
├── db/                # Database schema
└── lib/               # Utility libraries
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## 📊 Database Schema

The project uses Drizzle ORM with PostgreSQL. Key tables include:

- **jlpt_questions**: JLPT test questions and answers
- **user_bookmarks**: Saved questions for review
- **user_progress**: Learning progress tracking
- **quiz_sessions**: Quiz attempt history

## 🔧 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests
- `pnpm db:generate` - Generate database migrations
- `pnpm db:push` - Push schema changes to database

## 🌐 API Routes

### JLPT Data

- `GET /api/jlpt/[level]` - Get questions by JLPT level
- `GET /api/jlpt/[level]/[year]/[month]` - Get specific test paper

### Quiz System

- `POST /api/quiz/submit` - Submit quiz answers
- `GET /api/quiz/progress` - Get user progress

### Bookmarks

- `POST /api/bookmarks` - Save bookmark
- `DELETE /api/bookmarks/[id]` - Remove bookmark

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use the established folder structure
- Write tests for new features
- Follow the existing code style
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- JLPT test materials and questions
- Mimikara Oboeru vocabulary system
- Open source community for amazing tools

## 📞 Support

- Website: [jlpt.adayroi.jp](https://jlpt.adayroi.jp)
- Issues: [GitHub Issues](https://github.com/adayroi/jlpt.adayroi.jp/issues)

---

Built with ❤️ for Japanese language learners
