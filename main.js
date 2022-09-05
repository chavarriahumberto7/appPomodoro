const tasks=[];
let time=0;
let timer=null;
let timeBreak=null;
let current=null;

const bAdd=document.querySelector("#bAdd");
const itTask=document.querySelector("#itTask");
const form=document.querySelector("#form");
const taskName=document.querySelector("#time #taskName");

renderTime();
renderTask();

form.addEventListener("submit",(e)=>{
 e.preventDefault();

 if (itTask.value!=""){
    createTask(itTask.value);
    itTask.value="";
    renderTask();
 }
});


function createTask(value){
 
const newTask={
    id: (Math.random()*100).toString(36).slice(3),
    title:value,
    completed:false
}
    tasks.unshift(newTask);
    
}

function renderTask(){
    const html=tasks.map((task)=>{
        return `<div class="task">
        <div class="completed"> ${task.completed?`<span class="done">Done</span>`:`<button class="start-button" data-id="${task.id}">Start</button>`} </div>
        <div class="title">${task.title}</div>
     </div>`;
    });

    const container=document.querySelector(".tasks");
    container.innerHTML=html.join("");

    //Starting counter after each buttons is clicked
    const startButtons=document.querySelectorAll(".task .start-button");
    startButtons.forEach((btn)=>{
        btn.addEventListener("click",(e)=>{
            if(!timer){
                btn.textContent="In Progress..."
                const id=btn.getAttribute("data-id")
                startButtonHandler(id)
            }
        });
    });
};

function startButtonHandler(id){
    time=5;
    current=id;
    const taskIndex=tasks.findIndex((task)=>{
        return task.id==id;
    });
    
    renderTime();
    taskName.textContent=tasks[taskIndex].title;
    timer=setInterval(()=>{
        timeHandler(id);
    },1000);

    
}

function timeHandler(id){
    time--;
    renderTime();
    if(time==0)
    {
        clearInterval(timer);
        markCompleted(id);
        renderTask();
        startBreak();
    }
}

function renderTime(){
    timeDiv=document.querySelector("#time #value");
    const minutes=parseInt(time/60);
    const seconds=parseInt(time%60);2
    timeDiv.textContent=`${minutes<10?"0":""}${minutes}:${seconds<10?"0":""}${seconds}`;
}


function markCompleted(id){
    
 const taskIndex=tasks.findIndex(task =>task.id==id);
 
 tasks[taskIndex].completed=true;
}

function startBreak(){
time=5;

taskName.textContent="Break";
renderTime();
timer=setInterval(()=>{
    breakHandler();
},1000);


};

function breakHandler()
{
    time--;
    renderTime();
    
    if(time==0)
    {
        clearInterval(timer);
        renderTask();
        current=null;
        timer=null;
    taskName.textContent="";
      
    }
}