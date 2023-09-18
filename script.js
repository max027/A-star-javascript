
/*
  * args:point1 and point2
  * return:distance between two points
  * description:calculates Manhattan Distance
  *
*/
const Distance=(point1,point2)=>{
[x1,y1]=point1
x2=point2[0]
y2=point2[1]

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

this.updateNei=function(gridArr){
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
const Algorithm=(gridArr,grid)=>{
let open_set=[]
let close_set=[]
let g_score=[]
let path=[]
let start=gridArr[0][0]
let end=gridArr[19][19]

open_set.push(start)

while(open_set.length>0){
let lowidx=0

  for(let i=0;i<open_set.length;i++){
    if(open_set[i].f<open_set[lowidx].f){
      lowidx=i
    }
  }

let current=open_set[lowidx]

  if(current===end){
    let temp=current
    path.push(temp)
    while(temp.parent){
      path.push(temp.parent)
      temp=temp.parent
    }

    return path.reverse()
  }


  //remove current from open set
  open_set.splice(lowidx,1)

  close_set.push(current)

  
  let neighbour=current.neighbors

  for(let i=0;i<neighbour.length;i++){
   let neigh=neighbour[i] 

    if(!close_set.includes(neigh)){
      let possG=neigh.g+1

      if(!open_set.includes(neigh)&&!neigh.block){
        open_set.push(neigh)
      }else if(possG>=neigh.g){
        continue
      }
      neigh.g=possG
      neigh.h=Distance([neigh.x,neigh.y],[end.x,end.y])
      neigh.f=neigh.g+neigh.h

      neigh.parent=current
    
    }

  }

  }

  return []

}


/*
  * args:none
  * return:none
  * description:generates blocks for pathfinding algo
  *
*/
 
const generateBlocks=(grid)=>{
  let blocks=[]
  while(blocks.length<100){
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


let path=Algorithm(gridArr)
  if(path.length==0){
    document.getElementById("text1").style.visibility='visible'
  }else{
    for(let i=1;i<path.length-1;i++){
      x=path[i].x
      y=path[i].y
      grid.rows[x].cells[y].bgColor="pink"
    }
    
  }
  document.body.appendChild(grid)

}

main()
