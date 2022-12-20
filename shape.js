const svg = 
    `<svg
  
   id="svg72512"
   inkscape:version="1.2.1 (9c6d41e410, 2022-07-14)"
   sodipodi:docname="RobotFrameV2.svg"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  
   <defs
   id="defs72509" />
<g
   inkscape:label="Layer 1"
   inkscape:groupmode="layer"
   id="layer1"
   transform="translate(-49.072211,-163.54384)">
  <path
     id="path76327"
     style="fill-opacity:0;stroke:#000000"
     inkscape:transform-center-y="-15.36739"
     d="m 49.71862,243.64767 c 0,0 -1.491358,-21.5853 5.056298,-44.48511 3.273828,-11.44991 5.817597,-20.84384 10.810957,-27.02618 4.99336,-6.18233 12.436311,-9.15306 25.508506,-7.75656 6.536097,0.69825 9.902529,1.92395 11.557429,3.87093 m 0,0 c 1.6549,1.94699 1.59827,4.61526 1.28824,8.19865 -0.62005,7.16679 -2.25369,17.99408 6.76416,34.03258 18.0357,32.07701 26.07808,33.70471 26.07808,33.70471 m 0,0 -46.765959,-0.53902 H 49.71862"
     sodipodi:nodetypes="csssccsscccc" />
</g>
</svg>`
const svgGroup = project.importSVG(svg,{insert: true});
const group = svgGroup.lastChild;
var customSVG = group.lastChild;
customSVG.strokeColor= null

thickness = 2.8
tabLength = 10
width = 130
length = 140
height = 60


let rectangle1 = new Rectangle(new Point(0,0),new Size(length,width));
customSVG.fitBounds(rectangle1)



var lenList = [
    customSVG.children[0].length,
    customSVG.children[1].length,
    customSVG.children[2].length
]
var perimeter = lenList.reduce((a, b) => a + b, 0);

//makeLivingHinge(10,10,50,50)
makeLid(20,30+height)
makeLid(40+length,30+height)
// makeLid(40+length,height+30)
makeSide(10+thickness,10)

// process()

