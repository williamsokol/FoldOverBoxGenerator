const svg = 
    `<svg
  
   id="svg72512"
   inkscape:version="1.2.1 (9c6d41e410, 2022-07-14)"
   sodipodi:docname="RobotFrameV1.svg"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <sodipodi:namedview
     id="namedview72514"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:document-units="mm"
     showgrid="false"
     inkscape:zoom="0.49085999"
     inkscape:cx="-153.81168"
     inkscape:cy="215.94753"
     inkscape:window-width="1366"
     inkscape:window-height="705"
     inkscape:window-x="-8"
     inkscape:window-y="-8"
     inkscape:window-maximized="1"
     inkscape:current-layer="layer1" />
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
       d="m 49.71862,243.64767 c 0,0 -1.491358,-21.5853 5.056298,-44.48511 6.547656,-22.89981 10.175074,-37.57575 36.319463,-34.78274 26.144389,2.79301 1.57413,14.02515 19.609829,46.10216 18.0357,32.07701 26.07808,33.70471 26.07808,33.70471 m 0,0 -46.765959,-0.53902 H 49.71862"
       sodipodi:nodetypes="czzzcccc" />
  </g>
</svg>`
const svgGroup = project.importSVG(svg,{insert: true});
const group = svgGroup.lastChild;
var customSVG = group.lastChild;
customSVG.strokeColor= null

const thickness = 4.8
var Dthick = thickness*2
const tabLength = 10
const width = 90
const length = 120

const height = 50
const cornerSize = new Size(30, 30);

let rectangle1 = new Rectangle(new Point(0,0),new Size(length,width));
customSVG.fitBounds(rectangle1)



var lenList = [
    customSVG.children[0].length,
    customSVG.children[1].length
]
var perimeter = lenList.reduce((a, b) => a + b, 0);

//makeLivingHinge(10,10,50,50)
makeLid(20,30+height)
makeLid(20+length,30+height)
// makeLid(40+length,height+30)
makeSide(10+thickness,10)

// process()

function makeLid(x,y){
    
    var path = customSVG.clone()//new Path.Rectangle(rectangle1, cornerSize);
    path.strokeColor = '#000000';
    
    path.position = new Point(x+length/2,y+width/2)
    
    var connectedPath = path.unite(path)
    path.remove()
    var tabs = makeTabs(connectedPath,lenList)

    var temp = connectedPath;
    connectedPath = PaperOffset.offset(connectedPath, 7, { join: 'round' })
    temp.remove()

    connectedPath = connectedPath.subtract(tabs)

}
function makeSide(x,y){
    let rectangle1 = new Path.Rectangle(new Point(x,y),new Size(perimeter,height));
    let path = rectangle1
    
    //let lenList = [length-(thickness*2),width,length -(thickness*2),width]
    let xcord = x;
    for(var i=0;i<lenList.length;i++){
        
        let size = lenList[i]/tabLength;
        let tabCount = getTabCount(lenList[i])
        for(var j=0;j<tabCount;j++){
            let tabPos = j*(lenList[i]/tabCount) + (lenList[i]/tabCount)/2 
            console.log("side: " + tabPos)
            var tab = new Path.Rectangle(new Point(tabPos+xcord,y-thickness),new Size(tabLength,thickness*2+height));
            path = path.unite(tab)
        }

        if(i%2 == 0){
            makeLivingHinge(xcord,y-thickness,lenList[i]-3,height+y)
        }
        
        xcord += lenList[i]
        var path2 = new Path.Line(new Point(xcord,y), new Point(xcord,height+y));
        path2.strokeColor = '#000000';
        
    }
    path.strokeColor = '#000000';
}
function makeTabs(shapePath,lenList, trueLenList=lenList, tabDense=2.0)
{
    var tabPath = new Path()
    
    //var trueLenList = [60/*,length,width,length*/]
    //let lenList = [300/*,length-(thickness*2),width,length*/]
    let tabPos = 0;
    let sideOffset = 0
    for(var i=0;i<lenList.length;i++){
        let tabCount = getTabCount(lenList[i])
        for(var j=0;j<tabCount;j++){
            var tab = new Path.Rectangle(new Point(0,0),new Size(tabLength,thickness));
            tabPos = j*(lenList[i]/tabCount) + (lenList[i]/tabCount)/2 + sideOffset 
            console.log("lid: " + tabPos)
            var offsetPoint = shapePath.getPointAt(tabPos)
            var tan = shapePath.getTangentAt(tabPos); 
            tab.position = offsetPoint
            tab.rotate(tan.angle, offsetPoint);
            
            // console.log("test: " + tabCount +" "+ j)
            tabPath = tabPath.unite(tab)
        }
        sideOffset += trueLenList[i]
    }
    //tabPath.tabCount = tabCount
    // tabPath.strokeColor = '#000ff0';
    return tabPath;
}
function makeLivingHinge(x,y,w,h)
{
    const spacing = 3,line = 17,gap = 7;
    
    // let a = new Path.Rectangle(new Point(x,y),new Size(w,h))
    // a.strokeColor = "#000000"
    var path = new CompoundPath() 
    
    for(var i=0; i< w/spacing;i++){
        let yOffset = (i%2 *(line+gap)/2)- line

        while(yOffset < h){
            let top = Math.max(y+yOffset, y);
            let bot = Math.min(line+y+yOffset, y+h)

            var path2 = new Path.Line(new Point(i*spacing+x,top), new Point(i*spacing+x,bot));
            path2.strokeColor = '#000000'
            yOffset += gap + line
            path.addChild(path2)

        }
    }
    path.strokeColor = '#000000'
    return path
}

function process()
{

    project.activeLayer.scale(3.779528)
    // project.activeLayer.scale(2)

    project.activeLayer.position = project.activeLayer.bounds.size/2;

    // myCanvas is an Id made in html doc
    myCanvas.width = project.activeLayer.bounds.width+100
    myCanvas.height = project.activeLayer.bounds.height+10
    
    
    
   
    downloadAsSVG()
    // console.log(project.exportSVG())
    // rect.strokeColor = "#000000"
}
var downloadAsSVG = function (fileName) {
   
    if(!fileName) {
        fileName = "paperjs_example.svg"
    }
 
    let rect = new Rectangle(project.activeLayer.bounds)
    rect = rect.scale(1.1) ;

    var url = "data:image/svg+xml;utf8," + encodeURIComponent(project.exportSVG({asString:true,bounds:rect}));
    
    var link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.click();
 }

 function getTabCount(len, tabDense = 2.0)
 {
    return Math.floor(((len-tabLength)/tabDense)/tabLength)
 }
window.process = process;