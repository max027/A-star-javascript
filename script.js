/*
  * args:none
  * return:none
  * description:generates blocks for pathfinding algo
*/
const generateBlocks=()=>{
  return Math.floor((Math.random()*(20-2)+2))
}


/*args:none
*return:none
*description:handels clicks
*/
const handelClick=(cell)=>{
  cell.bgColor='black'
  console.log(generateBlocks())
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
    td.addEventListener('click',(function(cell){
      return function(){
        handelClick(cell)
      }
    })(td),false )

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
  let start=undefined
  let end=undefined
  let grid=drawGrid()
  // set start and end node
  grid.childNodes[0].cells[0].bgColor='orange'
  grid.childNodes[19].cells[19].bgColor='green'

//  console.log(grid.childNodes[0].cells[0])
  document.body.appendChild(grid)

}

main()