function makeLid(x,y){
    // test = new Path.Rectangle(new Point(x,y+width-20),new Size(95,20))
    // test.strokeColor="#ff0000"
    var path = customSVG.clone()
    
    path.position = new Point(x+length/2,y+width/2)
    
    //indent to free lid tabs
    let lidIndent  = new Path(path.children[1].segments)
    lidIndent = PaperOffset.offset(lidIndent, thickness/2, { join: 'round' })
    let refer  = new Path(path.children[0].segments)
    refer = PaperOffset.offset(refer, 7, { join: 'round' })
    lidIndent.insert(0,refer.getPointAt(refer.length-4))
    lidIndent.segments.unshift(new Segment(lidIndent.bounds.topRight))
    
    // create the tabs
    var tabs = makeTabs(path.children[0],path.children[0].length)

    //make specail lid tabs here:
    var tabs2 = makeTabs(path.children[1],path.children[1].length+10)
    let holeOff = 2
    let hingeInner = Path.Circle(path.children[1].getPointAt((path.children[1].length-holeOff)),Math.hypot(thickness,tabLength)/2)
    let hingeOuter = Path.Circle(path.children[1].getPointAt((path.children[1].length-holeOff)),9)
    hingeInner.strokeColor = "#00000"
    
    var tabs3 = makeTabs(path.children[2],path.children[2].length-10,10)
    // merge the tabs together
    tabs = tabs.unite(tabs2)
    tabs = tabs.unite(tabs3)
    
    // make connected path
    var connectedPath =new Path()//path.unite(path)
    connectedPath = connectedPath.unite(path.children[0])
    // connectedPath = connectedPath.unite(path.children[1])
    connectedPath.join(path.children[1])
    connectedPath.join(path.children[2])
    connectedPath.fillColor = null
    // connectedPath.strokeColor = "#000000"
    
    //dialate path to be bigger
    var dilaConnectedPath = PaperOffset.offset(connectedPath, 7, { join: 'round' })
    dilaConnectedPath.strokeColor = null


    dilaConnectedPath = dilaConnectedPath.subtract(lidIndent)
    dilaConnectedPath = dilaConnectedPath.unite(hingeOuter)
    dilaConnectedPath = dilaConnectedPath.subtract(tabs)

    makeMotorMount(x+10,y+10)




    dilaConnectedPath.strokeColor = "#000000"
}
function makeSide(x,y){
    let rectangle1 = new Path.Rectangle(new Point(x,y),new Size(perimeter,height));
    let path = rectangle1
    
    //let lenList = [length-(thickness*2),width,length -(thickness*2),width]
    let xcord = x;
    
    let pannel1 = new Path.Rectangle(new Point(xcord,y),new Size(lenList[0],height));
    let tabs = new Path();
    tabs = tabs.unite(makeTabs(pannel1, lenList[0], height,thickness/2))
    tabs = tabs.unite(makeTabs(pannel1, lenList[0], 2*height+lenList[0],thickness/2))
    
    let extension = new Path.Rectangle(pannel1.bounds.topRight,new Size(2,height));
    pannel1 = pannel1.unite(extension)
    
    let lidDent = (makeTabs(pannel1, height/2, (height+pannel1.bounds.width)+height/4,-thickness/2))
    
    pannel1 = pannel1.unite(tabs)
    pannel1 = pannel1.subtract(lidDent)
    
    let p = pannel1.bounds
    makeLivingHinge(p.x, p.y, (p.width-12), p.height)
    pannel1.strokeColor="#000000"

    xcord += lenList[0]+ 10

    let offset = 4
    let pannel2 = new Path.Rectangle(new Point(xcord,y),new Size(lenList[1]+offset,height));
    let tabs2 = new Path();
    tabs2 = tabs2.unite(makeTabs(pannel2, lenList[1]+10, height+1,thickness/2))
    tabs2 = tabs2.unite(makeTabs(pannel2, lenList[1]+10, 2*height+lenList[1]+(2*offset-10)-1,thickness/2))
    
    let lidTab = (makeTabs(pannel2, height/2, height/4,+thickness/2))

    pannel2 = pannel2.unite(tabs2)
    let p2 = pannel2.bounds
    makeLivingHinge(p2.x+1, p2.y, (p2.width-12), p2.height)
    pannel2 = pannel2.unite(lidTab)
    
    pannel2.strokeColor="#000000"
    
    xcord += lenList[1]+ 10

    offset = 8
    let pannel3 = new Path.Rectangle(new Point(xcord,y),new Size(lenList[2]-offset,height));
    let tabs3 = new Path();
    tabs3 = tabs3.unite(makeTabs(pannel3, lenList[2]-10, (height),thickness/2))
    tabs3 = tabs3.unite(makeTabs(pannel3, lenList[2]-10,2*height+lenList[2]-(2*offset-10),thickness/2))
    pannel3 = pannel3.unite(tabs3)
    

    pannel3.strokeColor="#000000"
    

}

function makeMotorMount(x,y)
{
    let mmW = 47.6;
    let mmL = 23.0;
    
    let mScrew = 5.4;
 
    // main area box
    let rectangle1 = new Path.Rectangle(new Point(x,y),new Size(mmL,mmW));
    // rectangle1 = rectangle1.scale(1.1)
    rectangle1.strokeColor = "#000000"
    
    // motor hole 
    let cir = new Path.Circle(new Point(x+mmL/2,y+14.1),mmL/2);
    // motor screw hole 1
    let cir2 = new Path.Circle(new Point(x+mmL/2,y+mScrew/2),mScrew/2);
    // cir2.strokeColor = "#000000"
    // motor screw hole 2
    let cir3 = new Path.Circle(new Point(x+mmL/2,y+28.2-mScrew/2),mScrew/2);
    // cir3.strokeColor = "#000000"
    
    cir = cir.unite(cir2)
    cir = cir.unite(cir3)
    cir.strokeColor = "#000000"
    
     // mount screw hole 1
    let cir4 = new Path.Circle(new Point(x+mmL/2-(17.8/2),y+mmW-2.6),1.5);
    cir4.strokeColor = "#000000"
    // mount screw hole 2
    let cir5 = new Path.Circle(new Point(x+mmL/2+(17.8/2),y+mmW-2.6),1.5);
    cir5.strokeColor = "#000000"
}

