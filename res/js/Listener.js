let userEventHandler=new UserState();
let loggedUser=new User();
let newPost=new Post();
let currnetId=2020;
let flag=true;
/////////////////////////////Variables//////////////////////////////
//by id
let postCreation=document.getElementById('post');
let duPost=document.getElementById('postbtn');

let login = document.getElementById('window');
let signup=document.getElementById('logup');
let signin=document.getElementById('log');

let cancel = document.getElementById('cancel');
let confirm = document.getElementById('confirm');

//about posts
let upvotes = document.querySelectorAll('div>section.postfooter>button.upv>img');
let downvotes = document.querySelectorAll('div>section.postfooter>button.downv>img');

let tagfilter = document.querySelectorAll('button.tags');

let editbtn = document.querySelectorAll('button.edit');
refreshVariables();
//console.log(editin);
//Нужна для работы кнопок взаимодействия с постами при изменении ленты постов
function refreshVariables(){
    newPost=new Post();
    upvotes = document.querySelectorAll('div>section.postfooter>button.upv>img');
    [].forEach.call(upvotes, function(btn) {
        btn.addEventListener('click', handleUpvoteBtnClick);
    });

    downvotes = document.querySelectorAll('div>section.postfooter>button.downv>img');
    [].forEach.call(downvotes, function(btn) {
        btn.addEventListener('click', handleDownvoteBtnClick);
    });

    tagfilter = document.querySelectorAll('button.tags');
    [].forEach.call(tagfilter, function(btn) {
        btn.addEventListener('click', handleTagsFilter);
    });

    editin = document.querySelectorAll('button.edit');
    [].forEach.call(editin, function(pen) {
        let workin=pen.firstChild.nextSibling;
        if(workin.alt==loggedUser.username)
            pen.style.visibility="visible";
        pen.addEventListener('click', handleEditPost);
    });  
}

/////////////////////////////Log In/Out//////////////////////////////

signup.onclick = function() {
    if(signup.textContent=="Sign Up")
        {
            login.style.visibility="visible";
        }
    else{
        signin.style.visibility="visible";
        userEventHandler.SignOut();
        postCreation.disabled=true;
        editin = document.querySelectorAll('button.edit');
        [].forEach.call(editin, function(pen) {
            pen.style.visibility="hidden";
        });  
    }
};

signin.onclick = function() {
    login.style.visibility="visible";
};


document.getElementById('cancel').onclick = function() {
    login.style.visibility="hidden";
};


document.getElementById('confirm').onclick = function() {
    loggedUser.username=document.getElementById("username").value;
    loggedUser.image=document.getElementById("userimg").value;
    userEventHandler.SignIn(loggedUser);
    login.style.visibility="hidden";
    signin.style.visibility="hidden";
    postCreation.disabled=false;
    editin = document.querySelectorAll('button.edit');
    [].forEach.call(editin, function(pen) {
        let workin=pen.firstChild.nextSibling;
        if(workin.alt==loggedUser.username)
            pen.style.visibility="visible";
    });  
    
};


//////////////////////////////points//////////////////////////////


function handleUpvoteBtnClick(event) {
    let BtnToChange = event.target;
    if(BtnToChange.alt=="off")
    {
        BtnToChange.alt="on";
        BtnToChange.src="res/images/_upvote_pressed.png";
        var Points = event.target.parentElement.nextSibling.nextSibling;
        var Btn = event.target.parentElement.nextSibling.nextSibling.nextSibling.nextSibling;
        if(Btn.firstChild.nextSibling.alt=="on")
            {
                Btn.firstChild.nextSibling.alt="off";
                Btn.firstChild.nextSibling.src="res/images/downvote.png";
                Points.textContent=Number.parseInt(Points.textContent)+2;
            }
        else
            Points.textContent=Number.parseInt(Points.textContent)+1;
    }
    else{
        BtnToChange.alt="off";
        BtnToChange.src="res/images/_upvote.png";
        var Points = event.target.parentElement.nextSibling.nextSibling;
        Points.textContent=Number.parseInt(Points.textContent)-1;
    }
}

function handleDownvoteBtnClick(event) {
    let BtnToChange = event.target;
    if(BtnToChange.alt=="off")
    {
        BtnToChange.alt="on";
        BtnToChange.src="res/images/downvote_pressed.png";
        var Points = event.target.parentElement.previousSibling.previousSibling;
        var Btn = event.target.parentElement.previousSibling.previousSibling.previousSibling.previousSibling;
        //console.log(Btn);
        if(Btn.firstChild.nextSibling.alt=="on")
            {
                Btn.firstChild.nextSibling.alt="off";
                Btn.firstChild.nextSibling.src="res/images/_upvote.png";
                Points.textContent=Number.parseInt(Points.textContent)-2;
            }
        else
            Points.textContent=Number.parseInt(Points.textContent)-1;
    }
    else{
        BtnToChange.alt="off";
        BtnToChange.src="res/images/downvote.png";
        var Points = event.target.parentElement.previousSibling.previousSibling;
        Points.textContent=Number.parseInt(Points.textContent)+1;
    }
}

/////////////////////////Filter by btn tagz/////////////////////////////

let hashTags=[];

let tagUnFilter=[];

[].forEach.call(tagfilter, function(btn) {
    btn.addEventListener('click', handleTagsFilter);
});
let buf=mas;
function handleTagsFilter(event) {
    
    let Tag = event.target;
    let target=document.querySelector("section.posts");
    let pseudo=Tag.cloneNode(true);
    pseudo.className="pseudo";
    if(hashTags.indexOf(Tag.textContent)==-1 && Tag.className!="pseudo")
    {
        target.insertBefore(pseudo,target.firstChild);
        hashTags.push(Tag.textContent);
        //console.log(Tag.textContent);
        tagUnFilter.push(pseudo);
        [].forEach.call(tagUnFilter, function(btn) {
            btn.addEventListener('click', handleTagsFilter);
        });
        
    }
    else{   
        
        if(Tag.className=="pseudo")
        {
            target.removeChild(Tag);
            hashTags.splice(hashTags.indexOf(Tag)-1,1);
        }
    }
    let filter={hashTags:hashTags};
    //console.log(twitter.getPage(0,twitter.length,filter)); 
    buf.Clear();
    let newmas=new PostForm(twitter);
    newmas.ShowPostsFeed(twitter.getPage(0,twitter.length,filter));
    buf=newmas;
    refreshVariables();
    
    //console.log(tagfilter);
}


/////////////////////////Sozdanie POsta/////////////////////////////

postCreation.onclick = function() {
    postCreation.value="";
};

duPost.onclick = function() {
    if(flag)
    {
        newPost.id=(++currnetId).toString();
        newPost.description=postCreation.value;
        newPost.author=loggedUser.username;
        if(loggedUser.image!=undefined)
            newPost.photoLink=loggedUser.image;
        let newDate = new Date();
        newPost.createdAt=newDate;
        twitter.add(newPost);
        mas.add(newPost);
    }
    else{
        
        
        let newDate = new Date();
        newPost.createdAt=newDate.toDateString+" (edited) ";
        newPost.description=postCreation.value;
        //console.log(newPost);
        mas.Edit(newPost.id,newPost);
        twitter.edit(newPost.id,newPost);
        flag=true;
    }
    refreshVariables();
};

function handleEditPost(event) {
    flag=false;
    refreshVariables();
    let currentBtn=event.target;
    let postId=currentBtn.parentElement.parentElement.parentElement.id;
    newPost=twitter.get(postId);
    console.log(newPost);
    postCreation.value=newPost.description;
    
}