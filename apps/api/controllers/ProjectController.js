const ProjectStore = require('../stores/ProjectStore')
const SongStore = require('../stores/SongStore')

class ProjectController {
    /**
     * This method is used to get all projects
     *
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     */
    async getAll(req, res) {
        let projects = await ProjectStore.getAll()

        projects = await Promise.all(
            projects.map(async (project) => {
                project.songs = await SongStore.getAllProjectSongs(project.id)
                return project
            })
        )

        await res.json(projects)
    }

    /**
     * This method is used to create a new project
     *
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * */
    async getClubProjects(req, res) {
        const clubId = req.params.clubId
        const projects = await ProjectStore.getClubProjects(clubId)
        await res.json(projects)
    }

    /**
     * This method is used to create a new project
     *
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * */
    async getById(req, res) {
        const id = req.params.id
        const project = await ProjectStore.getById(id)
        await res.json(project)
    }

    /**
     * This method is used to create a new project
     *
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * */
    async create(req, res) {
        const { title, description, clubId, profile_image, banner_image } =
            req.body
        const project = await ProjectStore.create(
            title,
            description,
            clubId,
            profile_image,
            banner_image
        )
        await res.json(project)
    }

    /**
     * This method is used to update a project
     *
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * */
    async update(req, res) {
        const { id, title, description, profile_image, banner_image } = req.body
        const project = await ProjectStore.update(
            id,
            title,
            description,
            profile_image,
            banner_image
        )
        await res.json(project)
    }

    /**
     * This method is used to delete a project
     *
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * */
    async delete(req, res) {
        const id = req.params.id
        await ProjectStore.delete(id)
        await res.json({ message: 'Project deleted' })
    }
}

module.exports = new ProjectController()
