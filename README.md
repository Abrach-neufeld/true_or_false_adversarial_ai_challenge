# True or False: An Adversarial AI Challenge

A game where you interrogate AI assistants to determine the truth value of statements.

## How It Works

1. You're presented with a statement that is either **true** or **false**
2. Two AI assistants debate the statement - one argues it's true, the other argues it's false
3. Ask questions to both assistants to catch inconsistencies or logical errors
4. Decide which assistant is lying and submit your answer

The challenge: Can you tell which AI is being deceptive?

## Tech Stack

- **Next.js 15** - React framework
- **OpenAI Responses API** - AI conversations (GPT-4.1)
- **Prisma + Neon PostgreSQL** - Database for questions and user tracking
- **NextAuth.js** - Google OAuth authentication
- **Tailwind CSS** - Styling

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key
- Neon PostgreSQL database
- Google OAuth credentials (optional, for auth)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abrach-neufeld/true_or_false_adversarial_ai_challenge.git
   cd true_or_false_adversarial_ai_challenge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env`:
   ```
   OPENAI_API_KEY=<your-openai-api-key>
   DATABASE_URL=<your-neon-pooled-connection-string>
   DIRECT_URL=<your-neon-direct-connection-string>

   # Optional: Google OAuth
   GOOGLE_CLIENT_ID=<from-google-console>
   GOOGLE_CLIENT_SECRET=<from-google-console>
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=<run: openssl rand -base64 32>
   ```

4. Set up the database:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Database Commands

```bash
npm run db:push    # Push schema changes to database
npm run db:seed    # Seed database with trivia statements
npm run db:studio  # Open Prisma Studio GUI
```

## Live Demo

[https://true-or-false-adversarial-ai-challe.vercel.app](https://true-or-false-adversarial-ai-challe.vercel.app)

## License

MIT License - see [LICENSE](LICENSE) for details.
