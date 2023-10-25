function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectdetection=ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects.";
    
}

    

song="";
status="";
objects= []; 
function preload(){
    song=loadSound("cardigan_edit.mp3");
}
function modelLoaded(){
    console.log("Model is Loaded");
    status=false;
    
}
function gotResults(error,results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results);
        objects= results ;
    }
}

function draw(){
    image(video,0,0,380,380);
    if(status== "false"){
        objectdetection.detect(video,gotResults);
        r=random(255);
        g=random(255);
        b=random(255);
        for(i=0;  i<objects.length; i++){
            document.getElementById("status").innerHTML= "Status: Object Detected";
            
            fill(r,g,b);
            percent= floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label=="person"){
            document.getElementById("babyfound").innerHTML="Status: Baby is Found";
            song.stop();
            }
            else{
                document.getElementById("babyfound").innerHTML="Baby is not found";
                song.play();
            }
        }
    }
}
