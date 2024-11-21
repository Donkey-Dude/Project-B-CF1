function fractalize() {
    loadPixels();
      for (let w = 0; w < resox; w += pixsize) {
        for (let h = 0; h < resoy; h += pixsize) {
          for (let x = 0; x < pixsize; x++){
            for(let y = 0; y < pixsize; y++){
              grab = get(w+x, h+y);
              rollingsum0 = rollingsum0 + grab[0];
              rollingsum1 = rollingsum1 + grab[1];
              rollingsum2 = rollingsum2 + grab[2];
            }
          }
    valueArray0.push(rollingsum0 / (pixsize * pixsize))
    valueArray1.push(rollingsum1 / (pixsize * pixsize))
    valueArray2.push(rollingsum2 / (pixsize * pixsize))
    rollingsum0 = 0;
    rollingsum1 = 0;
    rollingsum2 = 0;
        }
      }
    }