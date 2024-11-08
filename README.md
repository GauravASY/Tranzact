# Tranzact : Money Transfer
This is a full-stack application that allows users to send and receive money. It is built using TypeScript, React, Prisma, PostgreSQL (with database transactions), and JWT for authentication.
### visit the app here : https://tranzact-lneo.vercel.app/
## Features
- User Authentication : Secure user registration and login using JSON Web Tokens (JWT).
- Send Money : Users can send money to others with transactional guarantees using PostgreSQL.
- Transaction History : Users can view their transaction history (both sent and received money).
- Error Handling : Comprehensive error handling for failed transactions, including rollback on errors.
- Responsive UI : Built using React for a smooth, user-friendly experience across devices.
## Tech Stack
### Frontend:
- React (with TypeScript)
- Context API for state management
- Tailwind for styling
### Backend:
- Node.js (TypeScript)
- Prisma ORM for database interactions
- PostgreSQL as database
- JWT for user authentication
- Express for RESTful API routing
- Database Transactions
This application uses PostgreSQL to handle money transfers with atomicity, consistency, isolation, and durability (ACID) properties. With Prisma's support for transactions, failed operations will rollback to ensure no partial transactions are committed.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request if you want to improve the project.
