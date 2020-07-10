/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/

const express = require("express");

const server = express();
const dbAction = require("./data/helpers/actionModel");
const dbProjects = require("./data/helpers/projectModel");

server.use(express.json());

server.listen(8003, () => {});

// ACTIONS ENDPOINT

server.get("/api/actions", (req, res) => {
    dbAction
        .get(req.params.id)
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            res.status(404).json({ error: "action not found" });
        });
});

server.post("/api/actions", (req, res) => {
    const actionInfo = req.body;
    if (
        !actionInfo.project_id &&
        !actionInfo.notes &&
        actionInfo.description > 128
    ) {
        res.status(400).json({ message: "Could not create action" });
    } else {
        dbAction
            .insert(actionInfo)
            .then((action) => {
                res.status(202).json(action);
            })
            .catch((error) => {
                res.status(500).json({ error: "internal problem" });
            });
    }
});

server.delete("/api/actions/:id", (req, res) => {
    dbAction
        .remove(req.params.id)
        .then((post) => {
            if (!post) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist.",
                });
            } else {
                res.status(200).json(post);
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "The post could not be removed" });
        });
});

server.put("/api/actions/:id", (req, res) => {
    const changes = req.body;
    if (!changes.description || !changes.notes) {
        res.status(400).json({
            message: "The post with the specified ID does not exist.",
        });
    } else {
        dbAction
            .update(req.params.id, changes)
            .then((post) => {
                if (post) {
                    res.status(200).json(post);
                } else {
                    res.status(404).json({
                        message:
                            "The post with the specified ID does not exist.",
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    error: "The post information could not be modified.",
                });
            });
    }
});

// PROJECTS ENDPOINTS

server.get("/api/projects", (req, res) => {
    dbProjects
        .get(req.params.id)
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            res.status(404).json({ error: "project not found" });
        });
});

server.post("/api/projects", (req, res) => {
    const projectInfo = req.body;
    if (!projectInfo.name || !projectInfo.description) {
        res.status(400).json({ message: "Could not create action" });
    } else {
        dbProjects
            .insert(projectInfo)
            .then((project) => {
                res.status(202).json(project);
            })
            .catch((error) => {
                res.status(500).json({ error: "internal problem" });
            });
    }
});

server.delete("/api/projects/:id", (req, res) => {
    dbProjects
        .remove(req.params.id)
        .then((post) => {
            if (!post) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist.",
                });
            } else {
                res.status(200).json(post);
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "The post could not be removed" });
        });
});

server.put("/api/projects/:id", (req, res) => {
    const changes = req.body;
    if (!changes.name || !changes.description) {
        res.status(400).json({
            message: "The post with the specified ID does not exist.",
        });
    } else {
        dbProjects
            .update(req.params.id, changes)
            .then((post) => {
                if (post) {
                    res.status(200).json(post);
                } else {
                    res.status(404).json({
                        message:
                            "The post with the specified ID does not exist.",
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    error: "The post information could not be modified.",
                });
            });
    }
});
