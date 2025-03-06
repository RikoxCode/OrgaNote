const SongStore = require('../stores/SongStore')
const ProjectStore = require('../stores/ProjectStore')
const GenreStore = require('../stores/GenreStore')

class SongController {
    async getAll(req, res) {
        try {
            let songs = await SongStore.getAll()

            songs = await Promise.all(
                songs.map(async (song) => {
                    song.project = await ProjectStore.getAllProjectsFromSong(
                        song.id
                    )
                    song.genres = await GenreStore.getAllGenresFromSong(song.id)
                    return song
                })
            )

            res.json(songs)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async getAllProjectSongs(req, res) {
        try {
            const projectId = req.params.project_id

            let songs = await SongStore.getAllProjectSongs(projectId)

            songs = await Promise.all(
                songs.map(async (song) => {
                    song.genres = await GenreStore.getAllGenresFromSong(song.id)
                    return song
                })
            )

            res.json(songs)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params
            const song = await SongStore.getSongById(id)
            if (!song) return res.status(404).json({ error: 'Song not found' })

            song.project = await ProjectStore.getAllProjectsFromSong(song.id)
            song.genres = await GenreStore.getAllGenresFromSong(song.id)

            res.json(song)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async create(req, res) {
        try {
            const { title, description, composer, genres, project_id } =
                req.body
            let song = await SongStore.saveSong(
                title,
                description,
                composer,
                project_id
            )

            for (const genre_id of genres) {
                await SongStore.addGenreToSong(song.id, genre_id)
            }

            song = await SongStore.getSongById(song.id)
            song.project = await ProjectStore.getAllProjectsFromSong(song.id)
            song.genres = await GenreStore.getAllGenresFromSong(song.id)

            res.json(song)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const { title, description, composer, genre } = req.body
            const song = await SongStore.updateSong(
                id,
                title,
                description,
                composer,
                genre
            )

            song.project = await ProjectStore.getAllProjectsFromSong(song.id)
            song.genres = await GenreStore.getAllGenresFromSong(song.id)

            res.json(song)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            await SongStore.deleteSong(id)
            res.json({ message: 'Song deleted' })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

module.exports = new SongController()
