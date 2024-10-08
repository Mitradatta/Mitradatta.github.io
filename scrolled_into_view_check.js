
// Skills_Animation Functions
// 1.setoffset

// Achievements_Animation Functions
// 1.decimalanimate
// 2. numberanimate
// 3.setvalue
// 4. removefallin

//What-am-i_Animation Functions
// 1.classadd
// 2.check_class_existence

// Observer functions
// 1. callback1  - Skills_anime
// 2. callback2  - Achievements_anime
// 3. callback3  - What_am_i_content_anime



function setoffset(svgs,check_view)
{

  var k = `#${svgs.id} > circle:nth-child(2)`;
  element= document.querySelector(k);
  var percentage = parseFloat(element.getAttribute("percent"));
    var radius = element.getAttribute('r');
    var circumference = 2* Math.PI* parseFloat(radius);
    element.style.strokeDasharray = `${circumference} ${circumference}`;
  // console.log(check_view);
   if(check_view==true)
   {
        offset = circumference - percentage / 100 * circumference;
        element.style.strokeDashoffset = offset;
   }
   else
   {
    element.style.strokeDashoffset = circumference;
   }
    
    // console.log(circumference,element.id);
}


function decimalanimate(skillelement)
{
  skillvalue = skillelement.getAttribute('value');
  var value1 = parseInt(skillvalue);
   var value2 = parseFloat(skillvalue).toFixed(1) - parseInt(skillvalue);

   // console.log(value1,value2);
   var c=200;
   skillelement.innerText = parseFloat(1.0).toFixed(1);
   var initial = 1;
   var k =1;
   skillelement.style.animation = k;
  while(initial<value1)
  {
    
    setTimeout( function()
        {  
          skillelement.innerText = (parseFloat(skillelement.innerText) + 1.0).toFixed(1);   
        },c);
      c+=c/6;
      initial+=1
   }
   initial = 0;
   while(initial<value2)
  {
    
    setTimeout( function()
        {  
          skillelement.innerText = (parseFloat(skillelement.innerText)+ 0.1).toFixed(1);   
        },c);
      c+=(c/10);
      initial = (initial+0.1);
   }

}
function numberanimate(skillelement,x)
{
   skillvalue = skillelement.getAttribute('value');
   var value = parseInt(skillvalue);

   var c=300;
   // console.log(x);
   skillelement.innerText = parseInt(0);
   var initial = 0;
   if(x==1)
   {
      step =7;
   }
   else if(x==2)
   {
      step = 1.5;
   }
   else
   {
     step = 1;
   }
   while(initial<value)
  {
    
    setTimeout( function()
        {  
          skillelement.innerText = parseInt(skillelement.innerText) + 1;   
        },c);
      c+=(c/step);
      initial+=1;
   }
   skillelement.innerText = skillelement.innerText.toString();

}
function setvalue()
{
    var a = document.getElementsByClassName("achievements-values");
    // for(let i=0; i<a.length; i++)
    // {
    //     k = `fall-in 0.5s ease-in forwards ${i/3}s ,counter${i+1} 1s ease-in-out forwards ${(i+1)/3}s`;
    //     console.log(k);
    //     a[i].style.animation = k;
    // }

    for(let i=0; i<a.length; i++)
    {
        a[i].classList.add("fallinvalues");
    }
    c = 800;
    for(let i=0; i<a.length; i++)
    { 
      if(i==0)
      {
           //decimalanimate - function for decimal values animation - setTimeout(decimalanimate,800,a[i]);
          setTimeout(numberanimate,800,a[i],1);
      }
      else
      {
          setTimeout(numberanimate,c,a[i],i);
      }
    }  

}

function removefallin()
{

     var a = document.getElementsByClassName("achievements-values");
    for(let i=0; i<a.length; i++)
    {
        a[i].innerText = 0;
        a[i].classList.remove("fallinvalues");
        a[i].style.animation = "";
    }

}



function callback1(entries, observer)
{
  entries.forEach(entry => {
    setoffset(entry.target,entry.isIntersecting);
  });
}

function callback2(entries, observer)
{
  entries.forEach(entry => {
    if(entry.isIntersecting)
      {
        setvalue();
      }
    else
    {
      removefallin();
    }
  });
}


function classadd(element,class_name)
{
   
    element.classList.add(class_name);
}

function check_class_existence(element,class_name)
{

   const class_list = element.classList;
   // console.log(class_list);
    for(let i of class_list)
    {
         if(i==class_name)
        {
          // console.log(i)
          return true;
        }
    }
    return false;
}
function callback3(entries,observer)
{
   entries.forEach(entry => {
    if(entry.isIntersecting)
    {
      if(!check_class_existence(entry.target,"whatami_content_anime"))
      {
        classadd(entry.target,"whatami_content_anime");
      }
    }
  
  });
}


