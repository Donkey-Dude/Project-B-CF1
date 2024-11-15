function fractalize() {
    loadPixels();
    done = 2;
      for (let w = 0; w < resox; w += pixsize) {
        for (let h = 0; h < resoy; h += pixsize) {
          for (let x = 0; x < pixsize; x++){
            for(let y = 0; y < pixsize; y++){
              grab = get(w+x, h+y);
              rollingsum = rollingsum + grab[1];
            }
          }
    valueArray.push(rollingsum / (pixsize * pixsize))
    rollingsum = 0;
        }
      }
    }