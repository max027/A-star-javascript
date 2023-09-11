
/*
  * args:point1 and point2
  * return:distance between two points
  * description:calculates Manhattan Distance
  *
*/
const Distance=(point1,point2)=>{
[x1,y1]=point1
[x2,y2]=point2

return Math.abs(x1-x2)+Math.abs(y1-y2)

}

/*
  * args:x and x
  * return: none
  * description:create a constructor for each point
  *
*/

function Gridpoint(x,y){
this.x=x
this.y=y
this.f=0
this.g=0
this.h=0
this.block=false
this.neighbors=[]
this.parent=undefined

this.updateNei=function(gridArr,grid){
let i=this.x
let j=this.y
if (i < 20- 1) {
     
      this.neighbors.push(gridArr[i + 1][j]);
      
    }

    if (i > 0) {
      
      this.neighbors.push(gridArr[i - 1][j]);
    }

    if (j < 20- 1) {
      
      this.neighbors.push(gridArr[i][j + 1]);
    }
    if (j > 0) {
      
      this.neighbors.push(gridArr[i][j - 1]);
    }


}


}

/*
  * args: grid
  * return:
  * description: run A* algorithm
  *
*/
const Algorithm=(grid)=>{
let open_set=[]
let close_set=[]
let g_score=[]


}


/*
  * args:none
  * return:none
  * description:generates blocks for pathfinding algo
  *
*/
 
const generateBlocks=(grid)=>{
  let blocks=[]
  while(blocks.length<150){
    const num1=Math.floor(Math.random()*19-1)+1;
    const num2=Math.floor(Math.random()*19-1)+1;
    if((num1==0&&num2==0)||(num1==19&&num2==19)){
      continue
    }else{
      blocks.push([num1,num2])
    }

  }   
   

  for(let i=0;i<blocks.length;i++){
    grid.rows[blocks[i][0]].cells[blocks[i][1]].isBlock=true
    grid.rows[blocks[i][0]].cells[blocks[i][1]].bgColor='black'
  }
}
/* args:none
* return:grid(tabel)
* description:drawGrid
*/
const drawGrid=()=>{
  let i=0
let grid=document.createElement('table')
  grid.className='grid'
for(let x=0;x<20;x++){
let tr=grid.appendChild(document.createElement('tr'))
  for(let y=0;y<20;y++){
    let td=tr.appendChild(document.createElement('td'))
    td.innerHTML=++i
    td.isBlock=false

  }
}
return grid
}

/*
  * args:none
  * return:none
  * description:Entry point of program
*/
function main() {
  let start=[0,0]
  let end=[19,19]
  let gridArr=[]
  let grid=drawGrid()
  // set start and end node
  grid.childNodes[0].cells[0].bgColor='orange'
  grid.childNodes[19].cells[19].bgColor='green'
  generateBlocks(grid)

  for (let i = 0; i < 20; i++) {
    gridArr[i] = new Array(20);
  }

  for(let i=0;i<20;i++){
    for(let j=0;j<20;j++){
      gridArr[i][j]=new Gridpoint(i,j,grid)
    }
  }
  for(let i=0;i<20;i++){
    for(let j=0;j<20;j++){
      gridArr[i][j].updateNei(gridArr,grid)
    }
  }

  for(let i=0;i<20;i++){
    for(let j=0;j<20;j++){
      if(grid.rows[i].cells[j].isBlock){
        gridArr[i][j].block=true
      }
    }
  }

 //console.log(grid.rows[0].cells[1].isBlock)
//  console.log(gridArr[0][1].block)

console.log(gridArr)

// console.log(grid.childNodes[0].cells[0])
  document.body.appendChild(grid)

}

main()
