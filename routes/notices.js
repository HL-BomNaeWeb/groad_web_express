const express = require('express');
const { User } = require('../models');
const Notice = require('../models/notice');

const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
      try {
          const notices = await Notice.findAll();
          res.json(notices);
      }catch(err){
          console.error(err);
          next(err);
      }
  })
  .post(async (req, res, next) => {
      try {
          const notice = await Notice.create({
            title: req.body.title,
            hits: req.body.hits,
            writer: req.body.writer,
            content: req.body.content,
          });
          console.log(notice);
          res.send(notice);
      } catch (err) {
          console.error(err);
          next(err);
      }
  });

router.get('/:id', async (req, res, next) =>{
    try {
        const notice = await Notice.findAll({ 
            where:{ id: req.params.id },
        });
        res.json(notice);
    }catch(err){
        console.error(err);
        next(err);
    }
})
module.exports = router;
