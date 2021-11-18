
const router = require('express').Router();
const { User, Post, Comment, } = require('../../models');
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['[password]']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post("/", async (req, res) => {
    try {
      const userData = await User.create(req.body);
      req.session.save(() => {
        req.session.logged_in = true;
        req.session.user_id = userData.id;
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(500).json(err)
    }
    });

router.post('/logout', (req, res) => {
 try {
   if (req.session.logged_in) {
      // Remove the session variables
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
    try {
      if (req.session.logged_in) {
         // Remove the session variables
         req.session.destroy(() => {
           res.status(204).end();
         });
       } else {
         res.status(404).end();
       }
     } catch (err) {
       res.status(500).json(err);
     }
   });

   module.exports = router;