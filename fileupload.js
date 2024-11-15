input = createFileInput(handleFile);
input.position(30, 180);

function handleFile(file) {
    //allows images to be uploaded from the computer and saves them to the image variable
      if(file.type === 'image') {
        img = createImg(file.data, '');
        img.hide();
      }else {
        img = null;
      }
    }