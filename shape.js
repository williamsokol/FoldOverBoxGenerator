var thickness = 4.8
const tabLength = 5

// Settings in MM
const handleHeight = 15
var width = 100
var length = 100+thickness*2
var height = 100






// const thicknessInput = document.getElementById('thickness');
// thicknessInput.addEventListener('change', (event) => {
//     event.preventDefault();
//     console.log(`Thickness changed to: ${event.target.value}`);
//     thickness = parseFloat(event.target.value) 
//     start()
    
// });
// const lengthInput = document.getElementById('length');
// lengthInput.addEventListener('change', (event) => {
//   console.log(`Thickness changed to: ${event.target.value}`);
//   length = parseFloat(event.target.value) 
//   start()
// });
// const widthInput = document.getElementById('width');
// widthInput.addEventListener('change', (event) => {
//   console.log(`Thickness changed to: ${event.target.value}`);
//   width = parseFloat(event.target.value) 
//   start()
// });
// const heightInput = document.getElementById('height');
// heightInput.addEventListener('change', (event) => {
//   console.log(`Thickness changed to: ${event.target.value}`);
//   height = parseFloat(event.target.value) 
//   start()
// });
const form = document.querySelector('form');


form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting normally
    
    thickness = parseFloat(document.getElementById('thickness').value)
    length = parseFloat(document.getElementById('length').value)
    width = parseFloat(document.getElementById('width').value)
    height = parseFloat(document.getElementById('height').value)

    length = clamp(length,30,1000)
    width = clamp(width,30,1000)
    height = clamp(height,50,1000)

    document.getElementById('thickness').value = thickness
    document.getElementById('length').value = length
    document.getElementById('width').value = width
    document.getElementById('height').value = height

    // console.log(event.submitter.value)
    if(event.submitter.value == "Export"){
        start()
        window.process()
    }
    start()
});




