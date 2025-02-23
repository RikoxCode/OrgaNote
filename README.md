# OrgaNote - Musikverwaltung für Vereine

## 🎶 Über das Projekt
OrgaNote ist eine Webanwendung für Musikvereine zur Verwaltung von Musikstücken, Jahrgängen und Dateien. Die App bietet eine strukturierte Organisation nach **Verein > Jahrgang > Musikstück > Dateien** und ermöglicht eine einfache Verwaltung und Speicherung von Noten und weiteren Musikressourcen.

## 💪 Features
- Verwaltung mehrerer **Vereine**
- Anlegen und Bearbeiten von **Jahrgängen**
- Speichern und Verwalten von **Musikstücken** mit Detailinformationen
- Upload und Verwaltung von **Dateien** (Noten, MP3, MIDI etc.)
- REST API mit CRUD-Funktionalität

## 🛠 Technologie-Stack
### Backend:
- **Node.js** mit **Express.js**
- **MongoDB** oder **PostgreSQL** für die Datenspeicherung
- **Multer** für Datei-Uploads

### Frontend:
- **Vue.js 3** mit **Pinia** (State Management)
- **TailwindCSS** für das Styling
- **Axios** für API-Anfragen

## 📝 API Endpunkte (Beispiele)
### Vereine:
- `GET /api/clubs` - Alle Vereine abrufen
- `POST /api/clubs` - Neuen Verein anlegen

### Jahrgänge:
- `GET /api/clubs/:clubId/years` - Jahrgänge abrufen
- `POST /api/clubs/:clubId/years` - Neuen Jahrgang anlegen

### Musikstücke:
- `GET /api/clubs/:clubId/years/:year/songs` - Alle Musikstücke eines Jahrgangs abrufen
- `POST /api/clubs/:clubId/years/:year/songs` - Neues Musikstück anlegen
- `DELETE /api/clubs/:clubId/years/:year/songs/:songId` - Musikstück löschen

### Dateien:
- `POST /api/clubs/:clubId/years/:year/songs/:songId/files` - Datei hochladen
- `DELETE /api/clubs/:clubId/years/:year/songs/:songId/files/:fileId` - Datei löschen

## 🔧 Installation & Nutzung
### Voraussetzungen:
- Node.js & npm
- MongoDB oder PostgreSQL

### Backend starten:
```bash
cd backend
npm install
npm start
```

### Frontend starten:
```bash
cd frontend
npm install
npm run dev
```

## 🛡 Sicherheit & Authentifizierung
- JWT-Authentifizierung für geschützte API-Endpunkte
- Rollenmanagement (Admin, Benutzer)

## 📅 Zukünftige Features
- Benutzerverwaltung mit Login-System
- Playlist-Funktion für Proben
- Erweiterte Such- und Filterfunktionen

## 👤 Mitwirkende
- **[Dein Name]** - Projektleitung & Entwicklung
- **Community & Feedback willkommen!**

## 💡 Lizenz
Dieses Projekt steht unter der MIT-Lizenz.

