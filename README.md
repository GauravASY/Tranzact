# Tranzact : Money Transfer
This is a full-stack application that allows users to send and receive money. It is built using TypeScript, React, Prisma, PostgreSQL (with database transactions), and JWT for authentication.
### visit the app here : https://tranzact-lneo.vercel.app/
## Features
- User Authentication : Secure user registration and login using JSON Web Tokens (JWT).
- Send Money : Users can send money to others with transactional guarantees using PostgreSQL.
- Transaction History : Users can view their transaction history (both sent and received money).
- Error Handling : Comprehensive error handling for failed transactions, including rollback on errors.
- Responsive UI : Built using React for a smooth, user-friendly experience across devices.
## Presentation
![Screenshot (72)](https://github.com/user-attachments/assets/6e3fa266-09ef-4494-aee0-18c34d712c9f)
![Screenshot (67)](https://github.com/user-attachments/assets/85a0c539-916b-4655-8658-6f217984037f)
![Screenshot (71)](https://github.com/user-attachments/assets/f631bbd7-ac4c-4eb3-bde3-09f1378ce1d2)
![Screenshot (70)](https://github.com/user-attachments/assets/ae3adbd6-1afd-4e5f-8f07-ea0dfd5f7329)
![Screenshot (69)](https://github.com/user-attachments/assets/bfeabc81-d458-4b30-ac54-fa89b15ffe52)
![Screenshot (68)](https://github.com/user-attachments/assets/9d24f6d7-64f7-40b4-9ef0-a93a4d24786a)

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
