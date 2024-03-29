const Image = require('../models/image');

exports.getAllImages = (req, res, next) => {
  Image.find()
    .then((images) => res.status(200).json(images))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.addImage = (req, res, next) => {
  console.log('you have reached the addImage controller');
  const { src, altText, userId, username, userAvatar } = req.body;
  console.log('src:', src, '& altText:', altText, '& userId:', userId);
  const image = new Image({
    src,
    altText,
    userId,
    username,
    userAvatar,
  });
  image
    .save()
    .then(() => res.status(201).json({ message: 'Image saved successfully!' }))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.getSingleImage = (req, res, next) => {
  Image.findOne({ _id: req.params.id })
    .then((image) => res.status(200).json(image))
    .catch((error) => res.status(404).json({ error: error }));
};

exports.deleteImage = (req, res, next) => {
  Image.findOne({ _id: req.params.id }).then((image) => {
    if (!image) {
      return res.status(404).json({ error: 'Image not found!' });
    }
    Image.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Deleted!' }))
      .catch((error) =>
        res.status(400).json({
          error: error,
        })
      );
  });
};

exports.addComment = (req, res, next) => {
  const id = req.params.id;
  const { commentToAdd } = req.body;
  Image.findOne({ _id: id }).then((image) => {
    if (!image) {
      return res.status(404).json({ error: 'Image not found!' });
    }
    image.comments.push(commentToAdd);
    image
      .save()
      .then(() => res.status(201).json({ message: 'Comment added!' }))
      .catch((error) =>
        res.status(400).json({
          error: error,
        })
      );
  });
};

exports.likeImage = (req, res, next) => {
  const id = req.params.id;
  const { likes } = req.body;
  Image.findOne({ _id: id }).then((image) => {
    if (!image) {
      return res.status(404).json({ error: 'Image not found!' });
    }
    image.likes = likes;
    image
      .save()
      .then(() => res.status(201).json({ message: 'Liked/unliked' }))
      .catch((error) =>
        res.status(400).json({
          error: error,
        })
      );
  });
};

// exports.modifyImage = (req, res, next) => {
//   let image = new Image({ _id: req.params._id });
//   if (req.file) {
//     const url = req.protocol + '://' + req.get('host');
//     req.body.image = JSON.parse(req.body.image);
//     image = {
//       _id: req.params.id,
//       src: req.body.image.src,
//       altText: req.body.image.altText,
//       userId: req.body.image.userId,
//     };
//   } else {
//     image = {
//       _id: req.params.id,
//       src: req.body.src,
//       altText: req.body.altText,
//       userId: req.body.userId,
//     };
//   }
//   Image.updateOne({ _id: req.params.id }, image)
//     .then(() => res.status(201).json({ message: 'Image updated successfully!' }))
//     .catch(error => res.status(400).json({ error: error }));
// }
