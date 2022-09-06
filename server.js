const express = require('express');
const multer = require('multer');
const Jimp = require('jimp');
const path = require('path');
const uuid = require('uuid').v4;
const app = express();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
		const { originalname } = file;
		// or
		// uuid, or fieldname
		cb(null, originalname);
	},
});
const upload = multer({ storage });
app.use(express.static('public'));

app.post('/upload', upload.array('fileName'), (req, res) => {
	// Jimp.read(, (err, picture) => {
	// 	if (err) throw err;
	// 	picture.write(); // save
	// });
	for (let i = 0; i < req.files.length; i++) {
		// console.log(req.files[i].originalname);
		if (req.files[i].originalname.includes('.jpg')) {
			Jimp.read(`./uploads/${req.files[i].originalname}`)
				.then((picture) => {
					return picture.write(
						`./uploads/pngs/${req.files[i].originalname.replace(
							'.jpg',
							'.png'
						)}`
					); // save
				})
				.catch((err) => {
					console.error(err);
				});
		} else {
			return res.send('Not a jpg');
		}
	}
	return res.json({ status: 'OK', uploaded: req.files.length });
});

app.listen(3000);
