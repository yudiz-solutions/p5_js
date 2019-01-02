class Triangle{

	constructor(x1_, y1_, x2_, y2_, x3_, y3_, clr_, tx_, ty_, rot_){
		this.x1 = x1_;
		this.y1 = y1_;
		this.x2 = x2_;
		this.y2 = y2_;
		this.x3 = x3_;
		this.y3 = y3_;
		this.clr = clr_;
		this.tx = tx_;
		this.ty = ty_;
		this.rot = rot_;
    this.flag = 0; //flag 0 means normal and flag 1 means need to reposition
    
    this.ox1 = x1_;
		this.oy1 = y1_;
		this.ox2 = x2_;
		this.oy2 = y2_;
		this.ox3 = x3_;
		this.oy3 = y3_;
	}

	display(){
    if(this.flag == 0){
      push();
      translate(this.tx, this.ty);
      fill(this.clr);
      rotate(this.rot);
      triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
      pop();
    }
    else if(this.flag == 1){
      this.x1 = this.equaliser(this.x1, this.ox1);
      this.x2 = this.equaliser(this.x2, this.ox2);
      this.x3 = this.equaliser(this.x3, this.ox3);
      
	  this.y1 = this.equaliser(this.y1, this.oy1);
      this.y2 = this.equaliser(this.y2, this.oy2);
      this.y3 = this.equaliser(this.y3, this.oy3);
      
      push();
      translate(this.tx, this.ty);
      fill(this.clr);
      rotate(this.rot);
      triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
      pop();
      
      if(this.x1 == this.ox1 && this.x2 == this.ox2 && this.x3 == this.ox3 && this.y1 == this.oy1 && this.y2 == this.oy2 && this.y3 == this.oy3)
      	this.flag = 0;
    }
	}

	highlight(){
			strokeWeight(5);
			stroke(255);
			this.display(this.tx, this.ty);
			noStroke();
	}
  
  	isMouseHere(){
		let mycolor = get(mouseX, mouseY);
		if( red(this.clr) == red(mycolor) && green(this.clr) == green(mycolor) && blue(this.clr) == blue(mycolor)){
			return true;
		}
      else{
        return false;
      }
	}

  check(){
      let dx = pmouseX - mouseX;
      let dy = pmouseY - mouseY;
    
    	if(this.rot == 180){
        dx = -dx;
        dy = -dy;
      }
    
    	this.x1 -= dx;
      this.x2 -= dx;
      this.x3 -= dx;
    
      this.y1 -= dy;
      this.y2 -= dy;
      this.y3 -= dy;
    

      this.highlight();
  }
  
  equaliser(e1,e2){
    if( abs(e1 - e2) > 5){
      if(e1 < e2)
        e1 += 5;
      else if(e1 > e2)
        e1 -= 5;
    }
    else{
      if(e1 < e2)
        e1 += 1;
      else if(e1 > e2)
        e1 -= 1;
    }

      return e1;
  }

  reposition(){
    if(this.x1 == this.ox1 && this.x2 == this.ox2 && this.x3 == this.ox3)
      this.flag = 0;
    else
      this.flag = 1;
  }
}