const thickness = 4.8
const tabLength = 5

// Settings in MM
const handleHeight = 15
const width = 100
const length = 100+thickness*2
const height = 100

// Logic
const offset = new Point(height*2+thickness*2,height)
const LRSizes = new Size(height,width)
const TBSizes = new Size(length-thickness*2,height)
const TB_LRSizes = new Size(width/2,height-thickness)
const handleTemp = new Path.Rectangle(new Rectangle(new Point(0,0), new Size(handleHeight,width/4)),handleHeight/2)
const handleTemp2 = new Path.Rectangle(new Rectangle(new Point(0,0), new Size(handleHeight+5,width/4+5)),handleHeight/2)
// handleTemp.strokeColor = "#000000"

var base = new Path.Rectangle(offset,new Size(length,width))
var baseTabHole1 = new Path.Rectangle(offset+new Point(thickness,width*1/6),new Size(thickness,width/6))
var baseTabHole2 = new Path.Rectangle(offset+new Point(thickness,width*4/6),new Size(thickness,width/6))
var baseTabHole3 = new Path.Rectangle(offset+new Point(length-thickness*2,width*4/6),new Size(thickness,width/6))
var baseTabHole4 = new Path.Rectangle(offset+new Point(length-thickness*2,width*1/6),new Size(thickness,width/6))


var sideL = new Path.Rectangle(offset-new Point(height,0) ,LRSizes)
var sideL1_5 = new Path.Rectangle(offset-new Point(height+thickness,0) ,new Size(thickness,LRSizes.height))
var sideL2 = new Path.Rectangle(offset-new Point(height*2+thickness,0),LRSizes)
var sideLTab1 = new Path.Rectangle(offset-new Point(height*2+thickness*2,-width*1/6),new Size(thickness,width/6))
var sideLTab2 = new Path.Rectangle(offset-new Point(height*2+thickness*2,-width*4/6),new Size(thickness,width/6))
var handleL1 = handleTemp.clone()
handleL1.position = offset-new Point(height+thickness/2-height/3,-width/2)
var handleL2 = handleTemp.clone()
handleL2.position = offset-new Point(height+thickness/2+height/3,-width/2)


var sideR = new Path.Rectangle(offset+new Point(length,0),LRSizes)
var sideR1_5 = new Path.Rectangle(offset+new Point(length+height,0),new Size(thickness,LRSizes.height))
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
handleTL.position = offset-new Point(TB_LRSizes.width-thickness,thickness/2+height * 2/3)
handleTL.rotate(90)
// handleTL.scale(1.5)
var handleTR = handleTemp2.clone()
handleTR.position = offset-new Point(-TBSizes.width-TB_LRSizes.width-thickness,thickness/2+height * 2/3)
handleTR.rotate(90)
// handleTR.scale(1.5)
var sideB = new Path.Rectangle(offset+new Point(thickness,width),TBSizes)
var sideBL = new Path.Rectangle(offset-new Point(TB_LRSizes.width-thickness,-width-thickness),TB_LRSizes)
var sideBR = new Path.Rectangle(offset-new Point(-length+thickness,-width-thickness),TB_LRSizes)
var handleBL = handleTemp2.clone()
handleBL.position = offset-new Point(TB_LRSizes.width-thickness,-width-thickness/2-height* 2/3)
handleBL.rotate(90)
// handleBL.scale(1.5)
var handleBR = handleTemp2.clone()
handleBR.position = offset-new Point(-TBSizes.width-TB_LRSizes.width-thickness,-width-thickness/2-height* 2/3)
handleBR.rotate(90)
// handleBR.scale(1.5)

base2 = base.clone()
base2.strokeColor = "#000000"
// base.strokeColor = "#000000"
// baseTabHole1.strokeColor = "#000000"
// baseTabHole2.strokeColor = "#000000"
// baseTabHole3.strokeColor = "#000000"
// baseTabHole4.strokeColor = "#000000"
// sideL.strokeColor = "#000000"
sideL1_5.strokeColor = "#000000"
// sideL2.strokeColor = "#000000"
// sideLTab1.strokeColor = "#000000"
// sideLTab2.strokeColor = "#000000"
// handleL1.strokeColor = "#000000"
// handleL2.strokeColor = "#000000"
// sideR.strokeColor = "#000000"
sideR1_5.strokeColor = "#000000"
// sideR2.strokeColor = "#000000"
// sideRTab1.strokeColor = "#000000"
// sideRTab2.strokeColor = "#000000"
// handleR1.strokeColor = "#000000"
// handleR2.strokeColor = "#000000"
// sideT.strokeColor = "#000000"
sideTL.strokeColor = "#000000"
sideTR.strokeColor = "#000000"
// handleTL.strokeColor = "#000000"
// handleTR.strokeColor = "#000000"
// sideB.strokeColor = "#000000"
sideBL.strokeColor = "#000000"
sideBR.strokeColor = "#000000"
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
// process()





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
