let words=document.querySelectorAll(".word");
const themeToggle=document.getElementById("theme-toggle");
let savedTheme=null;

try{
    savedTheme=localStorage.getItem("portfolio-theme");
}catch(error){
    console.error("Unable to load the saved theme preference.",error);
}

if(savedTheme==="light"){
    document.body.classList.add("light-theme");
}

function updateThemeToggle(){
    const isLightTheme=document.body.classList.contains("light-theme");
    themeToggle.classList.toggle("bx-bulb",!isLightTheme);
    themeToggle.classList.toggle("bxs-bulb",isLightTheme);
    themeToggle.setAttribute("aria-label",isLightTheme ? "Switch to dark mode" : "Switch to light mode");
}

updateThemeToggle();
themeToggle.addEventListener("click",()=>{
    const isLightTheme=document.body.classList.toggle("light-theme");
    updateThemeToggle();

    try{
        localStorage.setItem("portfolio-theme",isLightTheme ? "light" : "dark");
    }catch(error){
        console.error("Unable to save the theme preference.",error);
    }
});

words.forEach((word)=>{
    let letters=word.textContent.split("");
    word.textContent="";
    letters.forEach((letter)=>{
        let span=document.createElement("span");
        span.textContent=letter;
        span.className="letter";
        word.append(span);
    });
});
let currentWordIndex=0;
let maxWordIndex=words.length-1;
words[currentWordIndex].style.opacity="1";

let changeText=()=>{
    let currentWord=words[currentWordIndex];
    let nextWord=currentWordIndex===maxWordIndex ? words[0] : words[currentWordIndex+1];

    Array.from(currentWord.children).forEach((letter,i)=>{
        setTimeout(()=>{
            letter.className="letter out";
        },i*80);
    });
    nextWord.style.opacity="1";
    Array.from(nextWord.children).forEach((letter,i)=>{
        letter.className="letter behind";
        setTimeout(()=>{
            letter.className="letter in";
        },340+(i*80));
    });
    currentWordIndex=currentWordIndex===maxWordIndex ? 0 : currentWordIndex+1;
};
changeText();
setInterval(changeText,3000);


// circle skill
const circles=document.querySelectorAll(".circle");
circles.forEach(elem=>{
    var dots=elem.getAttribute("data-dots");
    var marked=elem.getAttribute("data-percent");
    var percent=Math.floor(dots*marked/100);
    var points="";
    var rotate=360/dots;
    for(let i=0;i<dots;i++){
        points+=`<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }
    elem.innerHTML=points;
    const pointsMarked=elem.querySelectorAll(".points");
    for(let i=0;i<percent;i++){
        pointsMarked[i].classList.add("marked");
    }
});


// active menu
let menuLi=document.querySelectorAll('header ul li a');
let section=document.querySelectorAll('section');

function activeMenu(){
    let len=section.length;
    while(--len && window.scrollY + 97 < section[len].offsetTop){}
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll",activeMenu);



// sticky navbar
const header=document.querySelector("header");
window.addEventListener("scroll",function(){
    header.classList.toggle("sticky",window.scrollY>50);
});


// toggle icon navbar
let menuIcon=document.querySelector("#menu-icon");
let navlist=document.querySelector(".navlist");

menuIcon.onclick=()=>{
    menuIcon.classList.toggle("bx-x");
    navlist.classList.toggle("open");
}
window.onscroll=()=>{
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open");
}



// scroll animations(paraliax)
const observer=new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show-items");
        }
        else{
            entry.target.classList.remove("show-items");
        }
    });
});
const scrollScale=document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el)=>observer.observe(el));

const scrollBottom=document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el)=>observer.observe(el));

const scrollTop=document.querySelectorAll(".scroll-top");
scrollTop.forEach((el)=>observer.observe(el));

const projectTitles = Array.from(document.querySelectorAll(".port-content h3[data-tooltip]"))
    .map(heading => ({
        heading,
        title: heading.querySelector("span"),
        originalMarkup: heading.querySelector("span").innerHTML,
        fullTitle: heading.dataset.tooltip
    }));

function updateProjectTitleTruncation(){
    projectTitles.forEach(({heading, title, originalMarkup, fullTitle}) => {
        title.innerHTML = originalMarkup;
        heading.classList.remove("is-truncated");
        title.classList.add("is-measuring");

        const getLineCount = () => {
            const range = document.createRange();
            range.selectNodeContents(title);
            return new Set(Array.from(range.getClientRects(), rect => Math.round(rect.top))).size;
        };

        if(getLineCount() > 2){
            let shortenedTitle = fullTitle;
            while(shortenedTitle.length && getLineCount() > 2){
                shortenedTitle = shortenedTitle.slice(0, -1).trimEnd();
                title.textContent = `${shortenedTitle}…`;
            }
            heading.classList.add("is-truncated");
        }

        title.classList.remove("is-measuring");
    });
}

updateProjectTitleTruncation();
window.addEventListener("resize", updateProjectTitleTruncation);
if(document.fonts){
    document.fonts.ready.then(updateProjectTitleTruncation);
}


// sending contact details and message
(function(){
    emailjs.init("WZOEL_bz7_NQjzaGO"); // your Public Key
})();

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // stop page from reloading

    // Collect form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Simple validation
    if (name && email && address && phone && message) {

        // First send email
        emailjs.send("service_u96tx7s", "service_u96tx7s", {
            from_name: name,
            from_email: email,
            address: address,
            phone: phone,
            message: message
        }).then(function(response) {
            alert('Message Sent Successfully ✅');
            document.getElementById('contactForm').reset();

        }, function(error) {
            alert('Failed to Send Message ❌, Try Again Later.');
            console.error('Error Details:', error);
        });

    } else {
        alert("Please fill in all fields correctly.");
    }
});