// form.dispatchEvent("submit")
start()
function start(){

project.clear()
// Logic
const offset = new Point(height*2+thickness*2,height)
const LRSizes = new Size(height,width)
const TBSizes = new Size(length-thickness*2,height)
const TB_LRSizes = new Size(width/2,height-thickness)
const handleTemp = new Path.Rectangle(new Rectangle(new Point(0,0), new Size(handleHeight,width/4)),handleHeight/2)
const handleTemp2 = new Path.Rectangle(new Rectangle(new Point(0,0), new Size(handleHeight+5,width/4+5)),handleHeight/2)
// handleTemp.strokeColor = "#000000"

var base = new Path.Rectangle(offset,new Size(length,width))
var baseTabHole1 = new Path.Rectangle(offset+new Point(0,width*1/6),new Size(thickness*2,width/6))
var baseTabHole2 = new Path.Rectangle(offset+new Point(0,width*4/6),new Size(thickness*2,width/6))
var baseTabHole3 = new Path.Rectangle(offset+new Point(length-thickness*2,width*4/6),new Size(thickness*2,width/6))
var baseTabHole4 = new Path.Rectangle(offset+new Point(length-thickness*2,width*1/6),new Size(thickness*2,width/6))


var sideL = new Path.Rectangle(offset-new Point(height,0) ,LRSizes)
var sideL1_5 = new Path.Rectangle(offset-new Point(height+thickness,0) ,new Size(thickness*1.5,LRSizes.height))
var sideL2 = new Path.Rectangle(offset-new Point(height*2+thickness,0),LRSizes)
var sideLTab1 = new Path.Rectangle(offset-new Point(height*2+thickness*2,-width*1/6),new Size(thickness,width/6))
var sideLTab2 = new Path.Rectangle(offset-new Point(height*2+thickness*2,-width*4/6),new Size(thickness,width/6))
var handleL1 = handleTemp.clone()
handleL1.position = offset-new Point(height+thickness/2-height/3,-width/2)
var handleL2 = handleTemp.clone()
handleL2.position = offset-new Point(height+thickness/2+height/3,-width/2)


var sideR = new Path.Rectangle(offset+new Point(length,0),LRSizes)
var sideR1_5 = new Path.Rectangle(offset+new Point(length+height,0),new Size(thickness*1.5,LRSizes.height))
var sideR2 = new Path.Rectangle(offset+new Point(length+height+thickness,0),LRSizes)
var sideRTab1 = new Path.Rectangle(offset+new Point(length+height*2+thickness,width*1/6),new Size(thickness,width/6))
var sideRTab2 = new Path.Rectangle(offset+new Point(length+height*2+thickness,width*4/6),new Size(thickness,width/6))
var handleR1 = handleTemp.clone()
handleR1.position = offset+new Point(length+height+thickness/2-height/3,width/2)
var handleR2 = handleTemp.clone()
handleR2.position = offset+new Point(length+height+thickness/2+height/3,width/2)

var sideT = new Path.Rectangle(offset-new Point(-thickness,height),TBSizes)
var sideTL = new Path.Rectangle(offset-new Point(TB_LRSizes.width-thickness,height),TB_LRSizes)
var sideTR = new Path.Rectangle(offset-new Point(-TBSizes.width-thickness,height),TB_LRSizes)
var handleTL = handleTemp2.clone()
handleTL.position = offset-new Point(TB_LRSizes.width-thickness,thickness+height * 2/3)
handleTL.rotate(90)
// handleTL.scale(1.5)
var handleTR = handleTemp2.clone()
handleTR.position = offset-new Point(-TBSizes.width-TB_LRSizes.width-thickness,thickness+height * 2/3)
handleTR.rotate(90)
// handleTR.scale(1.5)
var sideB = new Path.Rectangle(offset+new Point(thickness,width),TBSizes)
var sideBL = new Path.Rectangle(offset-new Point(TB_LRSizes.width-thickness,-width-thickness),TB_LRSizes)
var sideBR = new Path.Rectangle(offset-new Point(-length+thickness,-width-thickness),TB_LRSizes)
var handleBL = handleTemp2.clone()
handleBL.position = offset-new Point(TB_LRSizes.width-thickness,-width-thickness-height* 2/3)
handleBL.rotate(90)
// handleBL.scale(1.5)
var handleBR = handleTemp2.clone()
handleBR.position = offset-new Point(-TBSizes.width-TB_LRSizes.width-thickness,-width-thickness-height* 2/3)
handleBR.rotate(90)
// handleBR.scale(1.5)

base2 = base.clone()
// base2.strokeColor = "#000000"
// base.strokeColor = "#000000"
// baseTabHole1.strokeColor = "#000000"
// baseTabHole2.strokeColor = "#000000"
// baseTabHole3.strokeColor = "#000000"
// baseTabHole4.strokeColor = "#000000"
// sideL.strokeColor = "#000000"
// sideL1_5.strokeColor = "#000000"
// sideL2.strokeColor = "#000000"
// sideLTab1.strokeColor = "#000000"
// sideLTab2.strokeColor = "#000000"
// handleL1.strokeColor = "#000000"
// handleL2.strokeColor = "#000000"
// sideR.strokeColor = "#000000"
// sideR1_5.strokeColor = "#000000"
// sideR2.strokeColor = "#000000"
// sideRTab1.strokeColor = "#000000"
// sideRTab2.strokeColor = "#000000"
// handleR1.strokeColor = "#000000"
// handleR2.strokeColor = "#000000"
// sideT.strokeColor = "#000000"
// sideTL.strokeColor = "#000000"
// sideTR.strokeColor = "#000000"
// handleTL.strokeColor = "#000000"
// handleTR.strokeColor = "#000000"
// sideB.strokeColor = "#000000"
// sideBL.strokeColor = "#000000"
// sideBR.strokeColor = "#000000"
// handleBL.strokeColor = "#000000"
// handleBR.strokeColor = "#000000"


base = base.subtract(baseTabHole1)
base = base.subtract(baseTabHole2)
base = base.subtract(baseTabHole3)
base = base.subtract(baseTabHole4)
base = base.unite(sideL)
base = base.unite(sideL1_5)
base = base.unite(sideL2)
base = base.unite(sideLTab1)
base = base.unite(sideLTab2)
base = base.subtract(handleL1)
base = base.subtract(handleL2)
base = base.unite(sideR)
base = base.unite(sideR1_5)
base = base.unite(sideR2)
base = base.unite(sideRTab1)
base = base.unite(sideRTab2)
base = base.subtract(handleR1)
base = base.subtract(handleR2)
base = base.unite(sideT)
base = base.unite(sideTR)
base = base.unite(sideTL)
base = base.subtract(handleTL)
base = base.subtract(handleTR)
base = base.unite(sideB)
base = base.unite(sideBR)
base = base.unite(sideBL)
base = base.subtract(handleBL)
base = base.subtract(handleBR)
base.strokeColor = "#ff0000"

handleTemp.remove()

var base2D = dashPath(base2)
var sideL1_5D = dashPath(sideL1_5) 
var sideR1_5D = dashPath(sideR1_5)
var sideTLD = dashPath(sideTL)
var sideTRD = dashPath(sideTR)
var sideBLD = dashPath(sideBL)
var sideBRD = dashPath(sideBR)

base2D.strokeColor = "#ff0000"
sideL1_5D.strokeColor = "#ff0000"
sideR1_5D.strokeColor = "#ff0000"
sideTLD.strokeColor = "#ff0000"
sideTRD.strokeColor = "#ff0000"
sideBLD.strokeColor = "#ff0000"
sideBRD.strokeColor = "#ff0000"
}
// process()




function dashPath(path){
    // console.log(path.segments)
    const dashline = 8
    const dashgap = 7
    var dashPos = dashgap
    compoundPath = new CompoundPath()
    while (path.length > dashPos+8){
        
        var skip = false
        path.segments.forEach(s => {
            
            // console.log(path.getOffsetOf(s.point))
            if(dashPos-dashgap/2 < path.getOffsetOf(s.point) && dashPos+dashline+dashgap/2 > path.getOffsetOf(s.point)){
                skip = true
            }
        });
        
        var segments = [path.getPointAt(dashPos), path.getPointAt(dashPos+dashline)];
        dashPos += dashline + dashgap
        

        if(skip){ continue }
        

        var p = new Path(segments);
        compoundPath.addChild(new Path(p.segments))
    }
    // compoundPath.selected = true
    return compoundPath
}


function process()
{

    project.activeLayer.scale(3.779528)
    // project.activeLayer.scale(2)

    project.activeLayer.position = project.activeLayer.bounds.size/2;

    // myCanvas is an Id made in html doc
    myCanvas.width = project.activeLayer.bounds.width+100
    myCanvas.height = project.activeLayer.bounds.height+10
    
    
    
   
    // downloadAsSVG()
    // console.log(project.exportSVG())
    // rect.strokeColor = "#000000"
}

function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}
