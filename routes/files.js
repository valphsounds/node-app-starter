// xfile - Express File Object MongoDB routes
const auth = require('../middleware/auth');
const { File } = require('../models/file');
const router = express.Router();
const bp = require('body-parser');

const multer = require('multer');
const storage = multer.diskStorage({ 
    destination: function(req, file, cb) { 
       cb(null, './views/uploadedFiles');
    },
    filename: function (req, file, cb) {
       cb(null , file.originalname);
    }
});
const upload = multer({ storage: storage });
const fs = require('fs');

router.use(bp.urlencoded({ extended: false }));
router.use(bp.json());

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.post('/', auth, upload.single('myFile'), async (req, res) => {
    fs.renameSync(`./views/uploadedFiles/${req.file.filename}`, `./views/uploadedFiles/${req.file.originalname}`);
    try {
        await File.create({
          fileName: req.body.fileName,
          fileUrl: `./uploadedFiles/${req.file.originalname}`,
        });
        res.status(200).send('OK!');
      } catch (error) {
        res.json({
          error,
        });
      }
});

router.delete('/:id', auth, async (req, res) => {
    const file = await File.findByIdAndRemove(req.params.id);
    //404
    if(!file) return res.status(404).send('No such file');

    fs.rmSync(file.fileUrl.replace('.', './views'));

    res.send(file);
});

module.exports = router;