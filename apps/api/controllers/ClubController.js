const clubStore = require('../stores/ClubStore')

class ClubController {
    async getAll(req, res) {
        try {
            const clubs = await clubStore.getAll()
            res.json(clubs)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async getUserClubs(req, res) {
        try {
            const clubs = await clubStore.getClubsByUser(req.user.id)
            res.json(clubs)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params
            const club = await clubStore.getById(id)
            if (!club) return res.status(404).send('Club not found')
            res.json(club)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async create(req, res) {
        try {
            const { name, location } = req.body
            const newClub = await clubStore.create(name, location)
            res.status(201).json(newClub)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async addMember(req, res) {
        try {
            const { club_id, user_id } = req.body
            const newMember = await clubStore.addMember(club_id, user_id)
            res.status(201).json(newMember)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async removeMember(req, res) {
        try {
            const { club_id, user_id } = req.body
            await clubStore.removeMember(club_id, user_id)
            res.status(204).send()
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const { name, location } = req.body
            const updatedClub = await clubStore.update(id, name, location)
            res.json(updatedClub)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            await clubStore.delete(id)
            res.status(204).send()
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}

module.exports = new ClubController()
