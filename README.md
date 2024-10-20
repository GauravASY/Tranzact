# Tranzact : Money Transfer
This is a full-stack application that allows users to send and receive money. It is built using TypeScript, React, Prisma, PostgreSQL (with database transactions), and JWT for authentication.

## Features
1. *User Authentication* : Secure user registration and login using JSON Web Tokens (JWT).
2. *Send Money* : Users can send money to others with transactional guarantees using PostgreSQL.
3. *Transaction History* : Users can view their transaction history (both sent and received money).
4. *Error Handling* : Comprehensive error handling for failed transactions, including rollback on errors.
5. *Responsive UI* : Built using React for a smooth, user-friendly experience across devices.

## Tech Stack
### Frontend:
1. React (with TypeScript)
2. Context API for state management
3. Tailwind for styling

### Backend:
1. Node.js (TypeScript)
2. Prisma ORM for database interactions
3. PostgreSQL as the relational database
4. JWT for user authentication
5. Express for RESTful API routing

## Database Transactions
This application uses PostgreSQL to handle money transfers with atomicity, consistency, isolation, and durability (ACID) properties. With Prisma's support for transactions, failed operations will rollback to ensure no partial transactions are committed.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request if you want to improve the project.