function callback4(entries,observer)
{
    entries.forEach(entry => {
     if(entry.isIntersecting)
     {
        let class_name = "achievement-heading-container-animation";
        if(!check_class_existence(entry.target,class_name))
        { 
         classadd(entry.target,class_name)
        }
         let title = document.getElementById("heading-for-animation");
        if(!check_class_existence(title,"achievement-title-animation"))
        { 
         classadd(title,"achievement-title-animation");
        }
         
      }
    }
  
  );
}


document.addEventListener("DOMContentLoaded", function() {
  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {

        let svgElement = entry.target;
     
          if (entry.isIntersecting) {
                  svgElement.style.transition = 'width 1s ease-out';  

                  let value = svgElement.getAttribute('value');
                  if (value) {

                    setTimeout(() => {
                      svgElement.style.width = `${value}%`;  // Use the value attribute to set width
                  }, 50);
                  
                  }
          } else {
             svgElement.style.transition = 'none';  
              svgElement.style.width = '0';  // Reset width when out of view
              }
    
          });
      });


  // Start observing the skillbars
  let elements = document.getElementsByClassName("skill-bar");
  for (let i = 0; i < elements.length; i++) {
      observer.observe(elements[i]);
  }
});



    document.addEventListener('DOMContentLoaded', function() {
        const icons = document.querySelectorAll('.withprogress');
        let delay = 500;

        icons.forEach((icon, index) => {
        setTimeout(() => {
            icon.classList.add('bubble');

            // Remove the 'bubble' class after the animation ends
            icon.addEventListener('animationend', function() {
                icon.classList.remove('bubble');
                icon.style.opacity = '1';
            }, { once: true });
        }, delay);
        delay += 100; // Adjust delay as needed
    });
});

function filterProjects(category) {
            const allProjects = document.querySelectorAll('.project-card');

            allProjects.forEach(function(card) {
                if (category === 'All' || card.getAttribute('data-category') === category) {
                    card.classList.remove('hidden');
                    card.classList.add("appear");
                    setTimeout(function() {
            card.classList.remove("appear");
        }, 1000); 

                } else {
                    card.classList.add('hidden');
                    // card.classList.remove("appear");
                }
            });
        }

        document.getElementById('all-projects').addEventListener('click', function(event) {
            event.preventDefault();
            filterProjects('All');
        });

        document.getElementById('system-projects').addEventListener('click', function(event) {
            event.preventDefault();
            filterProjects('s');
        });

        document.getElementById('web-projects').addEventListener('click', function(event) {
            event.preventDefault();
            filterProjects('w');
        });

        document.getElementById('ml-projects').addEventListener('click', function(event) {
            event.preventDefault();
            filterProjects('m');
        });

        // Initialize with all projects visible
        filterProjects('All');



        document.querySelectorAll('.filter a').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior

        // Remove "active" class from all links
        document.querySelectorAll('.filter a').forEach(function(link) {
            link.classList.remove('active');
        });

        // Add "active" class to the clicked link
        this.classList.add('active');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const sectionTitle = document.querySelectorAll('.section-title');
    
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear-heading');
        entry.target.classList.remove('hidden-heading');
      } else {
        entry.target.classList.add('hidden-heading');
        entry.target.classList.remove('appear-heading');
      }
    });
    });
    
    let elements = document.getElementsByClassName("section-title");
  for (let i = 0; i < elements.length; i++) {
      observer.observe(elements[i]);
  }
  });



let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4,
  };

let options2 = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7,
  };

    
//Observer Functions -- Observes the needed elements to animate when scrolled into view
let observer1 = new IntersectionObserver(callback1,options);
let observer2 = new IntersectionObserver(callback2,options);
let observer3 = new IntersectionObserver(callback3,options2);
let observer4 = new IntersectionObserver(callback4,options);

  // observer1.observe(document.querySelector('#whole1'));
  // observer1.observe(document.querySelector('#whole2'));
  // observer1.observe(document.querySelector('#whole3'));
  // observer1.observe(document.querySelector('#whole4'));
  // observer1.observe(document.querySelector('#whole5'));
  // observer1.observe(document.querySelector('#whole6'));
  // observer2.observe(document.querySelector('#a1'));
  observer2.observe(document.querySelector('#stats1'));
  // observer3.observe(document.querySelector('#wai_1'));
  // observer3.observe(document.querySelector('#wai_2'));
  // observer3.observe(document.querySelector('#wai_3'));
  // observer4.observe(document.querySelector('#achievements-heading'));
