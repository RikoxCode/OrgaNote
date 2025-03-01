const GenreStore = require('../stores/GenreStore')

class GenreController {
    async getAll(req, res) {
        try {
            let genres = await GenreStore.getAll()
            res.json(genres)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params
            const genre = await GenreStore.getById(id)
            if (!genre)
                return res.status(404).json({ error: 'Genre not found' })
            res.json(genre)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async create(req, res) {
        try {
            const { title, description } = req.body
            const genre = await GenreStore.create(title, description)
            res.json(genre)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async update(req, res) {
        try {
            const { id, title, description } = req.body
            const genre = await GenreStore.update(id, title, description)
            res.json(genre)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const response = await GenreStore.delete(id)
            res.status(204).send({ message: response })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

module.exports = new GenreController()
