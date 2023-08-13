const express = require('express');
const router = express.Router();
const formidable = require('formidable') 
const fs = require('fs')

const friendController = require('../controllers/FriendsController');

router.get('/',friendController.getListFriends);
router.get('/:id',friendController.getFriendById)
router.post('/add',function (req, res, next) {
    const form = new formidable.IncomingForm();
    const dirUpload = "client/images";
    form.uploadDir = dirUpload;
  
    //Tạo thư mục chứa file upload
    if (!fs.existsSync(dirUpload)) {
      fs.mkdirSync(dirUpload);
    }
  
    form.parse(req, (err, fields, files) => {
      // console.log(fields);
  
      var formData = {};
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        for (var key in fields) {
          formData[key] = fields[key];
        }
        
        var isSelectedFile = !(Object.entries(files).length === 0 && files.constructor === Object);
        var key = "file";
  
        console.log(files);
        // Nếu có chọn file thì xử lý upload file
        if (isSelectedFile) {
          var fileName = files.file[0].originalFilename;
          console.log('1',fileName);
          // var fileName = files[key].name.split('.')[0];
          // console.log(fileName);
          // var ext = files[key].name.split('.')[1];
          // // đường dẫn thực file upload lên
          var newPath = `${dirUpload}/${fileName}`;
          console.log('2',newPath);
          var oldPath = files.file[0].filepath;
          console.log('3',oldPath);
          // // đổi tên file
          fs.renameSync(oldPath, newPath);
  
          formData[key] = newPath.slice(7);
        } else {
          formData[key] = '';
        }
      }
      req.form_data = formData;

      next();
    });
  })

module.exports = router;