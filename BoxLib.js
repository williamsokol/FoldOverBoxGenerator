window.thickness = 4.8
window.Dthick = thickness*2
window.tabLength = 10
window.width = 130
window.length = 140
window.height = 60


window.makeTabs = function(shapePath,length, start=0, dist=0)
{


    var tabPath = new Path()

    let tabPos = 0;
    
    let tabCount = getTabCount(length)
    for(var j=0;j<tabCount;j++){
        var tab = new Path.Rectangle(new Point(0,0),new Size(tabLength,thickness));
        tabPos = j*(length/tabCount) + (length/tabCount)/2 + start
        var offsetPoint = shapePath.getPointAt(tabPos)
        var tan = shapePath.getTangentAt(tabPos); 
        let norm = shapePath.getNormalAt(tabPos)

        tab.rotate(tan.angle/*, offsetPoint*/);
        tab.position = offsetPoint + (norm*dist)
        
        // console.log("test: " + norm*dist +" "+ j)
        tabPath = tabPath.unite(tab)
    }
    // tabPath.strokeColor = "#00ff00"
    return tabPath;
}
window.getTabCount = function (len, tabDense = 2.0)
{
    return Math.floor(((len-tabLength)/tabDense)/tabLength)
}

window.makeLivingHinge = function(x,y,w,h)
{
    const spacing = 2,line = 19,gap = 7;

    x += spacing
    w -= spacing
    
    // let a = new Path.Rectangle(new Point(x,y),new Size(w,h))
    // a.strokeColor = "#000000"
    var path = new CompoundPath() 
    
    for(var i=0; i< w/spacing;i++){
        let yOffset = (i%2 *(line+gap)/2)- line

        while(yOffset < h){
            let top = Math.max(y+yOffset, y);
            let bot = Math.min(line+y+yOffset, y+h)

            var path2 = new Path.Line(new Point(i*spacing+x,top), new Point(i*spacing+x,bot));
            // path2.strokeColor = '#000000'
            yOffset += gap + line
            path.addChild(path2)

        }
    }
    path.strokeColor = '#000000'
    return path
}

window.makeMotorMount = function (x,y)
{
    let mmW = 47.6;
    let mmL = 23.0;
    
    let mScrew = 10;
 
    // main area box
    let rectangle1 = new Path.Rectangle(new Point(x,y),new Size(mmL,mmW));
    rectangle1 = rectangle1.scale(1.1)
    rectangle1.strokeColor = "#ff0000"
    rectangle1.remove()
    
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

window.makeTabLine = function(x,y,dist,rot = 0){
    var from = new Point(x, y);
    var to = new Point(x, y-dist);
    var path = new Path.Line(from, to);
    path.rotate(rot,from)
    return path
}

window.booleanCompound = function( Cpath /*CompoundPath*/, path /*Path*/, operation = 'subtract' /*string*/){
    var res = new CompoundPath()
    for (let i=0; i<Cpath.children.length;i++){
        res.addChild(Cpath.children[i][operation](path, { stroke: true }) );
    }
    return res;
}

// new functions go here v----v


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

 
window.process = process;