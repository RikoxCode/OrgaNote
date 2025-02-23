![image](https://github.com/user-attachments/assets/ef1a0b90-a3fa-48f1-b7b4-1bec740caa40)


# OrgaNote - Music Management for Associations

## 🎶 About the Project
OrgaNote is a web application designed for music associations to manage music pieces, years, and files. The app offers a structured organization based on **Association > Year > Music Piece > Files**, enabling easy management and storage of sheet music and other music resources.

## 💪 Features
- Manage multiple **associations**
- Create and edit **years**
- Store and manage **music pieces** with detailed information
- Upload and manage **files** (sheet music, MP3, MIDI, etc.)
- REST API with CRUD functionality

## 🛠 Technology Stack
### Backend:
- **Node.js** with **Express.js**
- **MongoDB** or **PostgreSQL** for data storage
- **Multer** for file uploads

### Frontend:
- **Vue.js 3** with **Pinia** (State Management)
- **TailwindCSS** for styling
- **Axios** for API requests

## 📝 API Endpoints (Examples)
### Associations:
- `GET /api/clubs` - Retrieve all associations
- `POST /api/clubs` - Create a new association

### Years:
- `GET /api/clubs/:clubId/years` - Retrieve years
- `POST /api/clubs/:clubId/years` - Create a new year

### Music Pieces:
- `GET /api/clubs/:clubId/years/:year/songs` - Retrieve all music pieces of a year
- `POST /api/clubs/:clubId/years/:year/songs` - Create a new music piece
- `DELETE /api/clubs/:clubId/years/:year/songs/:songId` - Delete a music piece

### Files:
- `POST /api/clubs/:clubId/years/:year/songs/:songId/files` - Upload a file
- `DELETE /api/clubs/:clubId/years/:year/songs/:songId/files/:fileId` - Delete a file

## 🔧 Installation & Usage
### Requirements:
- Node.js & npm
- MongoDB or PostgreSQL

### Start Backend:
```bash
cd backend
npm install
npm start
```

### Start Frontend:
```bash
cd frontend
npm install
npm run dev
```

## 🛡 Security & Authentication
- JWT authentication for protected API endpoints
- Role management (Admin, User)

## 📅 Future Features
- User management with login system
- Playlist feature for rehearsals
- Advanced search and filter functions

## 👤 Contributors
- **[Your Name]** - Project lead & development
- **Community & feedback welcome!**

## 💡 License
This project is licensed under the MIT License.

